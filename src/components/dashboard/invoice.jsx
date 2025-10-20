"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axiosInstance from "../../axiosInstance"
import { toast } from "react-toastify"
import { ActiveFilters } from "./active-filters.jsx"
import { LoadingSpinner } from "./loading-spinner.jsx"
import PaymentModal from "./invoice/PaymentModal"
// import * as bootstrap from "bootstrap"

export default function DashboardInvoice() {
  const [invoices, setInvoices] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [invoiceToDelete, setInvoiceToDelete] = useState(null)
  const [isFiltering, setIsFiltering] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  // Filter states (combined - no separate input states needed for instant filtering)
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    date_issued: "",
    role: "all",
  })

  const notifyError = (text) =>
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const notifySuccess = (text) =>
    toast.success(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const handleDeleteClick = (invoiceId) => {
    setInvoiceToDelete(invoiceId)
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteOrder"))
    deleteModal.show()
  }

  const handleDelete = async () => {
    if (invoiceToDelete) {
      try {
        const response = await axiosInstance.delete(`/user/invoices/delete/${invoiceToDelete}`)
        if (response.data.status === true || response.status === 200) {
          setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.invoice_id !== invoiceToDelete))
          notifySuccess(response.data.message)
          setTimeout(() => {
            navigate("/dase/invoice")
          }, 2000)
        } else {
          throw new Error(response.data.message || "Failed to delete invoice")
        }
      } catch (error) {
        toast.error(error.message || "Error deleting invoice")
      } finally {
        setLoading(false)
        setInvoiceToDelete(null)
        const deleteModal = bootstrap.Modal.getInstance(document.getElementById("deleteOrder"))
        if (deleteModal) {
          deleteModal.hide()
        }
      }
    }
  }

  const handleDownload = async (invoiceId) => {
    try {
      notifySuccess("Preparing download...")
      
      const response = await axiosInstance.get(`/user/invoices/download/${invoiceId}`, {
        responseType: 'blob', // Important for file downloads
      })

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      
      // Get filename from response headers or use default
      const contentDisposition = response.headers['content-disposition']
      let filename = `invoice_${invoiceId}.pdf`
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }
      
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      
      notifySuccess("Invoice downloaded successfully!")
    } catch (error) {
      console.error('Download error:', error)
      if (error.response?.status === 403) {
        notifyError("You don't have permission to download this invoice")
      } else if (error.response?.status === 404) {
        notifyError("Invoice not found")
      } else {
        notifyError("Error downloading invoice. Please try again.")
      }
    }
  }

  const handlePayNow = (invoice) => {
    setSelectedInvoice(invoice)
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = async (data) => {
    notifySuccess('Payment completed successfully!')
    // Refresh invoices list
    const params = new URLSearchParams()
    if (filters.search) params.append("search", filters.search)
    if (filters.status && filters.status !== "all") params.append("status", filters.status)
    if (filters.date_issued) params.append("date_issued", filters.date_issued)
    const url = `/user/invoices${params.toString() ? `?${params.toString()}` : ""}`
    
    try {
      const response = await axiosInstance.get(url)
      if (response.data.status !== false) {
        let invoicesData = response.data.data.invoices || []
        if (filters.role && filters.role !== "all") {
          invoicesData = invoicesData.filter(invoice => invoice.user_role === filters.role)
        }
        setInvoices(invoicesData)
        setAnalytics(response.data.data.analytics || null)
      }
    } catch (error) {
      console.error('Error refreshing invoices:', error)
    }
  }

  // Handle filter changes (instant filtering)
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  // Clear a specific filter
  const handleClearFilter = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: filterName === "status" || filterName === "role" ? "all" : "",
    }))
  }

  // Clear all filters
  const handleClearAllFilters = () => {
    setFilters({
      search: "",
      status: "all",
      date_issued: "",
      role: "all",
    })
  }

  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    // Debounce search filter - wait 500ms after user stops typing
    const timeoutId = setTimeout(() => {
      const fetchInvoices = async () => {
        setIsFiltering(true)
        try {
          // Build query parameters based on active filters
          const params = new URLSearchParams()

          if (filters.search) {
            params.append("search", filters.search)
          }

          if (filters.status && filters.status !== "all") {
            params.append("status", filters.status)
          }

          if (filters.date_issued) {
            params.append("date_issued", filters.date_issued)
          }

          // Construct the URL with query parameters
          const url = `/user/invoices${params.toString() ? `?${params.toString()}` : ""}`

          // Add the signal to the request
          const response = await axiosInstance.get(url, {
            signal: controller.signal,
          })

          if (!isMounted) return

          if (response.data.status === false) {
            setMessage(response.data.message)
            setInvoices([])
          } else {
            let invoicesData = response.data.data.invoices || []
            
            // Apply client-side role filtering
            if (filters.role && filters.role !== "all") {
              invoicesData = invoicesData.filter(invoice => invoice.user_role === filters.role)
            }
            
            setInvoices(invoicesData)
            setAnalytics(response.data.data.analytics || null)
          }
        } catch (err) {
          // Ignore abort errors
          if (err.name === "AbortError") return

          if (!isMounted) return
          setError("Failed to fetch invoices")
          notifyError("Error fetching invoices")
        } finally {
          if (isMounted) {
            setLoading(false)
            setIsFiltering(false)
          }
        }
      }

      fetchInvoices()
    }, filters.search ? 500 : 0) // Debounce search by 500ms, instant for other filters

    // Cleanup function
    return () => {
      isMounted = false
      clearTimeout(timeoutId)
      controller.abort() // Cancel any pending requests
    }
  }, [filters]) // Dependency on filters to refetch when filters change

  if (loading && !isFiltering) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <>
      <div>
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0">Invoice List</h4>

                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <Link to="/dase/invoice">Invoices</Link>
                        </li>
                        <li className="breadcrumb-item active">Invoice List</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="analytics-cards row">
                <div className="col-xl-3 col-md-6">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <p className="text-uppercase fw-medium text-muted mb-0">Total Invoices</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                            ${analytics ? analytics.all.sum.toFixed(2) : "0.00"}
                          </h4>
                          <span className="badge bg-success me-1">{analytics ? analytics.all.count : 0}</span>
                          <span className="text-muted">Total invoices</span>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light rounded fs-3">
                            <i className="bx bx-shopping-bag text-info"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <p className="text-uppercase fw-medium text-muted mb-0">Paid Invoices</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                            ${analytics ? analytics.paid.sum.toFixed(2) : "0.00"}
                          </h4>
                          <span className="badge bg-success me-1">{analytics ? analytics.paid.count : 0}</span>
                          <span className="text-muted">Paid invoices</span>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light rounded fs-3">
                            <i className="bx bx-shopping-bag text-info"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <p className="text-uppercase fw-medium text-muted mb-0">Pending Invoices</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                            ${analytics ? analytics.pending.sum.toFixed(2) : "0.00"}
                          </h4>
                          <span className="badge bg-warning me-1">{analytics ? analytics.pending.count : 0}</span>
                          <span className="text-muted">Pending invoices</span>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light rounded fs-3">
                            <i className="bx bx-shopping-bag text-info"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <p className="text-uppercase fw-medium text-muted mb-0">Expired Invoices</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                            ${analytics ? analytics.expired.sum.toFixed(2) : "0.00"}
                          </h4>
                          <span className="badge bg-danger me-1">{analytics ? analytics.expired.count : 0}</span>
                          <span className="text-muted">Expired invoices</span>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light rounded fs-3">
                            <i className="bx bx-shopping-bag text-info"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-lg-12">
                  <div className="card" id="invoiceList">
                    <div className="card-header border-0">
                      <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 flex-grow-1">Invoices</h5>
                        <div className="flex-shrink-0">
                          <div className="d-flex gap-2 flex-wrap">
                            <button
                              className="btn btn-primary"
                              id="remove-actions"
                              onClick={() => console.log("Delete multiple")}
                            >
                              <i className="ri-delete-bin-2-line"></i>
                            </button>
                            <Link to="/dase/invoice/create" className="btn btn-danger">
                              <i className="ri-add-line align-bottom me-1"></i> Create Invoice
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body bg-light-subtle border border-dashed border-start-0 border-end-0">
                      <div className="row g-3">
                        <div className="col-xxl-5 col-sm-12">
                          <div className="search-box">
                            <input
                              type="text"
                              className="form-control search bg-light border-light"
                              placeholder="Search for customer, email, country, status or something..."
                              value={filters.search}
                              onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>

                        <div className="col-xxl-3 col-sm-4">
                          <input
                            type="date"
                            className="form-control bg-light border-light"
                            placeholder="Select date"
                            value={filters.date_issued}
                            onChange={(e) => handleFilterChange('date_issued', e.target.value)}
                          />
                        </div>

                        <div className="col-xxl-2 col-sm-4">
                          <div className="input-light">
                            <select
                              className="form-control"
                              name="status"
                              value={filters.status}
                              onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                              <option value="all">All Status</option>
                              <option value="pending">Pending</option>
                              <option value="paid">Paid</option>
                              <option value="expired">Expired</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-xxl-2 col-sm-4">
                          <div className="input-light">
                            <select
                              className="form-control"
                              name="role"
                              value={filters.role}
                              onChange={(e) => handleFilterChange('role', e.target.value)}
                            >
                              <option value="all">All Invoices</option>
                              <option value="sender">Sent by Me</option>
                              <option value="receiver">Received by Me</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-xxl-1 col-sm-4 d-flex align-items-center">
                          {isFiltering && (
                            <span
                              className="spinner-border spinner-border-sm text-primary"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      {/* Display active filters */}
                      <ActiveFilters
                        filters={filters}
                        onClearFilter={handleClearFilter}
                        onClearAll={handleClearAllFilters}
                      />

                      {/* Loading indicator when filtering */}
                      <LoadingSpinner isLoading={isFiltering} />

                      <div>
                        {message ? (
                          <div className="text-center">
                            <h5 className="mt-2">{message}</h5>
                          </div>
                        ) : invoices.length > 0 ? (
                          <div className="table-responsive table-card">
                            <table className="table align-middle table-nowrap" id="invoiceTable">
                              <thead className="text-muted">
                                <tr>
                                  <th scope="col" style={{ width: "50px" }}>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkAll"
                                        value="option"
                                      />
                                    </div>
                                  </th>
                                  <th className="sort text-uppercase" data-sort="invoice_id">
                                    ID
                                  </th>
                                  <th className="sort text-uppercase" data-sort="customer_name">
                                    Customer
                                  </th>
                                  <th className="sort text-uppercase" data-sort="email">
                                    Email
                                  </th>
                                  <th className="sort text-uppercase" data-sort="role">
                                    Role
                                  </th>
                                  <th className="sort text-uppercase" data-sort="country">
                                    Country
                                  </th>
                                  <th className="sort text-uppercase" data-sort="date">
                                    Date
                                  </th>
                                  <th className="sort text-uppercase" data-sort="invoice_amount">
                                    Amount
                                  </th>
                                  <th className="sort text-uppercase" data-sort="status">
                                    Payment Status
                                  </th>
                                  <th className="sort text-uppercase" data-sort="action">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="list form-check-all" id="invoice-list-data">
                                {invoices.map((invoice) => (
                                  <tr key={invoice.invoice_id}>
                                    <td style={{ width: "50px" }}>
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="checkAll"
                                          value="option"
                                        />
                                      </div>
                                    </td>
                                    <td className="id">
                                      <Link
                                        to={`/dase/invoice/view/${invoice.invoice_id}`}
                                        className="fw-medium link-primary"
                                      >
                                        {invoice.invoice_number}
                                      </Link>
                                    </td>
                                    <td className="customer_name">{invoice.billing_full_name}</td>
                                    <td className="email">{invoice.email_address}</td>
                                    <td className="role">
                                      <span
                                        className={`badge ${
                                          invoice.user_role === 'sender' 
                                            ? 'bg-primary-subtle text-primary' 
                                            : 'bg-success-subtle text-success'
                                        } text-uppercase`}
                                      >
                                        {invoice.user_role === 'sender' ? 'Sent' : 'Received'}
                                      </span>
                                    </td>
                                    <td className="country">{invoice.country}</td>
                                    <td className="date">{invoice.date}</td>
                                    <td className="invoice_amount">${invoice.total_amount}</td>
                                    <td className="status">
                                      <span
                                        className={`badge ${
                                          (invoice.payment_status || '').toUpperCase() === 'PAID'
                                            ? 'bg-success-subtle text-success'
                                            : (invoice.payment_status || '').toUpperCase() === 'PENDING'
                                            ? 'bg-warning-subtle text-warning'
                                            : 'bg-danger-subtle text-danger'
                                        } text-uppercase`}
                                      >
                                        {invoice.payment_status || 'PENDING'}
                                      </span>
                                    </td>
                                    <td>
                                      <div className="dropdown">
                                        <button
                                          className="btn btn-soft-secondary btn-sm dropdown"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <i className="ri-more-fill align-middle"></i>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                          <li>
                                            <Link
                                              to={`/dase/invoice/view/${invoice.invoice_id}`}
                                              className="dropdown-item"
                                            >
                                              <i className="ri-eye-fill align-bottom me-2 text-muted"></i> View
                                            </Link>
                                          </li>
                                          {invoice.user_role === 'sender' && (
                                            <li>
                                              <Link
                                                to={`/dase/invoice/edit/${invoice.invoice_id}`}
                                                className="dropdown-item"
                                              >
                                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
                                              </Link>
                                            </li>
                                          )}
                                          {invoice.user_role === 'receiver' && (invoice.payment_status || '').toUpperCase() === 'PENDING' && (
                                            <li>
                                              <a
                                                className="dropdown-item text-success"
                                                href="#"
                                                onClick={(e) => {
                                                  e.preventDefault()
                                                  handlePayNow(invoice)
                                                }}
                                              >
                                                <i className="ri-wallet-3-line align-bottom me-2"></i> Pay Now
                                              </a>
                                            </li>
                                          )}
                                          <li>
                                            <a 
                                              className="dropdown-item" 
                                              href="#"
                                              onClick={(e) => {
                                                e.preventDefault()
                                                handleDownload(invoice.invoice_id)
                                              }}
                                            >
                                              <i className="ri-download-2-line align-bottom me-2 text-muted"></i>{" "}
                                              Download
                                            </a>
                                          </li>
                                          {invoice.user_role === 'sender' && (
                                            <>
                                              <li className="dropdown-divider"></li>
                                              <li>
                                                <a
                                                  className="dropdown-item remove-item-btn"
                                                  onClick={() => handleDeleteClick(invoice.invoice_id)}
                                                >
                                                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                                                </a>
                                              </li>
                                            </>
                                          )}
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="noresult">
                            <div className="text-center">
                              <h5 className="mt-2">Sorry! No Result Found</h5>
                              <p className="text-muted mb-0">
                                We've searched more than 150+ invoices. We did not find any invoices for your search.
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="d-flex justify-content-end mt-3">
                          <div className="pagination-wrap hstack gap-2">
                            <a className="page-item pagination-prev disabled" href="#">
                              Previous
                            </a>
                            <ul className="pagination listjs-pagination mb-0"></ul>
                            <a className="page-item pagination-next" href="#">
                              Next
                            </a>
                          </div>
                        </div>
                      </div>

                      <div
                        className="modal fade flip"
                        id="deleteOrder"
                        tabIndex="-1"
                        aria-labelledby="deleteOrderLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-body p-5 text-center">
                              <div className="mt-4 text-center">
                                <h4>Are you sure you want to delete this invoice?</h4>
                                <p className="text-muted fs-15 mb-4">
                                  Deleting this invoice will remove all of its information from our database.
                                </p>
                                <div className="hstack gap-2 justify-content-center remove">
                                  <button
                                    className="btn btn-link link-success fw-medium text-decoration-none"
                                    data-bs-dismiss="modal"
                                  >
                                    <i className="ri-close-line me-1 align-middle"></i> Close
                                  </button>
                                  <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
                                    {loading ? "Deleting..." : "Yes, Delete It"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <PaymentModal
          invoice={selectedInvoice}
          show={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false)
            setSelectedInvoice(null)
          }}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  )
}
  
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';

export default function DashboardInvoice() {
    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();
    // const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [invoiceToDelete, setInvoiceToDelete] = useState(null);
    const notifyError = (text) => toast.error(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const notifySuccess = (text) => toast.success(text, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    
    const handleDeleteClick = (invoiceId) => {
        setInvoiceToDelete(invoiceId);
        // Assuming you're using Bootstrap's modal
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteOrder'));
        deleteModal.show();
    };
    const handleDelete = async () => {
        if (invoiceToDelete) {
            
            try {
                const response = await axiosInstance.delete(`/user/invoices/delete/${invoiceToDelete}`);
                
                // Check if the response indicates success
                if (response.data.status === true || response.status === 200) {
                    // Update the state
                    setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice.invoice_id !== invoiceToDelete));
                    
                    // Show success message
                    // toast.success(response.data.message || 'Invoice deleted successfully');
                    const data = response.data;
                    notifySuccess(data.message);
                        setTimeout(() => {
                        navigate('/dase/invoice');
                    }, 2000);
                } else {
                    // If the response doesn't indicate success, treat it as an error
                    throw new Error(response.data.message || 'Failed to delete invoice');
                }
            } catch (error) {
              
                toast.error(error.message || 'Error deleting invoice');
            } finally {
                setLoading(false);
                setInvoiceToDelete(null);
                
                // Close the modal regardless of success or failure
                const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteOrder'));
                if (deleteModal) {
                    deleteModal.hide();
                }
            }
        }
    };

    useEffect(() => {
        const fetchInvoices = async () => {
            
            try {
                // const authData = JSON.parse(localStorage.getItem('auth_data'));
                // const token = authData?.access_token;

                // if (!token) {
                //     notifyError("No token found. User is not authenticated.");
                //     setError("Authentication failed");
                //     setLoading(false);
                //     return;
                // }

                const response = await axiosInstance.get('/user/invoices');

                console.log('API Response:', response.data); // Debug log

                if (response.data.status === false) {
                    setMessage(response.data.message);
                    setInvoices([]);
                    // setAnalytics(null);
                } else {
                    setInvoices(response.data.data.invoices || []);
                    setAnalytics(response.data.data.analytics || null);
                }
                
            } catch (err) {
                console.error('Error fetching invoices:', err); // Debug log
                setError('Failed to fetch invoices');
                notifyError("Error fetching invoices");
               
            }finally {
                setLoading(false);
               
            }
        };

        fetchInvoices();
    }, []);

    useEffect(() => {
        console.log('Current invoices state:', invoices); // Debug log
    }, [invoices]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // const {
    //     first_name,
    //     last_name,
    //     business_name,
    //     business_email,
    //     business_phone,
    //     email_verified_at,
    //     profile_photo,
    //     status,
    //     street_address,
    //     bio,
    //     business_website,
    //     created_at,
    //     last_login,
    // } = profile;

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
                                                <li className="breadcrumb-item"><Link to="/dase/invoice">Invoices</Link></li>
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
                                                    <p className="text-uppercase fw-medium text-muted mb-0">Invoices Sent</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-end justify-content-between mt-4">
                                                <div>
                                                    <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                                        ${analytics ? analytics.all.sum.toFixed(2) : '0.00'}
                                                    </h4>
                                                    <span className="badge bg-warning me-1">{analytics ? analytics.all.count : 0}</span> 
                                                    <span className="text-muted">Invoices sent</span>
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
                                                        ${analytics ? analytics.paid.sum.toFixed(2) : '0.00'}
                                                    </h4>
                                                    <span className="badge bg-warning me-1">{analytics ? analytics.paid.count : 0}</span> 
                                                    <span className="text-muted">Paid by clients</span>
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
                                                        ${analytics ? analytics.pending.sum.toFixed(2) : '0.00'}
                                                    </h4>
                                                    <span className="badge bg-warning me-1">{analytics ? analytics.pending.count : 0}</span> 
                                                    <span className="text-muted">Pending by clients</span>
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
                                                        ${analytics ? analytics.expired.sum.toFixed(2) : '0.00'}
                                                    </h4>
                                                    <span className="badge bg-warning me-1">{analytics ? analytics.expired.count : 0}</span> 
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
                                                        <button className="btn btn-primary" id="remove-actions" onClick="deleteMultiple()"><i className="ri-delete-bin-2-line"></i></button>
                                                        <Link to="/dase/invoice/create"  className="btn btn-danger"><i className="ri-add-line align-bottom me-1"></i> Create Invoice</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body bg-light-subtle border border-dashed border-start-0 border-end-0">
                                            <form>
                                                <div className="row g-3">
                                                    <div className="col-xxl-5 col-sm-12">
                                                        <div className="search-box">
                                                            <input type="text" className="form-control search bg-light border-light" placeholder="Search for customer, email, country, status or something..."/>
                                                            <i className="ri-search-line search-icon"></i>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-xxl-3 col-sm-4">
                                                        <input type="text" className="form-control bg-light border-light" id="datepicker-range" placeholder="Select date"/>
                                                    </div>
                                                    
                                                    <div className="col-xxl-3 col-sm-4">
                                                        <div className="input-light">
                                                            <select className="form-control" data-choices data-choices-search-false name="choices-single-default" id="idStatus">
                                                                <option value="">Status</option>
                                                                <option value="all" selected>All</option>
                                                                <option value="Unpaid">Unpaid</option>
                                                                <option value="Paid">Paid</option>
                                                                <option value="Cancel">Cancel</option>
                                                                <option value="Refund">Refund</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    

                                                    <div className="col-xxl-1 col-sm-4">
                                                        <button type="button" className="btn btn-primary w-100" onClick="SearchData();">
                                                            <i className="ri-equalizer-fill me-1 align-bottom"></i> Filters
                                                        </button>
                                                    </div>
                                                    
                                                </div>
                                            
                                            </form>
                                        </div>
                                        <div className="card-body">
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
                                                                    <th scope="col" style={{width: "50px" }}>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="checkbox" id="checkAll" value="option"/>
                                                                        </div>
                                                                    </th>
                                                                    <th className="sort text-uppercase" data-sort="invoice_id">ID</th>
                                                                    <th className="sort text-uppercase" data-sort="customer_name">Customer</th>
                                                                    <th className="sort text-uppercase" data-sort="email">Email</th>
                                                                    <th className="sort text-uppercase" data-sort="country">Country</th>
                                                                    <th className="sort text-uppercase" data-sort="date">Date</th>
                                                                    <th className="sort text-uppercase" data-sort="invoice_amount">Amount</th>
                                                                    <th className="sort text-uppercase" data-sort="status">Payment Status</th>
                                                                    <th className="sort text-uppercase" data-sort="action">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="list form-check-all" id="invoice-list-data">
                                                                {invoices.map((invoice) => (
                                                                    <tr key={invoice.invoice_id}>
                                                                        <td style={{width: "50px" }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input" type="checkbox" id="checkAll" value="option"/>
                                                                            </div>
                                                                        </td>
                                                                        <td className="id">
                                                                            <Link to={`/dase/invoice/view/${invoice.invoice_id}`} className="fw-medium link-primary">
                                                                                {invoice.invoice_number}
                                                                            </Link>
                                                                        </td>
                                                                        <td className="customer_name">{invoice.billing_full_name}</td>
                                                                        <td className="email">{invoice.email_address}</td>
                                                                        <td className="country">{invoice.country}</td>
                                                                        <td className="date">{invoice.date}</td>
                                                                        <td className="invoice_amount">${invoice.total_amount}</td>
                                                                        <td className="status">
                                                                            <span className={`badge bg-success bg-${invoice.payment_status.toLowerCase()}-subtle text-${invoice.payment_status.toLowerCase()} text-uppercase`}>
                                                                                {invoice.payment_status}
                                                                            </span>
                                                                           
                                                                        </td>
                                                                        <td>
                                                                            <div className="dropdown">
                                                                                <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <i className="ri-more-fill align-middle"></i>
                                                                                </button>
                                                                                <ul className="dropdown-menu dropdown-menu-end">
                                                                                    <li>
                                                                                        <Link to={`/dase/invoice/view/${invoice.invoice_id}`} className="dropdown-item">
                                                                                            <i className="ri-eye-fill align-bottom me-2 text-muted"></i> View
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link to={`/dase/invoice/edit/${invoice.invoice_id}`} className="dropdown-item">
                                                                                            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item" href="#">
                                                                                            <i className="ri-download-2-line align-bottom me-2 text-muted"></i> Download
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="dropdown-divider"></li>
                                                                                    <li>
                                                                                        <a 
                                                                                            className="dropdown-item remove-item-btn" 
                                                                                            onClick={() => handleDeleteClick(invoice.invoice_id)}
                                                                                        >
                                                                                            <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                        
                                                    </div>
                                                    ): (
                                                        <div className="noresult">
                                                            <div className="text-center">
                                                                <h5 className="mt-2">Sorry! No Result Found</h5>
                                                                <p className="text-muted mb-0">We've searched more than 150+ invoices. We did not find any invoices for your search.</p>
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
                                                

                                                
                                                <div className="modal fade flip" id="deleteOrder" tabIndex="-1" aria-labelledby="deleteOrderLabel" aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-body p-5 text-center">
                                                                <div className="mt-4 text-center">
                                                                    <h4>Are you sure you want to delete this invoice?</h4>
                                                                    <p className="text-muted fs-15 mb-4">Deleting this invoice will remove all of its information from our database.</p>
                                                                    <div className="hstack gap-2 justify-content-center remove">
                                                                        <button className="btn btn-link link-success fw-medium text-decoration-none" data-bs-dismiss="modal">
                                                                            <i className="ri-close-line me-1 align-middle"></i> Close
                                                                        </button>
                                                                        <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
                                                                            {loading ? 'Deleting...' : 'Yes, Delete It'}
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
        </>
    )

}
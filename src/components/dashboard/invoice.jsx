import { Link } from 'react-router-dom';

export default function DashboardInvoice() {
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
                            

                            <div className="row">
                                <div className="col-xl-3 col-md-6">
                                    
                                    <div className="card card-animate">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-grow-1">
                                                    <p className="text-uppercase fw-medium text-muted mb-0">Invoices Sent</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <h5 className="text-white fs-14 mb-0">
                                                        <i className="ri-arrow-right-up-line fs-13 align-middle"></i> +89.24 %
                                                        
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-end justify-content-between mt-4">
                                                <div>
                                                    <h4 className="fs-22 fw-semibold ff-secondary mb-4">$<span className="counter-value" data-target="559.25">0</span>k</h4>
                                                    <span className="badge bg-warning me-1">2,258</span> <span className="text-muted">Invoices sent</span>
                                                </div>
                                                <div className="avatar-sm flex-shrink-0">
                                                    <span className="avatar-title bg-light rounded fs-3">
                                                        {/* <i className="text-white icon-dual-success"></i> */}
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
                                                <div className="flex-shrink-0">
                                                    <h5 className="text-danger fs-14 mb-0">
                                                        <i className="ri-arrow-right-down-line fs-13 align-middle"></i> +8.09 %
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-end justify-content-between mt-4">
                                                <div>
                                                    <h4 className="fs-22 fw-semibold ff-secondary mb-4">$<span className="counter-value" data-target="409.66">0</span>k</h4>
                                                    <span className="badge bg-warning me-1">1,958</span> <span className="text-muted">Paid by clients</span>
                                                </div>
                                                <div className="avatar-sm flex-shrink-0">
                                                    <span className="avatar-title bg-light rounded fs-3">
                                                        {/* <i data-feather="check-square" className="text-white icon-dual-success"></i> */}
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
                                                    <p className="text-uppercase fw-medium text-muted mb-0">Unpaid Invoices</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <h5 className="text-danger fs-14 mb-0">
                                                        <i className="ri-arrow-right-down-line fs-13 align-middle"></i> +9.01 %
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-end justify-content-between mt-4">
                                                <div>
                                                    <h4 className="fs-22 fw-semibold ff-secondary mb-4">$<span className="counter-value" data-target="136.98">0</span>k</h4>
                                                    <span className="badge bg-warning me-1">338</span> <span className="text-muted">Unpaid by clients</span>
                                                </div>
                                                <div className="avatar-sm flex-shrink-0">
                                                    <span className="avatar-title bg-light rounded fs-3">
                                                        {/* <i data-feather="clock" className="text-white icon-dual-success"></i> */}
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
                                                    <p className="text-uppercase fw-medium text-muted mb-0">Cancelled Invoices</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <h5 className="text-white fs-14 mb-0">
                                                        <i className="ri-arrow-right-up-line fs-13 align-middle"></i> +7.55 %
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-end justify-content-between mt-4">
                                                <div>
                                                    <h4 className="fs-22 fw-semibold ff-secondary mb-4">$<span className="counter-value" data-target="84.20">0</span>k</h4>
                                                    <span className="badge bg-warning me-1">502</span> <span className="text-muted">Cancelled by clients</span>
                                                </div>
                                                <div className="avatar-sm flex-shrink-0">
                                                    <span className="avatar-title bg-light rounded fs-3">
                                                        {/* <i data-feather="x-octagon" className="text-white icon-dual-success"></i> */}
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
                                                <div className="table-responsive table-card">
                                                    <table className="table align-middle table-nowrap" id="invoiceTable">
                                                        <thead className="text-muted">
                                                            <tr>
                                                                <th scope="col" style={{width: "50px"}}>
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
                                                            <tr>
                                                                <th scope="row">
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" name="chk_child" value="#VL${e.invoice_no}"/>
                                                                    </div>
                                                                </th>
                                                                <td className="id"><a href="javascript:void(0);" onClick="ViewInvoice(this);" data-id="`+e.invoice_no+'" className="fw-medium link-primary">#VL25000351</a></td>
                                                                <td className="customer_name">
                                                                    <div className="d-flex align-items-center">
                                                                    Valentine Morin
                                                                    </div>
                                                                </td>
                                                                <td className="email">euismod.enim@outlook.net</td>
                                                                <td className="country">USA</td>
                                                                <td className="date">03 Apr, 2021 <small className="text-muted">9:58 PM</small></td>
                                                                <td className="invoice_amount">$875</td>
                                                                <td className="status"><span className="badge bg-success text-white text-uppercase">Paid</span>
                                                                </td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i className="ri-more-fill align-middle"></i>
                                                                        </button>
                                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                                            <li>
                                                                                <Link to="/dase/invoice/view">
                                                                            
                                                                                    <button className="dropdown-item"><i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                                                                                        View</button>
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link to="/dase/invoice/edit">
                                                                                    <button className="dropdown-item"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                                                                        Edit</button>
                                                                                </Link>
                                                                            </li>
                                                                            <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-line align-bottom me-2 text-muted"></i>
                                                                                    Download</a></li>
                                                                            <li className="dropdown-divider"></li>
                                                                            <li>
                                                                                <a className="dropdown-item remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                                    Delete
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" name="chk_child" value="#VL${e.invoice_no}"/>
                                                                    </div>
                                                                </th>
                                                                <td className="id"><a href="javascript:void(0);" onClick="ViewInvoice(this);" data-id="`+e.invoice_no+'" className="fw-medium link-primary">#VL25000351</a></td>
                                                                <td className="customer_name">
                                                                    <div className="d-flex align-items-center">
                                                                    Valentine Morin
                                                                    </div>
                                                                </td>
                                                                <td className="email">euismod.enim@outlook.net</td>
                                                                <td className="country">USA</td>
                                                                <td className="date">03 Apr, 2021 <small className="text-muted">9:58 PM</small></td>
                                                                <td className="invoice_amount">$875</td>
                                                                <td className="status"><span className="badge bg-success text-white text-uppercase">Paid</span>
                                                                </td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i className="ri-more-fill align-middle"></i>
                                                                        </button>
                                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                                            <li>
                                                                                <Link to="/dase/invoice/view">
                                                                            
                                                                                    <button className="dropdown-item"><i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                                                                                        View</button>
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link to="/dase/invoice/edit">
                                                                                    <button className="dropdown-item"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                                                                        Edit</button>
                                                                                </Link>
                                                                            </li>
                                                                            <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-line align-bottom me-2 text-muted"></i>
                                                                                    Download</a></li>
                                                                            <li className="dropdown-divider"></li>
                                                                            <li>
                                                                                <a className="dropdown-item remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                                    Delete
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" name="chk_child" value="#VL${e.invoice_no}"/>
                                                                    </div>
                                                                </th>
                                                                <td className="id"><a href="javascript:void(0);" onClick="ViewInvoice(this);" data-id="`+e.invoice_no+'" className="fw-medium link-primary">#VL25000351</a></td>
                                                                <td className="customer_name">
                                                                    <div className="d-flex align-items-center">
                                                                    Valentine Morin
                                                                    </div>
                                                                </td>
                                                                <td className="email">euismod.enim@outlook.net</td>
                                                                <td className="country">USA</td>
                                                                <td className="date">03 Apr, 2021 <small className="text-muted">9:58 PM</small></td>
                                                                <td className="invoice_amount">$875</td>
                                                                <td className="status"><span className="badge bg-success text-white text-uppercase">Paid</span>
                                                                </td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i className="ri-more-fill align-middle"></i>
                                                                        </button>
                                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                                            <li>
                                                                                <Link to="/dase/invoice/view">
                                                                            
                                                                                    <button className="dropdown-item"><i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                                                                                        View</button>
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link to="/dase/invoice/edit">
                                                                                    <button className="dropdown-item"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                                                                        Edit</button>
                                                                                </Link>
                                                                            </li>
                                                                            <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-line align-bottom me-2 text-muted"></i>
                                                                                    Download</a></li>
                                                                            <li className="dropdown-divider"></li>
                                                                            <li>
                                                                                <a className="dropdown-item remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                                    Delete
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" name="chk_child" value="#VL${e.invoice_no}"/>
                                                                    </div>
                                                                </th>
                                                                <td className="id"><a href="javascript:void(0);" onClick="ViewInvoice(this);" data-id="`+e.invoice_no+'" className="fw-medium link-primary">#VL25000351</a></td>
                                                                <td className="customer_name">
                                                                    <div className="d-flex align-items-center">
                                                                    Valentine Morin
                                                                    </div>
                                                                </td>
                                                                <td className="email">euismod.enim@outlook.net</td>
                                                                <td className="country">USA</td>
                                                                <td className="date">03 Apr, 2021 <small className="text-muted">9:58 PM</small></td>
                                                                <td className="invoice_amount">$875</td>
                                                                <td className="status"><span className="badge bg-success text-white text-uppercase">Paid</span>
                                                                </td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i className="ri-more-fill align-middle"></i>
                                                                        </button>
                                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                                            <li>
                                                                                <Link to="/dase/invoice/view">
                                                                            
                                                                                    <button className="dropdown-item"><i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                                                                                        View</button>
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link to="/dase/invoice/edit">
                                                                                    <button className="dropdown-item"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                                                                        Edit</button>
                                                                                </Link>
                                                                            </li>
                                                                            <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-line align-bottom me-2 text-muted"></i>
                                                                                    Download</a></li>
                                                                            <li className="dropdown-divider"></li>
                                                                            <li>
                                                                                <a className="dropdown-item remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                                    Delete
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" name="chk_child" value="#VL${e.invoice_no}"/>
                                                                    </div>
                                                                </th>
                                                                <td className="id"><a href="javascript:void(0);" onClick="ViewInvoice(this);" data-id="`+e.invoice_no+'" className="fw-medium link-primary">#VL25000351</a></td>
                                                                <td className="customer_name">
                                                                    <div className="d-flex align-items-center">
                                                                    Valentine Morin
                                                                    </div>
                                                                </td>
                                                                <td className="email">euismod.enim@outlook.net</td>
                                                                <td className="country">USA</td>
                                                                <td className="date">03 Apr, 2021 <small className="text-muted">9:58 PM</small></td>
                                                                <td className="invoice_amount">$875</td>
                                                                <td className="status"><span className="badge bg-success text-white text-uppercase">Paid</span>
                                                                </td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i className="ri-more-fill align-middle"></i>
                                                                        </button>
                                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                                            <li>
                                                                                <Link to="/dase/invoice/view">
                                                                            
                                                                                    <button className="dropdown-item"><i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                                                                                        View</button>
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link to="/dase/invoice/edit">
                                                                                    <button className="dropdown-item"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                                                                        Edit</button>
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-line align-bottom me-2 text-muted"></i>
                                                                                    Download</a>
                                                                            </li>
                                                                            <li className="dropdown-divider"></li>
                                                                            <li>
                                                                                <a className="dropdown-item remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                                    Delete
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div className="noresult" style={{display: "none"}}>
                                                        <div className="text-center">
                                                            {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{"width:75px;height:75px"></lord-icon> */}
                                                            <h5 className="mt-2">Sorry! No Result Found</h5>
                                                            <p className="text-muted mb-0">We ve searched more than 150+ invoices We did not find any invoices for you search.</p>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                            {/* <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style={{"width:90px;height:90px"></lord-icon> */}
                                                            <div className="mt-4 text-center">
                                                                <h4>You are about to delete a order ?</h4>
                                                                <p className="text-muted fs-15 mb-4">Deleting your order will remove all of your information from our database.</p>
                                                                <div className="hstack gap-2 justify-content-center remove">
                                                                    <button className="btn btn-link link-success fw-medium text-decoration-none" id="deleteRecord-close" data-bs-dismiss="modal"><i className="ri-close-line me-1 align-middle"></i> Close</button>
                                                                    <button className="btn btn-danger" id="delete-record">Yes, Delete It</button>
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


                    <footer className="footer">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-6">
                                    <script>document.write(new Date().getFullYear())</script> © Velzon.
                                </div>
                                <div className="col-sm-6">
                                    <div className="text-sm-end d-none d-sm-block">
                                        Design & Develop by Themesbrand
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )

}
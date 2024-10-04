// import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance';

import { LogoDark } from '../../../assets/images';
import { LogoLight } from '../../../assets/images';
export default function ViewInvoice() {
    const { invoiceId } = useParams();
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        fetchInvoiceData();
    }, [invoiceId]);


    const fetchInvoiceData = async () => {
        try {
            const response = await axiosInstance.get(`/user/invoices/${invoiceId}`);
            const { data } = response.data;
            setInvoice({
                ...data,
                items: JSON.parse(data.items)
            });
        } catch (error) {
            toast.error('Error fetching invoice data');
        }
    };

    if (!invoice) return <div>Loading...</div>;

    return (
        <>
            <div>
                <div id="layout-wrapper">
                
                   
                    <div className="main-content">

                        <div className="page-content">
                            <div className="container-fluid">

                                
                                <div className="row">
                                    <div className="col-12">
                                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                            <h4 className="mb-sm-0">Invoice Details</h4>

                                            <div className="page-title-right">
                                                <ol className="breadcrumb m-0">
                                                    <li className="breadcrumb-item"><a href="">Invoices</a></li>
                                                    <li className="breadcrumb-item active">Invoice Details</li>
                                                </ol>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            

                                <div className="row justify-content-center">
                                    <div className="col-xxl-9 ">
                                        <div className="card" id="demo">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="card-header border-bottom-dashed p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1">
                                                                <img src={LogoDark} className="card-logo card-logo-dark" alt="logo dark" height="17"/>
                                                                <img src={LogoLight} className="card-logo card-logo-light" alt="logo light" height="17"/>
                                                                <div className="mt-sm-5 mt-4">
                                                                    <h6 className="text-muted text-uppercase fw-semibold">Address</h6>
                                                                    <p className="text-muted mb-1" id="address-details">{invoice.company_address}</p>
                                                                    <p className="text-muted mb-0" id="zip-code"><span>Zip-code:</span> {invoice.postal_code}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex-shrink-0 mt-sm-0 mt-3">
                                                                {/* <h6><span className="text-muted fw-normal">Legal Registration No:</span><span id="legal-register-no">{invoice.company_registration_no}</span></h6> */}
                                                                <h6><span className="text-muted fw-normal">Email:</span><span id="email">{invoice.email_address}</span></h6>
                                                                <h6><span className="text-muted fw-normal">Website:</span> <a href="https://themesbrand.com/" className="link-primary" target="_blank" id="website">www.themesbrand.com</a></h6>
                                                                <h6 className="mb-0"><span className="text-muted fw-normal">Contact No: </span><span id="contact-no"> {invoice.phone_number}</span></h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="card-body p-4">
                                                        <div className="row g-3">
                                                            <div className="col-lg-3 col-6">
                                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Invoice No</p>
                                                                <h5 className="fs-14 mb-0">#VL<span id="invoice-no">{invoice.invoice_number}</span></h5>
                                                            </div>
                                                            
                                                            <div className="col-lg-3 col-6">
                                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Date</p>
                                                                <h5 className="fs-14 mb-0"><span id="invoice-date">{invoice.invoice_date}</span> <small className="text-muted" id="invoice-time">02:36PM</small></h5>
                                                            </div>
                                                            
                                                            <div className="col-lg-3 col-6">
                                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Payment Status</p>
                                                                <span className="badge bg-success-subtle text-success fs-11" id="payment-status">{invoice.payment_status}</span>
                                                            </div>
                                                            
                                                            <div className="col-lg-3 col-6">
                                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Total Amount</p>
                                                                <h5 className="fs-14 mb-0">$<span id="total-amount">{invoice.total_amount}</span></h5>
                                                            </div>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="card-body p-4 border-top border-top-dashed">
                                                        <div className="row g-3">
                                                            <div className="col-6">
                                                                <h6 className="text-muted text-uppercase fw-semibold mb-3">Billing Address</h6>
                                                                <p className="fw-medium mb-2" id="billing-name">Name:  {invoice.billing_full_name}</p>
                                                                <p className="text-muted mb-1" id="billing-address-line-1">Address: {invoice.billing_address}</p>
                                                                <p className="text-muted mb-1"><span>Phone: +</span><span id="billing-phone-no">{invoice.billing_phone_no}</span></p>
                                                                <p className="text-muted mb-0"><span>Tax: </span><span id="billing-tax-no">{invoice.billing_tax_no}</span> </p>
                                                            </div>
                                                            
                                                            <div className="col-6">
                                                                <h6 className="text-muted text-uppercase fw-semibold mb-3">Shipping Address</h6>
                                                                <p className="fw-medium mb-2" id="shipping-name">David Nichols</p>
                                                                <p className="text-muted mb-1" id="shipping-address-line-1">305 S San Gabriel Blvd</p>
                                                                <p className="text-muted mb-1"><span>Phone: +</span><span id="shipping-phone-no">(123) 456-7890</span></p>
                                                            </div>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="card-body p-4">
                                                        <div className="table-responsive">
                                                            <table className="table table-borderless text-center table-nowrap align-middle mb-0">
                                                                <thead>
                                                                    <tr className="table-active">
                                                                        <th scope="col" style={{width: "50px"}}>#</th>
                                                                        <th scope="col">Product Details</th>
                                                                        <th scope="col">Rate</th>
                                                                        <th scope="col">Quantity</th>
                                                                        <th scope="col" className="text-end">Amount</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="products-list">
                                                                    {invoice.items.map((item, index) => (
                                                                        <tr key={index}>
                                                                            <th scope="row">{index + 1}</th>
                                                                            <td className="text-start">
                                                                                <span className="fw-medium">{item.item_name}</span>
                                                                                <p className="text-muted mb-0">{item.item_description}</p>
                                                                            </td>
                                                                            <td>${item.rate}</td>
                                                                            <td>{item.quantity}</td>
                                                                            <td className="text-end">${item.amount}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="border-top border-top-dashed mt-2">
                                                            <table className="table table-borderless table-nowrap align-middle mb-0 ms-auto" >
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Sub Total</td>
                                                                        <td className="text-end">${invoice.total_amount}</td>
                                                                    </tr>
                                                                    {/* You may need to adjust these based on your data structure */}
                                                                    <tr>
                                                                        <td>Estimated Tax (12.5%)</td>
                                                                        <td className="text-end">${(invoice.total_amount * 0.125).toFixed(2)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Discount <small className="text-muted">(VELZON15)</small></td>
                                                                        <td className="text-end">- $0.00</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Shipping Charge</td>
                                                                        <td className="text-end">$0.00</td>
                                                                    </tr>
                                                                    <tr className="border-top border-top-dashed fs-15">
                                                                        <th scope="row">Total Amount</th>
                                                                        <th className="text-end">${invoice.total_amount}</th>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="mt-3">
                                                            <h6 className="text-muted text-uppercase fw-semibold mb-3">Payment Details:</h6>
                                                            <p className="text-muted mb-1">Payment Method: <span className="fw-medium" id="payment-method">Mastercard</span></p>
                                                            <p className="text-muted mb-1">Card Holder: <span className="fw-medium" id="card-holder-name">David Nichols</span></p>
                                                            <p className="text-muted mb-1">Card Number: <span className="fw-medium" id="card-number">xxx xxxx xxxx 1234</span></p>
                                                            <p className="text-muted">Total Amount: <span className="fw-medium" id="">$ </span><span id="card-total-amount">755.96</span></p>
                                                        </div>
                                                        <div className="mt-4">
                                                            <div className="alert alert-info">
                                                                <p className="mb-0"><span className="fw-semibold px-3">NOTES:</span>
                                                                    <span id="note">{invoice.general_note}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                                            <a href="#" className="btn btn-success"><i className="ri-printer-line align-bottom me-1"></i> Print</a>
                                                            <a href="#" className="btn btn-primary"><i className="ri-download-2-line align-bottom me-1"></i> Download</a>
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
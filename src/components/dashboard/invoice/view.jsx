// import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance';
import html2canvas from 'html2canvas';

// Removed logo imports for cleaner design

export default function ViewInvoice() {
    const { invoiceId } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Create abort controller
        const controller = new AbortController();
        let isMounted = true;

        const fetchInvoiceData = async () => {
            try {
                const response = await axiosInstance.get(`/user/invoices/${invoiceId}`, {
                    signal: controller.signal // Add abort signal
                });
                
                if (!isMounted) return;

                const { data } = response.data;
                setInvoice({
                    ...data,
                    items: JSON.parse(data.items)
                });
            } catch (error) {
                // Ignore abort errors
                if (error.name === 'AbortError') return;
                
                if (isMounted) {
                    toast.error('Error fetching invoice data');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchInvoiceData();

        // Cleanup function
        return () => {
            isMounted = false;
            controller.abort(); // Cancel any pending requests
        };
    }, [invoiceId]); // Only depend on invoiceId

    const handlePrint = () => {
        window.print();
    };
    
    const handleDownload = () => {
        const element = document.getElementById('invoice-receipt');
        if (!element) {
            toast.error('Invoice element not found');
            return;
        }

        html2canvas(element, { 
            scale: 2,
            logging: false // Disable logging
        }).then((canvas) => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `invoice-${invoice.invoice_number}.png`;
            link.click();
        }).catch((error) => {
            toast.error('Error downloading invoice');
        });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="alert alert-danger m-4" role="alert">
                Failed to load invoice data. Please try refreshing the page.
            </div>
        );
    }

    return (
        <>
            <div>
                <div id="layout-wrapper">
                
                   
                    <div className="main-content">

                        <div className="page-content">
                            <div className="container-fluid p-0 m-0">

                                
                                <div className="row m-0 p-0">
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
                            

                                <div className="row m-0 p-0" id="invoice-receipt">
                                    <div className="col-12 ">
                                        <div className="card" id="demo">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="card-header border-bottom-dashed p-4">
                                                        <div className="d-flex py-4">
                                                            <div className="flex-grow-1">
                                                                <div className="">
                                                                    <h6 className="text-muted text-uppercase fw-semibold">Address</h6>
                                                                    <p className="text-muted mb-1" id="address-details">{invoice.company_address}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <h6><span className="text-muted fw-normal">Email:</span><span id="email">{invoice.email_address}</span></h6>
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
                                                                <h5 className="fs-14 mb-0"><span id="invoice-no">{invoice.invoice_number}</span></h5>
                                                            </div>
                                                            
                                                            <div className="col-lg-3 col-6">
                                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Date</p>
                                                                <h5 className="fs-14 mb-0"><span id="invoice-date">{invoice.date}</span> <small className="text-muted" id="invoice-time"></small></h5>
                                                            </div>
                                                            
                                                            <div className="col-lg-3 col-6">
                                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Payment Status</p>
                                                                <span className="badge bg-success-subtle text-success fs-11" id="payment-status">{invoice.payment_status}</span>
                                                            </div>
                                                            
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="card-body p-4 border-top border-top-dashed">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-sm-12">
                                                                <h6 className="text-muted text-uppercase fw-semibold mb-3">Billing Address</h6>
                                                                <p className="fw-medium mb-2" id="billing-name">Name:  {invoice.billing_full_name}</p>
                                                                <p className="text-muted mb-1" id="billing-address-line-1">Address: {invoice.billing_address}</p>
                                                                <p className="text-muted mb-1"><span>Phone: +</span><span id="billing-phone-no">{invoice.billing_phone_no}</span></p>
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
                                                                        <td className="text-end">${(invoice.total_amount / 1.125).toFixed(2)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Estimated Tax (12.5%)</td>
                                                                        <td className="text-end">${(invoice.total_amount * 0.125 / 1.125).toFixed(2)}</td>
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
                                                        {/* <div className="mt-3">
                                                            <h6 className="text-muted text-uppercase fw-semibold mb-3">Payment Details:</h6>
                                                            <p className="text-muted mb-1">Payment Method: <span className="fw-medium" id="payment-method">Mastercard</span></p>
                                                            <p className="text-muted mb-1">Card Holder: <span className="fw-medium" id="card-holder-name">David Nichols</span></p>
                                                            <p className="text-muted mb-1">Card Number: <span className="fw-medium" id="card-number">xxx xxxx xxxx 1234</span></p>
                                                            <p className="text-muted">Total Amount: <span className="fw-medium" id="">$ </span><span id="card-total-amount">755.96</span></p>
                                                        </div> */}
                                                        <div className="mt-4">
                                                            <div className="alert alert-info">
                                                                <p className="mb-0"><span className="fw-semibold px-3">NOTES:</span>
                                                                    <span id="note">{invoice.general_note}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                                            <a href="#" className="btn btn-success" onClick={handlePrint}><i className="ri-printer-line align-bottom me-1"></i> Print</a>
                                                            <a href="#" className="btn btn-primary" onClick={handleDownload}><i className="ri-download-2-line align-bottom me-1"></i> Download</a>
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
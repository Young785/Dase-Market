import { Link } from 'react-router-dom';
import { LogoDark } from '../../../assets/images';
import { LogoLight } from '../../../assets/images';
export default function CreateInvoice() {
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
                                            <h4 className="mb-sm-0">Create Invoice</h4>

                                            <div className="page-title-right">
                                                <ol className="breadcrumb m-0">
                                                    <li className="breadcrumb-item"><Link to="/invoice" >Invoices</Link></li>
                                                    <li className="breadcrumb-item active">Create Invoice</li>
                                                </ol>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            

                                <div className="row justify-content-center">
                                    <div className="col-xxl-9">
                                        <div className="card">
                                            <form className="needs-validation" id="invoice_form">
                                                <div className="card-body border-bottom border-bottom-dashed p-4">
                                                    <div className="row">
                                                        <div className="col-lg-4">
                                                            <div className="profile-user mx-auto  mb-3">
                                                                <input id="profile-img-file-input" type="file" className="profile-img-file-input" />
                                                                <label  className="d-block">
                                                                    <span className="overflow-hidden border border-dashed d-flex align-items-center justify-content-center rounded" style={{ height: '60px', width: '256px' }}>
                                                                        <img src={LogoDark} className="card-logo card-logo-dark user-profile-image img-fluid" alt="logo dark"/>
                                                                        <img src={LogoLight} className="card-logo card-logo-light user-profile-image img-fluid" alt="logo light"/>
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <label>Address</label>
                                                                </div>
                                                                <div className="mb-2">
                                                                    <textarea className="form-control bg-light border-0" id="companyAddress" rows="3" placeholder="Company Address" required></textarea>
                                                                    <div className="invalid-feedback">
                                                                        Please enter a address
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <input type="text" className="form-control bg-light border-0" id="companyaddpostalcode" minLength="5" maxLength="6" placeholder="Enter Postal Code" required />
                                                                    <div className="invalid-feedback">
                                                                        The US zip code must contain 5 digits, Ex. 45678
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                        <div className="col-lg-4 ms-auto">
                                                            <div className="mb-2">
                                                                <input type="text" className="form-control bg-light border-0" id="registrationNumber" maxLength="12" placeholder="Legal Registration No" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a registration no, Ex., 012345678912
                                                                </div>
                                                            </div>
                                                            <div className="mb-2">
                                                                <input type="email" className="form-control bg-light border-0" id="companyEmail" placeholder="Email Address" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a valid email, Ex., example@gamil.com
                                                                </div>
                                                            </div>
                                                            <div className="mb-2">
                                                                <input type="text" className="form-control bg-light border-0" id="companyWebsite" placeholder="Website" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a website, Ex., www.example.com
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <input type="text" className="form-control bg-light border-0" data-plugin="cleave-phone" id="compnayContactno" placeholder="Contact No" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a contact number
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="card-body p-4">
                                                    <div className="row g-3">
                                                        <div className="col-lg-3 col-sm-6">
                                                            <label>Invoice No</label>
                                                            <input type="text" className="form-control bg-light border-0" id="invoicenoInput" placeholder="Invoice No" value="#VL25000355" readOnly />
                                                        </div>
                                                    
                                                        <div className="col-lg-3 col-sm-6">
                                                            <div>
                                                                <label>Date</label>
                                                                <input type="text" className="form-control bg-light border-0" id="date-field" data-provider="flatpickr" data-time="true" placeholder="Select Date-time"/>
                                                            </div>
                                                        </div>
                                                    
                                                        <div className="col-lg-3 col-sm-6">
                                                            <label>Payment Status</label>
                                                            <div className="input-light">
                                                                <select className="form-control bg-light border-0" data-choices data-choices-search-false id="choices-payment-status" required>
                                                                    <option value="">Select Payment Status</option>
                                                                    <option value="Paid">Paid</option>
                                                                    <option value="Unpaid">Unpaid</option>
                                                                    <option value="Refund">Refund</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    
                                                        <div className="col-lg-3 col-sm-6">
                                                            <div>
                                                                <label >Total Amount</label>
                                                                <input type="text" className="form-control bg-light border-0" id="totalamountInput" placeholder="$0.00" readOnly />
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                    
                                                </div>
                                                <div className="card-body p-4 border-top border-top-dashed">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-sm-6">
                                                            <div>
                                                                <label className="text-muted text-uppercase fw-semibold">Billing Address</label>
                                                            </div>
                                                            <div className="mb-2">
                                                                <input type="text" className="form-control bg-light border-0" id="billingName" placeholder="Full Name" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a full name
                                                                </div>
                                                            </div>
                                                            <div className="mb-2">
                                                                <textarea className="form-control bg-light border-0" id="billingAddress" rows="3" placeholder="Address" required></textarea>
                                                                <div className="invalid-feedback">
                                                                    Please enter a address
                                                                </div>
                                                            </div>
                                                            <div className="mb-2">
                                                                <input type="text" className="form-control bg-light border-0" data-plugin="cleave-phone" id="billingPhoneno" placeholder="(123)456-7890" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a phone number
                                                                </div>
                                                            </div>
                                                            <div className="mb-3">
                                                                <input type="text" className="form-control bg-light border-0" id="billingTaxno" placeholder="Tax Number" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a tax number
                                                                </div>
                                                            </div>
                                                            <div className="form-check">
                                                                <input type="checkbox" className="form-check-input" id="same" name="same" onChange="billingFunction()" />
                                                                <label className="form-check-label">
                                                                    Will your Billing and Shipping address same?
                                                                </label>
                                                            </div>
                                                        </div>
                                                    
                                                        <div className="col-sm-6 ms-auto">
                                                            <div className="row">
                                                                <div className="col-lg-8">
                                                                    <div>
                                                                        <label className="text-muted text-uppercase fw-semibold">Shipping Address</label>
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <input type="text" className="form-control bg-light border-0" id="shippingName" placeholder="Full Name" required />
                                                                        <div className="invalid-feedback">
                                                                            Please enter a full name
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <textarea className="form-control bg-light border-0" id="shippingAddress" rows="3" placeholder="Address" required></textarea>
                                                                        <div className="invalid-feedback">
                                                                            Please enter a address
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <input type="text" className="form-control bg-light border-0" data-plugin="cleave-phone" id="shippingPhoneno" placeholder="(123)456-7890" required />
                                                                        <div className="invalid-feedback">
                                                                            Please enter a phone number
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <input type="text" className="form-control bg-light border-0" id="shippingTaxno" placeholder="Tax Number" required />
                                                                        <div className="invalid-feedback">
                                                                            Please enter a tax number
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                    
                                                </div>
                                                <div className="card-body p-4">
                                                    <div className="table-responsive">
                                                        <table className="invoice-table table table-borderless table-nowrap mb-0">
                                                            <thead className="align-middle">
                                                                <tr className="table-active">
                                                                    <th scope="col" style={{width: "50px"}}>#</th>
                                                                    <th scope="col">
                                                                        Product Details
                                                                    </th>
                                                                    <th scope="col" style={{width: "120px"}}>
                                                                        <div className="d-flex currency-select input-light align-items-center">
                                                                            Rate
                                                                            <select className="form-selectborder-0 bg-light" data-choices data-choices-search-false id="choices-payment-currency" onChange="otherPayment()">
                                                                                <option value="$">($)</option>
                                                                                <option value="£">(£)</option>
                                                                                <option value="₹">(₹)</option>
                                                                                <option value="€">(€)</option>
                                                                            </select>
                                                                        </div>
                                                                    </th>
                                                                    <th scope="col" style={{width: "120px"}}>Quantity</th>
                                                                    <th scope="col" className="text-end" style={{width: "150px"}}>Amount</th>
                                                                    <th scope="col" className="text-end" style={{width: "105px"}}></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="newlink">
                                                                <tr id="1" className="product">
                                                                    <th scope="row" className="product-id">1</th>
                                                                    <td className="text-start">
                                                                        <div className="mb-2">
                                                                            <input type="text" className="form-control bg-light border-0" id="productName-1" placeholder="Product Name" required />
                                                                            <div className="invalid-feedback">
                                                                                Please enter a product name
                                                                            </div>
                                                                        </div>
                                                                        <textarea className="form-control bg-light border-0" id="productDetails-1" rows="2" placeholder="Product Details"></textarea>
                                                                    </td>
                                                                    <td>
                                                                        <input type="number" className="form-control product-price bg-light border-0" id="productRate-1" step="0.01" placeholder="0.00" required />
                                                                        <div className="invalid-feedback">
                                                                            Please enter a rate
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="input-step">
                                                                            <button type="button" className='minus'>–</button>
                                                                            <input type="number" className="product-quantity" id="product-qty-1" value="0" readOnly/>
                                                                            <button type="button" className='plus'>+</button>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-end">
                                                                        <div>
                                                                            <input type="text" className="form-control bg-light border-0 product-line-price" id="productPrice-1" placeholder="$0.00" readOnly />
                                                                        </div>
                                                                    </td>
                                                                    <td className="product-removal">
                                                                        <a href="javascript:void(0)" className="btn btn-success">Delete</a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                            <tbody>
                                                                <tr id="newForm" style={{display: "none"}}><td className="d-none" colSpan="5"><p>Add New Form</p></td></tr>
                                                                <tr>
                                                                    <td colSpan="5">
                                                                        <a href="#" id="add-item" className="btn btn-soft-secondary fw-medium"><i className="ri-add-fill me-1 align-bottom"></i> Add Item</a>
                                                                    </td>
                                                                </tr>
                                                                <tr className="border-top border-top-dashed mt-2">
                                                                    <td colSpan="3"></td>
                                                                    <td colSpan="2" className="p-0">
                                                                        <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <th scope="row">Sub Total</th>
                                                                                    <td style={{width:"150px"}}>
                                                                                        <input type="text" className="form-control bg-light border-0" id="cart-subtotal" placeholder="$0.00" readOnly />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th scope="row">Estimated Tax (12.5%)</th>
                                                                                    <td>
                                                                                        <input type="text" className="form-control bg-light border-0" id="cart-tax" placeholder="$0.00" readOnly />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th scope="row">Discount <small className="text-muted">(VELZON15)</small></th>
                                                                                    <td>
                                                                                        <input type="text" className="form-control bg-light border-0" id="cart-discount" placeholder="$0.00" readOnly />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th scope="row">Shipping Charge</th>
                                                                                    <td>
                                                                                        <input type="text" className="form-control bg-light border-0" id="cart-shipping" placeholder="$0.00" readOnly />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr className="border-top border-top-dashed">
                                                                                    <th scope="row">Total Amount</th>
                                                                                    <td>
                                                                                        <input type="text" className="form-control bg-light border-0" id="cart-total" placeholder="$0.00" readOnly />
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-lg-4">
                                                            <div className="mb-2">
                                                                <label className="form-label text-muted text-uppercase fw-semibold">Payment Details</label>
                                                                <div className="input-light">
                                                                    <select className="form-control bg-light border-0" data-choices data-choices-search-false data-choices-removeItem id="choices-payment-type">
                                                                        <option value="">Payment Method</option>
                                                                        <option value="Mastercard">Mastercard</option>
                                                                        <option value="Credit Card">Credit Card</option>
                                                                        <option value="Visa">Visa</option>
                                                                        <option value="Paypal">Paypal</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="mb-2">
                                                                <input className="form-control bg-light border-0" type="text" id="cardholderName" placeholder="Card Holder Name"/>
                                                            </div>
                                                            <div className="mb-2">
                                                                <input className="form-control bg-light border-0" type="text" id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" />
                                                            </div>
                                                            <div>
                                                                <input className="form-control  bg-light border-0" type="text" id="amountTotalPay" placeholder="$0.00" readOnly />
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                    
                                                    <div className="mt-4">
                                                        <label  className="form-label text-muted text-uppercase fw-semibold">NOTES</label>
                                                        <textarea className="form-control alert alert-info" id="exampleFormControlTextarea1" placeholder="Notes" rows="2" required>All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.</textarea>
                                                    </div>
                                                    <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                                        <button type="submit" className="btn btn-success"><i className="ri-printer-line align-bottom me-1"></i> Save</button>
                                                        <a href="javascript:void(0);" className="btn btn-primary"><i className="ri-download-2-line align-bottom me-1"></i> Download Invoice</a>
                                                        <a href="javascript:void(0);" className="btn btn-danger"><i className="ri-send-plane-fill align-bottom me-1"></i> Send Invoice</a>
                                                    </div>
                                                </div>
                                            </form>
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
            </div>
        </>
    )

}
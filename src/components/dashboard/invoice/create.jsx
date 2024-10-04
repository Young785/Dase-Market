import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoDark, LogoLight } from '../../../assets/images';
import axiosInstance from '../../../axiosInstance';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export default function CreateInvoice() {
    const navigate = useNavigate();
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
    const [items, setItems] = useState([]); // Initialize items state
    const [formData, setFormData] = useState({
        image: '',
        company_address: '',
        postal_code: '',
        email_address: '',
        phone_number: '',
        invoice_number: '',
        date: '',
        payment_status: '',
        total_amount: '',
        billing_full_name: '',
        billing_address: '',
        billing_phone_no: '',
        billing_tax_no: '',
        shipping_full_name: '',
        shipping_address: '',
        shipping_phone_no: '',
        shipping_tax_no: '',
        items: [],
        general_note: '',
        
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        if (field === 'rate' || field === 'quantity') {
            updatedItems[index].amount = (updatedItems[index].rate * updatedItems[index].quantity).toFixed(2);
        }
        setItems(updatedItems);
    };

    const addItem = () => {
        const newItem = {
            item_name: '',
            item_description: '',
            rate: 0,
            quantity: 0,
            amount: 0,
        };
        setItems(prevItems => [...prevItems, newItem]);
    };

    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const calculateTotals = () => {
        const subtotal = items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
        const estimatedTax = (subtotal * 0.125).toFixed(2); // Assuming 12.5% tax
        const totalAmount = (subtotal + parseFloat(estimatedTax)).toFixed(2);
        return { subtotal, estimatedTax, totalAmount };
    };

    const { subtotal, estimatedTax, totalAmount } = calculateTotals();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                company_address: formData.company_address || "TheCodeGiant Agency",
                postal_code: formData.postal_code || "120301",
                email_address: formData.email_address || "ayomikunariyo@gmail.com",
                phone_number: formData.phone_number || "08061163188",
                invoice_number: formData.invoice_number || "INV1234",
                date: formData.date || "2024-09-16",
                payment_status: formData.payment_status || "PENDING",
                total_amount: formData.total_amount || "479.96",
                billing_full_name: formData.billing_full_name || "Ariyo Ayomikun",
                billing_address: formData.billing_address || "305 S San Gabriel Blvd",
                billing_phone_no: formData.billing_phone_no || "+(123) 456-7890",
                billing_tax_no: formData.billing_tax_no || "12-3456789",
                shipping_full_name: formData.shipping_full_name || "Ariyo Ayomikun",
                shipping_address: formData.shipping_address || "305 S San Gabriel Blvd",
                shipping_phone_no: formData.shipping_phone_no || "+(123) 456-7890",
                shipping_tax_no: formData.shipping_tax_no || null,
                items: JSON.stringify(items),
                general_note: formData.general_note || "No Note",
                image: formData.image || "",
                invoice_id: `INV${Math.floor(Math.random() * 90000) + 10000}`,
                account_id: localStorage.getItem('account_id') || "DU31320"
            };
            console.log('Data being sent to API:', dataToSend);

            const response = await axiosInstance.post('/user/invoices/create', dataToSend);
               
          
            
            if (response.data.status === false) {
                    notifyError(response.data.message);
                    notifyError(data.message);
                    
                    return;
            } 
            const data = response.data;
            notifySuccess(data.message);
            setTimeout(() => {
                navigate('/dase/invoice');
              }, 2000);
        } catch (error) {
            // console.error('Error creating invoice:', error);
            notifyError(`An error occurred: ${error.response.data.message}`);
        }
    };

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
                                                    <li className="breadcrumb-item"><Link to="/dase/invoice" >Invoices</Link></li>
                                                    <li className="breadcrumb-item active">Create Invoice</li>
                                                </ol>
                                            </div>
                                            <Toaster/>

                                        </div>
                                    </div>
                                </div>
                            

                                <div className="row justify-content-center">
                                    <div className="col-xxl-9">
                                        <div className="card">
                                            <form onSubmit={handleSubmit} className="needs-validation" id="invoice_form">
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
                                                                    <textarea onChange={handleInputChange} name="company_address" value={formData.company_address} className="form-control bg-light border-0" id="companyAddress" rows="3" placeholder="Company Address" required></textarea>
                                                                    <div className="invalid-feedback">
                                                                        Please enter a address
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <input onChange={handleInputChange} name="postal_code" value={formData.postal_code} type="text" className="form-control bg-light border-0" id="companyaddpostalcode" minLength="5" maxLength="6" placeholder="Enter Postal Code" required />
                                                                    <div className="invalid-feedback">
                                                                        The US zip code must contain 5 digits, Ex. 45678
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                        <div className="col-lg-4 ms-auto">
                                                            <div className="mb-2">
                                                                <input onChange={handleInputChange} name="registration_number" value={formData.registration_number} type="text" className="form-control bg-light border-0" id="registrationNumber" maxLength="12" placeholder="Legal Registration No" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a registration no, Ex., 012345678912
                                                                </div>
                                                            </div>
                                                            <div className="mb-2">
                                                                <input onChange={handleInputChange} name="email_address" value={formData.email_address} type="email" className="form-control bg-light border-0" id="companyEmail" placeholder="Email Address" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a valid email, Ex., example@gamil.com
                                                                </div>
                                                            </div>
                                                            <div className="mb-2">
                                                                <input onChange={handleInputChange} name="website" value={formData.website} type="text" className="form-control bg-light border-0" id="companyWebsite" placeholder="Website" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a website, Ex., www.example.com
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <input onChange={handleInputChange} name="phone_number" value={formData.phone_number} type="text" className="form-control bg-light border-0" data-plugin="cleave-phone" id="compnayContactno" placeholder="Contact No" required />
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
                                                            <input onChange={handleInputChange} name="invoice_number" value={formData.invoice_number} type="text" className="form-control bg-light border-0" id="invoicenoInput" placeholder="Invoice No"  />
                                                        </div>
                                                    
                                                        <div className="col-lg-3 col-sm-6">
                                                            <div>
                                                                <label>Date</label>
                                                                <input onChange={handleInputChange} name="date" value={formData.date} type="date" className="form-control bg-light border-0" id="date-field" data-provider="flatpickr" data-time="true" placeholder="Select Date-time"/>
                                                            </div>
                                                        </div>
                                                    
                                                        <div className="col-lg-3 col-sm-6">
                                                            <label>Payment Status</label>
                                                            <div className="input-light">
                                                                <select onChange={handleInputChange} name="payment_status" value={formData.payment_status} className="form-control bg-light border-0" data-choices data-choices-search-false id="choices-payment-status" required>
                                                                    <option value="">Select Payment Status</option>
                                                                    <option value="PENDING">PENDING</option>
                                                                    <option value="SUCCESS">SUCCESS</option>
                                                                    <option value="Refund">Refund</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    
                                                        <div className="col-lg-3 col-sm-6">
                                                            <div>
                                                                <label >Total Amount</label>
                                                                <input onChange={handleInputChange} name="total_amount" value={formData.total_amount} type="text" className="form-control bg-light border-0" id="totalamountInput" placeholder="$0.00"  />
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
                                                                <input onChange={handleInputChange} name="billing_full_name" value={formData.billing_full_name} type="text" className="form-control bg-light border-0" id="billingName" placeholder="Full Name" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a full name
                                                                </div>
                                                            </div>
                                                            <div className="mb-2">
                                                                <textarea onChange={handleInputChange} name="billing_address" value={formData.billing_address} className="form-control bg-light border-0" id="billingAddress" rows="3" placeholder="Address" required></textarea>
                                                                <div className="invalid-feedback">
                                                                    Please enter a address
                                                                </div>
                                                            </div>
                                                            <div className="mb-2">
                                                                <input onChange={handleInputChange} name="billing_phone_no" value={formData.billing_phone_no} type="text" className="form-control bg-light border-0" data-plugin="cleave-phone" id="billingPhoneno" placeholder="(123)456-7890" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a phone number
                                                                </div>
                                                            </div>
                                                            <div className="mb-3">
                                                                <input onChange={handleInputChange} name="billing_tax_no" value={formData.billing_tax_no} type="text" className="form-control bg-light border-0" id="billingTaxno" placeholder="Tax Number" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a tax number
                                                                </div>
                                                            </div>
                                                            <div className="form-check">
                                                                <input  type="checkbox" className="form-check-input" id="same" name="same" onChange="billingFunction()" />
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
                                                                        <input onChange={handleInputChange} name="shipping_full_name" value={formData.shipping_full_name} type="text" className="form-control bg-light border-0" id="shippingName" placeholder="Full Name" required />
                                                                        <div className="invalid-feedback">
                                                                            Please enter a full name
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <textarea onChange={handleInputChange} name="shipping_address" value={formData.shipping_address} className="form-control bg-light border-0" id="shippingAddress" rows="3" placeholder="Address" required></textarea>
                                                                        <div className="invalid-feedback">
                                                                            Please enter a address
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <input onChange={handleInputChange} name="shipping_phone_no" value={formData.shipping_phone_no} type="text" className="form-control bg-light border-0" data-plugin="cleave-phone" id="shippingPhoneno" placeholder="(123)456-7890" required />
                                                                        <div className="invalid-feedback">
                                                                            Please enter a phone number
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <input onChange={handleInputChange} name="shipping_tax_no" value={formData.shipping_tax_no} type="text" className="form-control bg-light border-0" id="shippingTaxno" placeholder="Tax Number" required />
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
                                                            <tbody>
                                                                {items.map((item, index) => (
                                                                    <tr key={index} className="product">
                                                                        <th scope="row" className="product-id">{index + 1}</th>
                                                                        <td className="text-start">
                                                                            <div className="mb-2">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control bg-light border-0"
                                                                                    placeholder="Product Name"
                                                                                    value={item.item_name}
                                                                                    onChange={(e) => handleItemChange(index, 'item_name', e.target.value)}
                                                                                    required
                                                                                />
                                                                                <div className="invalid-feedback">
                                                                                    Please enter a product name
                                                                                </div>
                                                                            </div>
                                                                            <textarea
                                                                                className="form-control bg-light border-0"
                                                                                rows="2"
                                                                                placeholder="Product Details"
                                                                                value={item.item_description}
                                                                                onChange={(e) => handleItemChange(index, 'item_description', e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="number"
                                                                                className="form-control product-price bg-light border-0"
                                                                                step="0.01"
                                                                                placeholder="0.00"
                                                                                value={item.rate}
                                                                                onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                                                                                required
                                                                            />
                                                                            <div className="invalid-feedback">
                                                                                Please enter a rate
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="number"
                                                                                className="form-control product-quantity"
                                                                                value={item.quantity}
                                                                                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                                                                required
                                                                            />
                                                                        </td>
                                                                        <td className="text-end">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control bg-light border-0 product-line-price"
                                                                                value={item.amount}
                                                                                readOnly
                                                                            />
                                                                        </td>
                                                                        <td className="product-removal">
                                                                            <button type="button" className="btn btn-danger" onClick={() => removeItem(index)}>Delete</button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                                <tr>
                                                                    <td colSpan="5">
                                                                        <button type="button" id="add-item" className="btn btn-soft-secondary fw-medium" onClick={addItem}>
                                                                            <i className="ri-add-fill me-1 align-bottom"></i> Add Item
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                            <tbody>
                                                                <tr className="border-top border-top-dashed mt-2">
                                                                    <td colSpan="3"></td>
                                                                    <td colSpan="2" className="p-0">
                                                                        <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <th scope="row">Sub Total</th>
                                                                                    <td style={{width:"150px"}}>
                                                                                        <input type="text" className="form-control bg-light border-0" value={subtotal.toFixed(2)} readOnly />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th scope="row">Estimated Tax (12.5%)</th>
                                                                                    <td>
                                                                                        <input type="text" className="form-control bg-light border-0" value={estimatedTax} readOnly />
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
                                                                                        <input type="text" className="form-control bg-light border-0" value={totalAmount} readOnly />
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
                                                        {/* <a href="javascript:void(0);" className="btn btn-primary"><i className="ri-download-2-line align-bottom me-1"></i> Download Invoice</a>
                                                        <a href="javascript:void(0);" className="btn btn-danger"><i className="ri-send-plane-fill align-bottom me-1"></i> Send Invoice</a> */}
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
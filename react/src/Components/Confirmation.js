import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import '../css/confirmation.css'
import Printer from '../css/img/printer.png'
import Card from '../css/img/card.png'

function Confirmation(props) {
    const [orderDate, setOrderDate] = useState('');
    const [checkoutItems, setCheckOutItems] = useState([])

    useEffect(() => { // assigning data pass from checkout page
        setOrderDate(new Date().toLocaleString().split(',')[0]);
        setCheckOutItems(props.location.data)
    }, [checkoutItems, props.location])

    const printPage = () => { // print page functionality, still WIP
        window.print();
    }

    return (
        <div className="itemListPage">
            <div className="itemListPage-header">
                <span className="itemListPage-brand">Shopping Portal</span>
            </div>
            <div className="confirmPage-content">
                <div className="confirmPage-left">
                    <div>
                        <div className="confirmPage-header">
                            <h2 className="">Thank You For Your Order</h2>
                        </div>
                        <div className="confirmPage-orderDetail-container">
                            <div className="confirmPage-orderDetail">
                                <span >Order Number</span>
                                <span>00000001</span>
                            </div>
                            <div className="confirmPage-orderDetail">
                                <span >Order Date</span>
                                <span>{orderDate}</span>
                            </div>
                        </div>
                        <div className="confirmPage-printContainer">
                            <button className="confirmPage-printBtn" onClick={() => printPage}>
                                <img src={Printer} className="confirmPage-printerIcon" alt="printer icon"></img>
                                Print
                            </button>
                        </div>
                    </div>
                    <div>
                        <p>
                            Please keep the above numbers for your reference. We'll also send a confirmation to the email address you used for this order. Please allow up to 24 hours for us to process your order for shipments.
                        </p>
                    </div>
                    <div className="confirmPage-paymentDetail-container">
                        <div className="confirmPage-paymentDetail">
                            <div className="confirmPage-paymentDetail-left">
                                <h4>Shipping Address</h4>
                                <h5>John Doe</h5>
                                <h5>17725 Katy Fwy #200</h5>
                                <h5>Houston, TX 77094</h5>
                                <h5> (281) 675-6100</h5>
                                <h5>Johndoe@cbac.com</h5>
                            </div>
                            <div className="confirmPage-paymentDetail-right">
                                <h4>Payment Method</h4>
                                <span>
                                    <img src={Card} alt="card icon" className="itemListPage-cartIcon" />
                                    <h5>**** **** **** 0001</h5>
                                </span>
                                <span>
                                </span>
                                <h5>Exp: 01/23</h5>
                            </div>
                        </div>
                        <div className="confirmPage-paymentDetail">
                        </div>
                    </div>
                    <div className="confirmPage-paymentDetail-container">
                        <div className="confirmPage-paymentDetail">
                            <div className="confirmPage-paymentDetail-left">
                                <h4>Billing Address</h4>
                                <h5>John Doe</h5>
                                <h5>17725 Katy Fwy #200</h5>
                                <h5>Houston, TX 77094</h5>
                                <h5> (281) 675-6100</h5>
                                <h5>Johndoe@cbac.com</h5>
                            </div>
                            <div className="confirmPage-paymentDetail-right">
                                <h4>Shipping Method</h4>
                                <h5>2-3 Business Days</h5>
                            </div>
                        </div>
                        <div className="confirmPage-paymentDetail">
                        </div>
                    </div>
                </div>

                <div className="confirmPage-right">
                    <div className="checkoutPage-totalBox" style={{ marginTop: '0' }}>
                        <h2 style={{ borderBottom: '1px solid lightgray', paddingBottom: '15px' }}>Order Summary</h2>
                        <div className="checkoutPage-totalBox-row">
                            <span>Subtotal({props.location.cartCount} items)</span>
                            <span>${props.location.cartCosts}</span>
                        </div>
                        <div className="checkoutPage-totalBox-row">
                            <span>Est. Shipping costs</span>
                            <span>${props.location.shipping}</span>
                        </div>
                        <div className="checkoutPage-totalBox-row" style={{ borderBottom: '1px solid lightgray', paddingBottom: '15px' }}>
                            <span>Est. sale tax</span>
                            <span>${props.location.saleTax}</span>
                        </div>
                        <div className="checkoutPage-totalBox-row" style={{ fontWeight: '600' }}>
                            <span>Est. total</span>
                            <span>${props.location.cartTotal}</span>
                        </div>
                    </div>
                    <div className="checkoutPage-totalBox" style={{ marginTop: '3%' }}>
                        <h2 style={{ borderBottom: '1px solid lightgray', paddingBottom: '15px' }}>Items Ordered</h2>
                        {checkoutItems.map(item => {
                            return (
                                <div className="checkoutPage-totalBox-row" key={item.id}>
                                    <span className="confirmPage-itemOrdered"><img src={item.itemImg} alt="" /></span>
                                    <span className="confirmPage-itemOrdered-detail"><h6>{item.itemName} x {item.quantity}</h6></span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="checkoutPage-totalBox" style={{ marginTop: '3%' }}>
                        <h2 style={{ borderBottom: '1px solid lightgray', paddingBottom: '15px' }}>Need Help?</h2>
                        <div style={{ color: 'red' }}>
                            <p>Send Feedback</p>
                            <p>Exchange or Return</p>
                            <p>Chat With Us</p>
                            <p>Email Us</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
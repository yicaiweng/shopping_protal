import React, { useState, useEffect } from 'react';
import '../css/Checkout.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ShoppingBag from '../css/img/shoppingBag.png'

function Checkout(props) {
    const [itemsFromCart, setItemsFromCart] = useState([]);
    const [itemsToCheckout, setItemsToCheckout] = useState([]);
    const [cartCount, setCartCount] = useState('');
    const [cartCosts, setCartCosts] = useState('');
    const [saleTax, setSaleTax] = useState('');
    const [cartTotal, setCartTotal] = useState('');
    const [shipping, setShipping] = useState('');
    let history = useHistory();

    useEffect(() => {// assigning data pass from itemlist page
        setItemsFromCart(props.location.unfilteredCart);
        setItemsToCheckout(props.location.filteredCart);
        getCartTotal()
    }, [itemsFromCart, props.location])

    const getCartTotal = () => { // calculate cart's total info
        let itemsTotal = 0;
        let costsTotal = 0;
        let cartTotal = 0;
        let saleTax = 0;

        if (itemsToCheckout.length > 0) {
            for (var i in itemsToCheckout) {
                itemsTotal = parseInt(itemsTotal) + parseInt(itemsToCheckout[i].quantity)
                costsTotal = parseFloat(costsTotal) + parseFloat(itemsToCheckout[i].quantity * itemsToCheckout[i].itemPrice)
                saleTax = parseFloat(costsTotal * 0.0825);
                cartTotal = parseFloat(costsTotal) + parseFloat(saleTax) + parseInt(8);
                setCartCount(itemsTotal);
                setCartCosts(costsTotal.toFixed(2));
                setCartTotal(cartTotal.toFixed(2))
                setSaleTax(saleTax.toFixed(2));
                setShipping(parseFloat(8).toFixed(2))
            }
        } else {
            setCartCount(0);
            setCartCosts(0);
            setCartTotal(0)
            setSaleTax(0);
            setShipping(0);
        }
    }

    const updateQuantity = (e, items) => { // update items quantity 
        let itemQuantity = 0;
        if (e.target.value !== 0) {
            itemQuantity = e.target.value;
        } else {
            e.target.value = 0;
        }

        for (var i in itemsToCheckout) {
            if (items.id === itemsToCheckout[i].id) {
                items.quantity = itemQuantity;
            }
        }
        filterCart(itemsToCheckout);
        getCartTotal();
    }

    const filterCart = cart => { //filter out cart's array and also re calculate total info
        cart.sort(({ quantity: a }, { quantity: b }) => b - a)
            .filter((elements, index) => index === cart.findIndex(element => elements.id === element.id))
        getCartTotal();
        return cart;
    }

    const removeItem = item => { // remove item from cart
        for (var i in itemsToCheckout) {
            if (item.id === itemsToCheckout[i].id) {
                itemsToCheckout.splice(i, 1);
            }
        }
        getCartTotal();
    }

    const goToitemList = () => {// direct user to itemlist page
        history.push('/itemList');
    }

    const goBack = () => { // direct user to itemlist page with data
        history.push({ pathname: '/itemList', unfilteredCart: itemsFromCart, comeFrom: 'checkout' })
    }

    const gotoCheckout = () => { //direct user to confirmation page with data
        history.push({ pathname: '/confirmation', data: itemsToCheckout, cartCount: cartCount, cartCosts: cartCosts, saleTax: saleTax, cartTotal: cartTotal, shipping: shipping })
    }

    return (
        <div>
            <div>
                <div className="itemListPage">
                    <div className="itemListPage-header">
                        <span className="itemListPage-brand">Shopping Portal</span>
                        <span className="itemListPage-cart">
                            <button className="itemlistPage-cartBtn" type="button" onClick={() => goBack()}>
                                <img className="itemListPage-cartIcon" src={ShoppingBag} alt="shopping cart icon"></img>
                                {itemsFromCart.length > 0 ? <span className="itemListPage-cartNum">{cartCount}</span> : null}
                            </button>
                        </span>
                    </div>
                    <div className="itemListPage-content">
                        <div className="checkoutPage-cartCount">Cart ({cartCount})</div>
                        <div className="checkoutPage-left">
                            {
                                itemsToCheckout.length > 0 ?
                                    <div>
                                        {itemsToCheckout.map(items => {
                                            return (
                                                <div className="checkoutPage-itemInfo-container" key={items.id}>
                                                    <div className="checkoutPage-img-container">
                                                        <img src={items.itemImg} alt="item images" className="itemListPage-card-img checkoutPage-img" />
                                                    </div>
                                                    <div className="checkoutPage-itemInfo">
                                                        <h1 className="checkoutPage-itemInfo-itemName">{items.itemName}</h1>
                                                        <input type="number" className="checkoutPage-itemInfo-quantity" min="0" placeholder={items.quantity} onChange={e => { updateQuantity(e, items) }} />
                                                        <label className="checkoutPage-itemInfo-price">${(items.itemPrice * items.quantity).toFixed(2)}</label>
                                                        <div className="checkoutPage-itemInfo-removeBtn-container">
                                                            <button className="checkoutPage-itemInfo-removeBtn" onClick={() => removeItem(items)}>Remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    :
                                    <div className="checkoutPage-left">
                                        <h2>Your Cart is Empty</h2>
                                        <button type="button" className="checkoutPage-left-btn" onClick={() => goToitemList()}>Continue Shopping</button>
                                    </div>
                            }
                        </div>
                        <div className="checkoutPage-right">
                            <div className="checkoutPage-totalBox">
                                <h2 style={{ borderBottom: '1px solid lightgray', paddingBottom: '15px' }}>Total</h2>
                                <div className="checkoutPage-totalBox-row">
                                    <span>Subtotal({cartCount} items)</span>
                                    <span>${cartCosts}</span>
                                </div>
                                <div className="checkoutPage-totalBox-row">
                                    <span>Est. Shipping costs</span>
                                    <span>${shipping}</span>
                                </div>
                                <div className="checkoutPage-totalBox-row" style={{ borderBottom: '1px solid lightgray', paddingBottom: '15px' }}>
                                    <span>Est. sale tax</span>
                                    <span>${saleTax}</span>
                                </div>
                                <div className="checkoutPage-totalBox-row" style={{ fontWeight: '600' }}>
                                    <span>Est. total</span>
                                    <span>${cartTotal}</span>
                                </div>
                            </div>
                            {
                                itemsFromCart.length > 0 ?
                                    <div className="checkoutPage-checkoutBtn-Container">
                                        <button type='button' className="checkoutPage-checkoutBtn" onClick={() => gotoCheckout()}>Checkout</button>
                                    </div> : ''
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;
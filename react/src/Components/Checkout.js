import React, { useState, useEffect } from 'react';
import ItemList from './Itemlist';
import '../css/Checkout.css';

function Checkout(props) {
    const [itemsFromCart, setItemsFromCart] = useState([]);
    const [itemsToCheckout, setItemsToCheckout] = useState([]);
    const [cartCount, setCartCount] = useState('');
    const [carCosts, setCartCosts] = useState('');
    const [saleTax, setSaleTax] = useState('');
    const [cartTotal, setCartTotal] = useState('');
    const [shipping, setShipping] = useState('');
    const [goBackToItemlist, setGoBackToItemlist] = useState(false);


    useEffect(() => {
        setItemsFromCart(props.itemsToCheckout[0])
        getCartTotal();
    }, [itemsFromCart, props.itemsToCheckout])

    const getCartTotal = () => {
        let itemsTotal = 0;
        let costsTotal = 0;
        let saleTax = 0;
        let cartTotal = 0;

        if (itemsFromCart.length > 0) {
            for (var i in itemsFromCart) {
                console.log(itemsFromCart[i].quantity)
                itemsTotal = parseInt(itemsTotal) + parseInt(itemsFromCart[i].quantity)
                costsTotal = parseFloat(costsTotal) + parseFloat(itemsFromCart[i].quantity * itemsFromCart[i].itemPrice)
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

    const updateQuantity = (e, items) => {
        let itemQuantity = e.target.value;
        console.log(items)
        console.log(itemQuantity)
        for (var i in itemsFromCart) {
            if (items.id === itemsFromCart[i].id) {
                items.quantity = itemQuantity;
                setItemsToCheckout(itemsFromCart => [...itemsFromCart, items]);
            }
            console.log('item quantity' + itemsFromCart[i].quantity);
            if (itemsFromCart[i].quantity === 0) {
                console.log('ruuning')
                alert('are you sure you want to remove this item from the cart?')
            }
        }
        filterCart(itemsFromCart);
        getCartTotal();
        console.log(itemsFromCart)
    }

    const filterCart = cart => {
        const result = cart.sort(({ quantity: a }, { quantity: b }) => b - a)
            .filter((elements, index) => index === cart.findIndex(element => elements.id === element.id))
        return result;
    }

    const removeItem = item => {
        console.log(item);
        for (var i in itemsFromCart) {
            if (item.id === itemsFromCart[i].id) {
                itemsFromCart.splice(i, 1);
            }
        }
        getCartTotal();
        console.log(itemsFromCart);
    }

    return (
        <div>
            {
                checkOut ?
                    <Confirmation cartCount={cartCount} cartCosts={cartCosts} shipping={shipping} saleTax={saleTax} cartTotal={cartTotal} itemsFromCart={itemsFromCart} />
                    :
                    <div>
                        {
                            goBackToItemlist ?
                                <ItemList /> :
                                <div className="itemListPage">
                                    <div className="itemListPage-header">
                                        <span className="itemListPage-brand">Shopping Portal</span>
                                    </div>
                                    <div className="itemListPage-content">
                                        <div className="checkoutPage-cartCount">Cart ({cartCount})</div>
                                        <div className="checkoutPage-left">
                                            {
                                                itemsFromCart.length > 0 ?
                                                    <div>
                                                        {itemsFromCart.map(items => {
                                                            return (
                                                                <div className="checkoutPage-itemInfo-container" key={items.id}>
                                                                    <div className="checkoutPage-img-container">
                                                                        <img src={items.itemImg} alt="item images" className="itemListPage-card-img checkoutPage-img" />
                                                                    </div>
                                                                    <div className="checkoutPage-itemInfo">
                                                                        <h1 className="checkoutPage-itemInfo-itemName">{items.itemName}</h1>
                                                                        <input type="number" className="checkoutPage-itemInfo-quantity" min="0" placeholder={items.quantity} onChange={e => { updateQuantity(e, items) }} />
                                                                        <label className="checkoutPage-itemInfo-price">${items.itemPrice * items.quantity}</label>
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
                                                        <button type="button" className="checkoutPage-left-btn" onClick={e => setGoBackToItemlist(true)}>Continue Shopping</button>
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
                                                        <button type='button' className="checkoutPage-checkoutBtn" onClick={() => setCheckOut(true)}>Checkout</button>
                                                    </div> : ''
                                            }

                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
            }
        </div>
    )
}

export default Checkout;
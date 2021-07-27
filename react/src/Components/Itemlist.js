import Axios from 'axios';
import '../css/itemList.css';
import React, { useEffect, useState } from 'react';
import shoppingCart from '../css/img/shoppingCart.png';
import Checkout from './Checkout'
// import searchIcon from '../css/img/searchIcon.jpg';

function ItemList(props) {
    const [listOfItems, setListOfItems] = useState([]);
    const [itemsInCart, setItemsInCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [gotoCheckOut, setGotoCheckout] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost:3001/listofitems').then((res) => {
            // console.log(res.data)
            setListOfItems(res.data);
        })
    }, [listOfItems])

    const addTocart = item => {
        setItemsInCart(itemsInCart => [...itemsInCart, item]);
    }

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        const results = listOfItems.filter(item =>
            item.itemName.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()));
        setSearchResults(results);
    }, [listOfItems, searchTerm]);

    const gotoCheckoutPage = e => {
        e.preventDefault();
        setGotoCheckout(true);
        console.log(gotoCheckOut);
        console.log('running le');
    }

    return (
        <div>
            {
                gotoCheckOut ?
                    <div>
                        <Checkout itemsInCart={itemsInCart} />
                    </div>

                    :
                    <div className="itemListPage">
                        <div className="itemListPage-header">
                            <span className="itemListPage-brand">Shopping Portal</span>
                            <span className="itemListPage-searchbar">
                                <input type="text" className="itemListPage-inputField" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                                {/* <button className="itemListPage-searchBtn" onClick={ }>
                        <img className="itemListPage-searchIcon" src={searchIcon} alt='search icon'></img>
                    </button> */}
                            </span>
                            <span className="itemListPage-cart">
                                <button className="itemlistPage-cartBtn" type="button" onClick={gotoCheckoutPage}>
                                    <img className="itemListPage-cartIcon" src={shoppingCart} alt="shopping cart icon"></img>
                                    {itemsInCart.length > 0 ? <span className="itemListPage-cartNum">{itemsInCart.length}</span> : null}
                                </button>
                            </span>
                        </div>
                        <div className="itemListPage-content">
                            {searchResults.map((items) => {
                                return (
                                    <div className="itemListPage-card" key={items.id}>
                                        < img src={items.itemImg} alt="item images" className="itemListPage-card-img" />
                                        <div className="itemListPage-product-left">
                                            <h1>{items.itemName}</h1>
                                            <label>${items.itemPrice}</label>
                                        </div>
                                        <div className="itemListPage-product-right">
                                            <button type="button" className="itemListPage-product-btn btn btn-success" onClick={e => { addTocart(items) }}>Add to Cart</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div >
            }
        </div>
    )
}

export default ItemList;
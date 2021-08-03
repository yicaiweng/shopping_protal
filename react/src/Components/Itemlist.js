import Axios from 'axios';
import '../css/itemList.css';
import React, { useEffect, useState } from 'react';
import shoppingCart from '../css/img/shoppingCart.png';
import { useHistory } from "react-router-dom";

function ItemList(props) {
    const [listOfItems, setListOfItems] = useState([]);
    const [itemsInCart, setItemsInCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    let history = useHistory();

    useEffect(() => {
        let isMounted = true;
        Axios.get('http://localhost:3001/listofitems').then((res) => {
            if (isMounted) {
                setListOfItems(res.data);
                if (props.location.unfilteredCart) {
                    setItemsInCart(props.location.unfilteredCart)
                }
            }
        })
        return () => { isMounted = false };
    }, [listOfItems, itemsInCart, props.location.unfilteredCart])

    const addTocart = item => {
        item.quantity = 1;
        console.log(item)
        for (var i in itemsInCart) {
            if (item.id === itemsInCart[i].id) {
                item.quantity = item.quantity + 1;
            }
        }
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

    const gotoCheckoutPage = () => {
        const result = itemsInCart.sort(({ quantity: a }, { quantity: b }) => b - a)
            .filter((elements, index) => index === itemsInCart.findIndex(element => elements.id === element.id))
        console.log(itemsInCart)

        history.push({ pathname: '/checkout', filteredCart: result, unfilteredCart: itemsInCart })
    }

    return (
        <div>
            <div className="itemListPage">
                <div className="itemListPage-header">
                    <span className="itemListPage-brand">Shopping Portal</span>
                    <span className="itemListPage-searchbar">
                        <input type="text" className="itemListPage-inputField" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                    </span>
                    <span className="itemListPage-cart">
                        <button className="itemlistPage-cartBtn" type="button" onClick={() => gotoCheckoutPage()}>
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
                                <div className="itemListPage-product-info">
                                    <h1>{items.itemName}</h1>
                                    <label>${items.itemPrice}</label>
                                </div>
                                <div className="itemListPage-product-bottom">
                                    <button type="button" className="itemListPage-product-btn btn btn-success" onClick={() => { addTocart(items) }}>Add to Cart</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div >
        </div>
    )
}

export default ItemList;
/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Paypal from '../../components/Paypal/Paypal';
/* ----------------------------------------------------------------------------------------- */
/* COMPONENTS */
/* ----------------------------------------------------------------------------------------- */
import RemoveFromCartButton from "../../components/Buttons/RemoveFromCartButton/RemoveFromCartButton";
import Footer from "../../components/Footer/Footer";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchDeliveries, fetchCreateOrder } from "../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./Cart.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function Cart({ API, SessionObject, NotificationObject }) {
    const [ cart, setCart ] = useState(JSON.parse(localStorage.getItem("cart")));
    const [ deliveries, setDeliveries ] = useState(null);
    const objectDeliveries = { deliveries: deliveries, setDeliveries: setDeliveries };
    const [ orderPrice, setOrderPrice ] = useState(0);
    const [ order, setOrder ] = useState(null);
    const [ checkOut, setCheckOut ] = useState(false);
    useEffect(() => {
        if(cart !== null && cart === 'reload'){
            setCart(JSON.parse(localStorage.getItem("cart")));
            setOrderPrice(parseInt(0));
        }
    }, [ cart ]);
    useEffect(() => {
        if(deliveries === null)
            fetchDeliveries(null, API, null, objectDeliveries, 1, null);
    }, [ deliveries ]);
    useEffect(() => {
        if(order !== null)
            return fetchCreateOrder(API, SessionObject, NotificationObject, order, setCheckOut);
    }, [ order ]);
    return (checkOut) ? <Paypal API={ API } SessionObject={ SessionObject } checkOut={ checkOut } /> :
        <Content
        API={ API }
        cart={ cart } setCart={ setCart }
        deliveries={ deliveries }
        setOrder={ setOrder }
        orderPrice={ orderPrice } setOrderPrice={ setOrderPrice }
        ></Content>;
    ;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, cart, setCart, deliveries, setOrder, orderPrice, setOrderPrice }) {
    const [ currentDelivery, setCurrentDelivery ] = useState([0, 0]);
    let totalWeight = 0;
    let totalPrice = 0;
    let priceAdd = 0;
    let productsOrder = [];
    const handleCurrentDelivery = (option) => {
        (parseInt(option) === 0) ? setOrderPrice(parseInt(option)) : setCurrentDelivery(option.split(','));
    };
    useEffect(() => {
        if(currentDelivery !== undefined && currentDelivery[1] !== null && currentDelivery[1] !== 0)
           setOrderPrice(Math.round((totalPrice + parseFloat(currentDelivery[1]))* 100)/ 100);
    }, [ currentDelivery ]);
    const content = 
    (
        <div id="cartPage">
            <div id="cart">
                <h2>Votre Panier :</h2>
                <div className="row">
                    <div className="col col-4 product">
                        <h3>Produit</h3>
                    </div>
                    <div className="col col-2">
                        <h3>Prix</h3>
                    </div>
                    <div className="col col-2">
                        <h3>Quantité</h3>
                    </div>
                    <div className="col col-3">
                        <h3>Sous-total</h3>
                    </div>
                    <div className="col col-1">
                        <FontAwesomeIcon icon={ faTrash }></FontAwesomeIcon>
                    </div>
                </div>
                { (cart !== undefined && cart !== null && cart !== 'reload' && cart.length > 0 ) ? cart.map((item, key) => {
                    let cartTotal = 0;
                    let subTotal = item.product.price;
                    if(item.quantity > 1) {
                        subTotal = Math.floor(item.quantity * parseFloat(item.product.price)* 100)/ 100;
                        cartTotal += subTotal;
                    } else {
                        cartTotal += item.product.price;
                    };
                    totalPrice += cartTotal;
                    totalWeight += totalWeight + item.product.weight;
                    productsOrder.push({id: item.product.id, quantity: item.quantity});
                    return (
                        <div key={key} title={item.product.title} className="row">
                            <div className="col col-3 product">
                                <img src={API.data.domain + item.product.pictures[0]} alt="Illustration du produit."></img>;
                                <h3><Link key={ key } to={ "/produit/" + item.product.id } className="seeProduct">{ item.product.title }</Link></h3>
                            </div>
                            
                            <div className="col col-2 price">
                                <h3>{ (item.product.price.toString().match(".")) ? item.product.price.toString().replace(".", "€") : item.product.price + " €" }</h3>
                            </div>
                            <div className="col col-2 quantity">
                                <h3>{ item.quantity }</h3>
                            </div>
                            <div className="col col-3 subTotal">
                                <h3>{ (subTotal.toString().match(".")) ? subTotal.toString().replace(".", "€") : subTotal + " €" }</h3>
                            </div>
                            <div className="col col-1 removeFromCart">
                                <RemoveFromCartButton Product={ item.product } cart={ cart } setCart={ setCart }></RemoveFromCartButton>
                            </div>
                        </div>
                    );
                }) : <>
                <div className="row">
                        <div className="col col-3 product">
                            <h3>...</h3>
                        </div>
                        <div className="col col-2 price">
                            <h3>...</h3>
                        </div>
                        <div className="col col-2 quantity">
                            <h3>...</h3>
                        </div>
                        <div className="col col-3 subTotal">
                            <h3>...</h3>
                        </div>
                        <div className="col col-1 removeFromCart">
                            <h3>...</h3>
                        </div>
                </div>
                <div className="row">
                    <div>
                        <h3>Votre panier est vide...</h3>
                    </div>
                </div>
                </> }
            </div>
            <div className="window">
                <div className="row">
                    <div className="selectDelivery">
                        <select name="delivery_select" id="delivery_select" onChange={ (event) => { return handleCurrentDelivery(event.target.value); }} defaultValue={ 0 }>
                            <option value={ 0 }>Choisir un transporteur :</option>
                            { (deliveries !== null && deliveries.deliveries.length > 0) ? deliveries.deliveries.map((delivery, key) => {
                                priceAdd = ((totalPrice - parseFloat(currentDelivery[1])) < 100) ? (delivery.price * totalWeight) : 0;
                                priceAdd = (Math.round(priceAdd * 100)/ 100);
                                return <option value={[delivery.id, priceAdd]} key={key}>{delivery.company} ( { (priceAdd !== 0 ) ? priceAdd + '€' : 'offert' } )</option>;
                            }) : null }
                        </select>
                    </div>
                </div>
                <div>
                    <h3>{ (orderPrice === undefined || orderPrice === 0) ? 'Merci de choisir une méthode de livraison.' : 'Total TTC :'}</h3>
                </div>
                <div className="totalPrice">
                    <h3>{ (orderPrice !== undefined && orderPrice !== 0) ? (
                        (orderPrice.toString().match(".")) ? (Math.round(orderPrice * 100) / 100).toString().replace(".", "€") : orderPrice + "€")
                    : null }</h3>
                </div>
                <div className="buy">
                    { ( orderPrice !== undefined && orderPrice !== 0 ) ? (
                    <button onClick={ () => setOrder({ products: productsOrder, delivery_id: currentDelivery[0] }) }>Passer Commande</button>
                    ) : null }
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default Cart;
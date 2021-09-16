/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import { removeFromCart } from "../../../config/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./RemoveFromCartButton.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function RemoveFromCart({ Product, cart, setCart }) {
    const objectCart = { cart: cart, setCart: setCart };
    return <Content Product={ Product } CartObject={ objectCart }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ Product, CartObject }) {
    const content = (
    <button onClick={ (event) => { return removeFromCart(event, Product, CartObject); } } className="removeFromCart">
        <FontAwesomeIcon icon={ faWindowClose }></FontAwesomeIcon>
    </button>
    );
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default RemoveFromCart;
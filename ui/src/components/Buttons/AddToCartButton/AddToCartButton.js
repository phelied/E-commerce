/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import { addToCart } from "../../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./AddToCartButton.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function AddToCartButton({ Product }) {
    const [ cart, setCart ] = useState(null);
    const objectCart = { cart: cart, setCart: setCart };
    const init = () => {
        const userMenuButtons = document.querySelectorAll(".userMenuButton");
        const cartButton = userMenuButtons[0];
        let cartContent = localStorage.getItem("cart");
        if(cartContent) {
            cartContent = JSON.parse(cartContent);
            if(cartButton) {
                const productsCount = document.createElement("span");
                productsCount.setAttribute("class", "productsCount");
                if(cartContent !== null && !document.querySelector(".userMenuButton > .productsCount")) {
                    cartButton.append(productsCount);
                };
                const getSpan = document.querySelector(".userMenuButton > .productsCount");
                let productsInCart = 0;
                if(cartContent !== null && getSpan) {
                    cartContent.forEach((item) => {
                        productsInCart += item.quantity;
                    });
                    getSpan.innerText = productsInCart;
                };
            };
        };
    };
    useEffect(() => {
        init();
        const userMenuButtons = document.querySelectorAll(".userMenuButton");
        const cartButton = userMenuButtons[0];
        if(cartButton) {
            const productsCount = document.createElement("span");
            productsCount.setAttribute("class", "productsCount");
            if(cart !== null && !document.querySelector(".userMenuButton > .productsCount")) {
                cartButton.append(productsCount);
            };
            const getSpan = document.querySelector(".userMenuButton > .productsCount");
            if(cart !== null && getSpan) {
                getSpan.innerText = cart;
            };
        };
    }, [ cart ]);
    return <Content Product={ Product } CartObject={ objectCart }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ Product, CartObject }) {
    const content = <button onClick={ (event) => { return addToCart(event, Product, CartObject); } } className="addToCart">Ajouter au panier</button>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default AddToCartButton;
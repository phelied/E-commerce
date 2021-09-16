/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
/* ----------------------------------------------------------------------------------------- */
/* COMPONENTS */
/* ----------------------------------------------------------------------------------------- */
import LoginButton from "../../Buttons/LoginButton/LoginButton";
import LogoutButton from "../../Buttons/LogoutButton/LogoutButton";
import CartMenu from "../../Menus/CartMenu/CartMenu";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./UserMenu.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function UserMenu({ API, SessionObject, NotificationObject }) {
    const [ cartMenu, toggleCartMenu ] = useState(false);
    const objectCartMenu = { state: cartMenu, toggleCartMenu: toggleCartMenu };
    document.addEventListener("click", (event) => {
        const cartMenuContainer = document.querySelector(".cartMenu");
        if(cartMenuContainer && !event.target.closest(".cartMenu") && cartMenuContainer.classList.contains("openedMenu")) {
            return toggleCartMenu(!cartMenu);
        };
    });
    useEffect(() => {
        const cartMenuContainer = document.querySelector(".cartMenu");
        if(cartMenuContainer) {
            return (cartMenu) ? cartMenuContainer.classList.add("openedMenu") : cartMenuContainer.classList.remove("openedMenu");
        };
    }, [ cartMenu ]);
    return <Content API={ API } SessionObject={ SessionObject } CartMenuObject={ objectCartMenu } NotificationObject={ NotificationObject }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, SessionObject, CartMenuObject, NotificationObject }) {
    const content = <div id="userMenuButtons">
        <div className="userMenuButton">
            <button title="Panier" onClick={ () => { return CartMenuObject.toggleCartMenu(!CartMenuObject.sate); } }>
                <FontAwesomeIcon icon={ faShoppingCart }></FontAwesomeIcon>
            </button>
        </div>
        <div className="userMenuButton">
            { (SessionObject.session) ? <Link to="/compte" title="Mon compte">
                <FontAwesomeIcon icon={ faUser }></FontAwesomeIcon>
            </Link> : null }
            { (SessionObject.session === null) ? <button>
                <FontAwesomeIcon icon={ faUser }></FontAwesomeIcon>
            </button> : null }
        </div>
        { (!SessionObject.session) ? <LoginButton></LoginButton> : <LogoutButton API={ API } SessionObject={ SessionObject } NotificationObject={ NotificationObject }></LogoutButton> }
        <CartMenu CartMenuObject={ CartMenuObject }></CartMenu>
    </div>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default UserMenu;
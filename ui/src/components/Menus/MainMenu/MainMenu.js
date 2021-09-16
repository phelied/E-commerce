/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./MainMenu.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function MainMenu({ SessionObject }) {
    const [ mainMenu, toggleMainMenu ] = useState(false);
    const objectMainMenu = { state: mainMenu, toggleMainMenu: toggleMainMenu };
    document.addEventListener("click", (event) => {
        const navigationLayerContainer = document.querySelector("#navigationLayer");
        const mainMenuContainer = document.querySelector("#mainNav");
        if((mainMenuContainer && navigationLayerContainer) && !event.target.closest("#mainNav") && mainMenuContainer.classList.contains("show")) {
            return toggleMainMenu(!mainMenu);
        };
    });
    useEffect(() => {
        const navigationLayerContainer = document.querySelector("#navigationLayer");
        if(mainMenu) {
            navigationLayerContainer.classList.add("openedMenu");
        } else {
            navigationLayerContainer.classList.remove("openedMenu");
        };
    }, [ mainMenu ])
    return <Content MainMenuObject={ objectMainMenu } SessionObject={ SessionObject }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ MainMenuObject, SessionObject }) {
    const content = <nav id="mainNav" className={ (MainMenuObject.state) ? "show" : null }>
        <div id="mainNavigationButtonContainer">
            <span id="mainNavigationButton" onClick={ () => { return MainMenuObject.toggleMainMenu(!MainMenuObject.state); } }>
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>
        <ul>
            <li className="category">Pages</li>
            <li>
                <Link to="/">
                    <p>Accueil</p>
                </Link>
            </li>
            { (SessionObject.session) ? null : <RegisterLink></RegisterLink> }
            <li>
                <Link to="/produits">
                    <p>Produits</p>
                </Link>
            </li>
            <li>
                <Link to="/categories">
                    <p>Catégories</p>
                </Link>
            </li>
            <li>
                <Link to="/panier">
                    <p>Panier</p>
                </Link>
            </li>
            { (SessionObject.session) ? <li className="category">Utilisateur</li> : null }
            { (SessionObject.session) ? <AccountLink></AccountLink> : null }
            { (SessionObject.session && SessionObject.session.roles.includes("ROLE_ADMIN")) ? <AdminLink></AdminLink> : null }
        </ul>
    </nav>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT EXTENSION */
/* ----------------------------------------------------------------------------------------- */
function RegisterLink() {
    return <li>
        <Link to="/inscription">
            <p>Inscription</p>
        </Link>
    </li>;
};
function AccountLink() {
    return <li>
        <Link to="/compte">
            <p>Mon Compte</p>
        </Link>
    </li>;
};
function AdminLink() {
    return <li>
        <a href="https://localhost:8000/admin" target="_blank">
            <p>Admin</p>
        </a>
    </li>;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default MainMenu;
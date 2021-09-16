/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
/* ----------------------------------------------------------------------------------------- */
/* PAGES */
/* ----------------------------------------------------------------------------------------- */
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import Categories from "./pages/Categories/Categories";
import Admin from "./pages/Admin/Admin";
/* ----------------------------------------------------------------------------------------- */
/* COMPONENTS */
/* ----------------------------------------------------------------------------------------- */
import SearchBar from "./components/SearchBar/SearchBar";
import UserMenu from "./components/Menus/UserMenu/UserMenu";
import MainMenu from "./components/Menus/MainMenu/MainMenu";
import LoginForm from "./components/Forms/LoginForm/LoginForm";
import Notification from "./components/Popups/Notification/Notification";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import API from "./config/config";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./App.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function App() {
    const symfonyAPI = new API();
    const dataAPI = symfonyAPI.getData();
    const objectAPI = { instance: symfonyAPI, data: dataAPI };
    const [ session, setSession ] = useState(JSON.parse(localStorage.getItem("session")));
    const objectSession = { session: session, setSession: setSession };
    const [ notification, setNotification ] = useState(null);
    const objectNotification = { content: notification, setNotification: setNotification };
    return <Content API={ objectAPI } SessionObject={ objectSession } NotificationObject={ objectNotification }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, SessionObject, NotificationObject }) {
    const content = <Router>
        <div id="navigationLayer">
            <nav id="topNav">
                <div id="siteLogo">
                    <Link title="Accueil" to="/">
                        <h1>Matrix<span>TechTips</span></h1>
                    </Link>
                </div>
                <SearchBar API={ API }></SearchBar>
                <UserMenu API={ API } SessionObject={ SessionObject } NotificationObject={ NotificationObject }></UserMenu>
            </nav>
            <nav id="subNav">

            </nav>
            <MainMenu SessionObject={ SessionObject }></MainMenu>
            <LoginForm API={ API } SessionObject={ SessionObject } NotificationObject={ NotificationObject }></LoginForm>
        </div>
        <div id="mainContainer">
            <Switch>
                <Route exact path="/" component={ () => { return <Home API={ API }></Home>; } }></Route>
                <Route exact path="/produits" component={ () => { return <Products API={ API } NotificationObject={ NotificationObject }></Products>; } }></Route>
                <Route exact path="/categories" component={ () => { return <Categories API={ API } NotificationObject={ NotificationObject }></Categories>; } }></Route>
                <Route exact path="/produit/:id" component={ () => { return <Product API={ API } SessionObject={ SessionObject } NotificationObject={ NotificationObject }></Product>; } }></Route>
                <Route exact path="/panier" component={ () => { return <Cart API={ API } SessionObject={ SessionObject } NotificationObject={ NotificationObject } ></Cart>; } }></Route>
                <Route exact path="/inscription" component={ () => { return <Register API={ API } SessionObject={ SessionObject } NotificationObject={ NotificationObject }></Register>; } }></Route>
                <Route exact path="/compte" component={  () => { return <Account API={ API } SessionObject={ SessionObject } NotificationObject={ NotificationObject }></Account>; }  }></Route>
                <Route exact path="/admin" component={  () => { return <Admin API={ API } SessionObject={ SessionObject }></Admin>; }  }></Route>
            </Switch>
        </div>
        { (NotificationObject.content !== null) ? <Notification NotificationObject={ NotificationObject }></Notification> : null }
    </Router>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default App;
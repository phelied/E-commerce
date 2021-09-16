/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
/* ----------------------------------------------------------------------------------------- */
/* COMPONENTS */
/* ----------------------------------------------------------------------------------------- */
import AdminMenu from "../../components/Menus/AdminMenu/AdminMenu";
import Footer from "../../components/Footer/Footer";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchUsers, fetchCategories, fetchProducts, fetchComments, fetchDeliveries, fetchOrders, fetchDiscounts } from "../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./Admin.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function Admin({ API, SessionObject, NotificationObject }) {
    const [ content, setContent ] = useState("users");
    const objectContent = { content: content, setContent: setContent };
    return <Content API={ API } SessionObject={ SessionObject } ContentObject={ objectContent } NotificationObject={ NotificationObject }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, SessionObject, ContentObject, NotificationObject }) {
    if(SessionObject.session && SessionObject.session.roles.includes("ROLE_ADMIN")) {
        const content = <div id="admin">
            <div>
                <div className="adminInfo">
                    <div className="userPicture">
                        <img src={ (SessionObject.session.picture === null) ? API.data.domain + "/uploads/users/defaultavatar.png" : API.data.domain + SessionObject.session.picture } alt={ "Avatar de " + SessionObject.session.firstname + " " + SessionObject.session.lastname }></img>
                    </div>
                    <div className="greetings">
                        <h4>Bonjour</h4>
                    </div>
                    <div className="userIdentity">
                        <p>{ SessionObject.session.firstname + " " + SessionObject.session.lastname }</p>
                    </div>
                    <div className="menu">
                        <h4>Menu</h4>
                    </div>
                    <AdminMenu ContentObject={ ContentObject }></AdminMenu>
                </div>
                <div className="content">
                    { (ContentObject.content === "users") ? <Users API={ API } NotificationObject={ NotificationObject }></Users> : null }
                    { (ContentObject.content === "categories") ? <Categories API={ API } NotificationObject={ NotificationObject }></Categories> : null }
                    { (ContentObject.content === "products") ? <Products API={ API } NotificationObject={ NotificationObject }></Products> : null }
                    { (ContentObject.content === "comments") ? <Comments API={ API } NotificationObject={ NotificationObject }></Comments> : null }
                    { (ContentObject.content === "deliveries") ? <Deliveries API={ API } NotificationObject={ NotificationObject }></Deliveries> : null }
                    { (ContentObject.content === "orders") ? <Orders API={ API } NotificationObject={ NotificationObject }></Orders> : null }
                    { (ContentObject.content === "discounts") ? <Discounts API={ API } NotificationObject={ NotificationObject }></Discounts> : null }
                </div>
            </div>
            <Footer></Footer>
        </div>;
        return content;
    } else {
        return <Redirect to="/"></Redirect>;
    };
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT EXTENSION */
/* ----------------------------------------------------------------------------------------- */
function Users({ API, NotificationObject }) {
    const [ users, setUsers ] = useState(null);
    const objectUsers = { response: users, setUsers: setUsers };
    useEffect(() => {
        if(users === null) {
            fetchUsers(null, API, null, objectUsers, 1, null, null, NotificationObject);
        };
    });
    return <div id="adminusers">
        <div className="columns">
            <div className="id">
                <p>Id</p>
            </div>
        </div>
        <div className="list">
            { (users !== null) ? Array.from(users.users).map((user, key) => {
                return <div className="user" key={ key }>
                    <div className="id">
                        <p>{ user.id }</p>
                    </div>
                </div>;
            }) : null }
        </div>
        <div className="pagination">
            { (users !== null && users.previous !== null) ? <button onClick={ (event) => { return fetchUsers(event, API, null, objectUsers, null, users.previous, null, NotificationObject); } }>Page précédente</button> : null }
            { (users !== null && users.next !== null) ? <button onClick={ (event) => { return fetchUsers(event, API, null, objectUsers, null, users.next, null, NotificationObject); } }>Page suivante</button> : null }
        </div>
    </div>;
};
function Categories({ API, NotificationObject }) {
    const [ categories, setCategories ] = useState(null);
    const objectCategories = { response: categories, setCategories: setCategories };
    useEffect(() => {
        if(categories === null) {
            fetchCategories(null, API, null, objectCategories, 1, null, null, NotificationObject);
        };
    });
    return <div id="admincategories">
        <div className="columns">
            <div className="id">
                <p>Id</p>
            </div>
            <div className="name">
                <p>Name</p>
            </div>
        </div>
        <div className="list">
            { (categories !== null) ? Array.from(categories.categories).map((category, key) => {
                return <div className="category" key={ key }>
                    <div className="id">
                        <p>{ category.id }</p>
                    </div>
                    <div className="name">
                        <p>{ category.name }</p>
                    </div>
                </div>;
            }) : null }
        </div>
        <div className="pagination">
            { (categories !== null && categories.previous !== null) ? <button onClick={ (event) => { return fetchCategories(event, API, null, objectCategories, null, categories.previous, null, NotificationObject); } }>Page précédente</button> : null }
            { (categories !== null && categories.next !== null) ? <button onClick={ (event) => { return fetchCategories(event, API, null, objectCategories, null, categories.next, null, NotificationObject); } }>Page suivante</button> : null }
        </div>
    </div>;
};
function Products({ API, NotificationObject }) {
    const [ products, setProducts ] = useState(null);
    const objectProducts = { response: products, setProducts: setProducts };
    useEffect(() => {
        if(products === null) {
            fetchProducts(null, API, objectProducts, 1, null, null, NotificationObject);
        };
    });
    return <div id="adminProducts">
        <div className="columns">
            <div className="id">
                <p>Id</p>
            </div>
        </div>
        <div className="list">
            { (products !== null) ? Array.from(products.products).map((product, key) => {
                return <div className="product" key={ key }>
                    <div className="id">
                        <p>{ product.id }</p>
                    </div>
                </div>;
            }) : null }
        </div>
        <div className="pagination">
            { (products !== null && products.previous !== null) ? <button onClick={ (event) => { return fetchProducts(event, API, objectProducts, null, products.previous, null, NotificationObject); } }>Page précédente</button> : null }
            { (products !== null && products.next !== null) ? <button onClick={ (event) => { return fetchProducts(event, API, objectProducts, null, products.next, null, NotificationObject); } }>Page suivante</button> : null }
        </div>
    </div>;
};
function Comments({ API, NotificationObject }) {
    const [ comments, setComments ] = useState(null);
    const objectComments = { response: comments, setComments: setComments };
    useEffect(() => {
        if(comments === null) {
            fetchComments(null, API, null, objectComments, 1, null, null, NotificationObject);
        };
    });
    return <div id="adminComments">
        <div className="columns">
            <div className="id">
                <p>Id</p>
            </div>
        </div>
        <div className="list">
            { (comments !== null) ? Array.from(comments.comments).map((comment, key) => {
                return <div className="comment" key={ key }>
                    <div className="id">
                        <p>{ comment.id }</p>
                    </div>
                </div>;
            }) : null }
        </div>
        <div className="pagination">
            { (comments !== null && comments.previous !== null) ? <button onClick={ (event) => { return fetchComments(event, API, null, objectComments, null, comments.previous, null, NotificationObject); } }>Page précédente</button> : null }
            { (comments !== null && comments.next !== null) ? <button onClick={ (event) => { return fetchComments(event, API, null, objectComments, null, comments.next, null, NotificationObject); } }>Page suivante</button> : null }
        </div>
    </div>;
};
function Deliveries({ API, NotificationObject }) {
    const [ deliveries, setDeliveries ] = useState(null);
    const objectDeliveries = { response: deliveries, setDeliveries: setDeliveries };
    useEffect(() => {
        if(deliveries === null) {
            fetchDeliveries(null, API, null, objectDeliveries, 1, null, null, NotificationObject);
        };
    });
    return <div id="adminDeliveries">
        <div className="columns">
            <div className="id">
                <p>Id</p>
            </div>
            <div className="company">
                <p>Compagnie</p>
            </div>
            <div className="price">
                <p>Prix</p>
            </div>
        </div>
        <div className="list">
            { (deliveries !== null) ? Array.from(deliveries.deliveries).map((delivery, key) => {
                return <div className="delivery" key={ key }>
                    <div className="id">
                        <p>{ delivery.id }</p>
                    </div>
                    <div className="company">
                        <p>{ delivery.company }</p>
                    </div>
                    <div className="price">
                        <p>{ (delivery.price.toString().match(".")) ? delivery.price.toString().replace(".", "€") : delivery.price + "€" }</p>
                    </div>
                </div>;
            }) : null }
        </div>
        <div className="pagination">
            { (deliveries !== null && deliveries.previous !== null) ? <button onClick={ (event) => { return fetchDeliveries(event, API, null, objectDeliveries, null, deliveries.previous, null, NotificationObject); } }>Page précédente</button> : null }
            { (deliveries !== null && deliveries.next !== null) ? <button onClick={ (event) => { return fetchDeliveries(event, API, null, objectDeliveries, null, deliveries.next, null, NotificationObject); } }>Page suivante</button> : null }
        </div>
    </div>;
};
function Orders({ API, NotificationObject }) {
    const [ orders, setOrders ] = useState(null);
    const objectOrders = { response: orders, setOrders: setOrders };
    useEffect(() => {
        if(orders === null) {
            fetchOrders(null, API, null, objectOrders, 1, null, null, NotificationObject);
        };
    });
    return <div id="adminOrders">
        <div className="columns">
            <div className="id">
                <p>Id</p>
            </div>
        </div>
        <div className="list">
            { (orders !== null) ? Array.from(orders.orders).map((order, key) => {
                return <div className="order" key={ key }>
                    <div className="id">
                        <p>{ order.id }</p>
                    </div>
                </div>;
            }) : null }
        </div>
        <div className="pagination">
            { (orders !== null && orders.previous !== null) ? <button onClick={ (event) => { return fetchOrders(event, API, null, objectOrders, null, orders.previous, null, NotificationObject); } }>Page précédente</button> : null }
            { (orders !== null && orders.next !== null) ? <button onClick={ (event) => { return fetchOrders(event, API, null, objectOrders, null, orders.next, null, NotificationObject); } }>Page suivante</button> : null }
        </div>
    </div>;
};
function Discounts({ API, NotificationObject }) {
    const [ discounts, setDiscounts ] = useState(null);
    const objectDiscounts = { response: discounts, setDiscounts: setDiscounts };
    useEffect(() => {
        if(discounts === null) {
            fetchDiscounts(null, API, null, objectDiscounts, 1, null, null, NotificationObject);
        };
    });
    return <div id="adminDiscounts">
        <div className="columns">
            <div className="id">
                <p>Id</p>
            </div>
            <div className="code">
                <p>Code</p>
            </div>
            <div className="percent">
                <p>Pourcent</p>
            </div>
            <div className="product">
                <p>Produit</p>
            </div>
            <div className="category">
                <p>Catégorie</p>
            </div>
            <div className="site">
                <p>Site</p>
            </div>
        </div>
        <div className="list">
            { (discounts !== null) ? Array.from(discounts.discounts).map((discount, key) => {
                return <div className="discount" key={ key }>
                    <div className="id">
                        <p>{ discount.id }</p>
                    </div>
                    <div className="code">
                        <p>{ discount.code }</p>
                    </div>
                    <div className="percent">
                        <p>-{ discount.percent }%</p>
                    </div>
                    <div className="product">
                        <p>{ (discount.product) ? discount.product.id : "Aucun" }</p>
                    </div>
                    <div className="category">
                        <p>{ (discount.category) ? discount.category.id : "Aucune" }</p>
                    </div>
                    <div className="site">
                        <p>{ (discount.global) ? "Oui" : "Non" }</p>
                    </div>
                </div>;
            }) : null }
        </div>
        <div className="pagination">
            { (discounts !== null && discounts.previous !== null) ? <button onClick={ (event) => { return fetchDiscounts(event, API, null, objectDiscounts, null, discounts.previous, null, NotificationObject); } }>Page précédente</button> : null }
            { (discounts !== null && discounts.next !== null) ? <button onClick={ (event) => { return fetchDiscounts(event, API, null, objectDiscounts, null, discounts.next, null, NotificationObject); } }>Page suivante</button> : null }
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default Admin;
/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
/* ----------------------------------------------------------------------------------------- */
/* COMPONENTS */
/* ----------------------------------------------------------------------------------------- */
import { fetchUser } from "../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* COMPONENTS */
/* ----------------------------------------------------------------------------------------- */
import AccountMenu from "../../components/Menus/AccountMenu/AccountMenu";
import UserUpdateForm from "../../components/Forms/RegisterForm/UpdateForm/UserUpdateForm";
import OrdersList from "../../components/List/Orders/OrdersList";
import Footer from "../../components/Footer/Footer";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./Account.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function Account({ API, SessionObject, NotificationObject }) {
    const [ content, setContent ] = useState("informations");
    const [ user, setUser ] = useState(null);
    const objectContent = { content: content, setContent: setContent };
    useEffect(() => {
        if(user === null)
            fetchUser(API, SessionObject, setUser);
    }, [ user ]);
    return <Content API={ API } SessionObject={ SessionObject } ContentObject={ objectContent } NotificationObject={ NotificationObject } user={ user }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, SessionObject, ContentObject, NotificationObject, user }) {
    if(SessionObject.session) {
        const content = <div id="account">
            <div>
                <div className="userInfo">
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
                    <AccountMenu ContentObject={ ContentObject }></AccountMenu>
                </div>
                <div className="content">
                    { (ContentObject.content === "informations") ? <Informations API={ API } SessionObject={ SessionObject } NotificationObject={ NotificationObject }></Informations> : null }
                    { (ContentObject.content === "orders") ? <Orders API={ API } user={ user }></Orders> : null }
                    { (ContentObject.content === "comments") ? <Comments></Comments> : null }
                    { (ContentObject.content === "parameters") ? <Parameters></Parameters> : null }
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
function Informations({ API, SessionObject, NotificationObject }) {
    return <div id="informations">
        <h3>VOS INFORMATIONS</h3>
        <UserUpdateForm API={ API } SessionObject={ SessionObject } NotificationObject={ NotificationObject }></UserUpdateForm>
    </div>;
};
function Orders({ API, user }) {
    return <div id="orders">
        <h3>VOS COMMANDES</h3>
        <OrdersList API={ API } user={ user } />
    </div>;
};
function Comments({ CommentsObject }) {
    return <div id="comments">
        <h3>VOS AVIS</h3>
        <div className="commentsList">

        </div>
    </div>;
};
function Parameters() {
    return <div id="parameters">
        <h3>VOS PARAMÈTRES</h3>
        <div className="parametersContainer">
            <div>
                
            </div>
            <div>
                
            </div>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default Account;
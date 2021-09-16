/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React from "react";
import { Redirect } from "react-router-dom";
/* ----------------------------------------------------------------------------------------- */
/* COMPONENTS */
/* ----------------------------------------------------------------------------------------- */
import RegisterForm from "../../components/Forms/RegisterForm/RegisterForm";
import Footer from "../../components/Footer/Footer";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./Register.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function Register({ API, SessionObject, NotificationObject }) {
    if(SessionObject.session) {
        return <Redirect to="/compte"></Redirect>;
    } else {
        return <Content API={ API } SessionObject={ SessionObject } NotificationObject={ NotificationObject }></Content>;
    };
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, NotificationObject }) {
    const content = <div id="register">
        <RegisterForm API={ API } NotificationObject={ NotificationObject }></RegisterForm>
        <Footer></Footer>
    </div>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default Register;
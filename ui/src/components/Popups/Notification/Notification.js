/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./Notification.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function Notification({ NotificationObject }) {
    const notification = document.querySelector("#notification");
    const message = document.querySelector("#notification > p");
    if(notification && message.innerText !== NotificationObject.content.message) {
        notification.classList.remove("hide");
    };
    setTimeout(() => {
        const notification = document.querySelector("#notification");
        if(notification) {
            notification.classList.add("hide");
        };
    }, 5000);
    return <Content NotificationObject={ NotificationObject }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ NotificationObject }) {
    const content = <div id="notification">
        <div className="icon">
            <FontAwesomeIcon icon={ faInfo }></FontAwesomeIcon>
        </div>
        { (NotificationObject !== null) ? <p>{ NotificationObject.content.message }</p> : null }
    </div>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default Notification;
/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchLogout } from "../../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function LogoutButton({ API, SessionObject, NotificationObject }) {
    return <Content API={ API } SessionObject={ SessionObject } NotificationObject={ NotificationObject }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, SessionObject, NotificationObject }) {
    const [ logOut, setLogOut ] = useState(false);
    useEffect(() => {
        if(logOut){
            fetchLogout(logOut, API, SessionObject, NotificationObject);
        }
    }, [ logOut ])
    let content = <button title="Déconnexion" className="label" onClick={ (event) => { setLogOut(event); } }>Déconnexion</button>;
    return(!logOut) ? content : <Redirect to="/"></Redirect>;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default LogoutButton;
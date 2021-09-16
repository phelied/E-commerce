/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchLogin } from "../../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./LoginForm.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function LoginForm({ API, SessionObject, NotificationObject }) {
    const [ credential, setCredential ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const objectFields = { credential: credential, setCredential: setCredential, password: password, setPassword: setPassword };
    return <Content API={ API } SessionObject={ SessionObject } FieldsObject={ objectFields } NotificationObject={ NotificationObject }></Content>
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, SessionObject, FieldsObject, NotificationObject }) {
    let content = <div id="loginForm">
        <form>
            <h3>Matrix<span>TechTips</span></h3>
            <div>
                <div className="icon">
                    <FontAwesomeIcon icon={ faAt }></FontAwesomeIcon>
                </div>
                <input type="text" onChange={ (event) => { return FieldsObject.setCredential(event.target.value); } } placeholder="Email / Téléphone"></input>
            </div>
            <div>
                <div className="icon">
                    <FontAwesomeIcon icon={ faKey }></FontAwesomeIcon>
                </div>
                <input type="password" onChange={ (event) => { return FieldsObject.setPassword(event.target.value); } } placeholder="Mot de passe"></input>
            </div>
            <div>
                <input type="submit" value="Connexion" onClick={ (event) => { return fetchLogin(event, API, SessionObject, FieldsObject, NotificationObject); } }></input>
            </div>
            <p>Pas de compte ?<br></br>Inscrivez-vous <Link to="/inscription">ici</Link> !</p>
        </form>
    </div>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default LoginForm;
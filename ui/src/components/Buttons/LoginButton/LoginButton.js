/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function LoginButton() {
    const [ loginForm, toggleLoginForm ] = useState(false);
    const objectLoginForm = { state: loginForm, toggleLoginForm: toggleLoginForm };
    document.addEventListener("click", (event) => {
        const loginFormContainer = document.querySelector("#loginForm");
        if(loginFormContainer && !event.target.closest("#loginForm") && loginFormContainer.classList.contains("openedLogin")) {
            return toggleLoginForm(!loginForm);
        };
    });
    useEffect(() => {
        const loginFormElement = document.querySelector("#loginForm");
        return (loginForm) ? loginFormElement.classList.add("openedLogin") : loginFormElement.classList.remove("openedLogin");
    }, [ loginForm ]);
    return <Content LoginFormObject={ objectLoginForm }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ LoginFormObject }) {
    const content = <button title="Connexion" className="label" onClick={ () => { return LoginFormObject.toggleLoginForm(!LoginFormObject.state); } }>Connexion</button>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default LoginButton;
/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchDeleteComment } from "../../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./Confirm.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function Confirm({ API, Action, SessionObject, ActionObject, NotificationObject }) {
    const [ confirm, setConfirm ] = useState(null);
    const objectConfirm = { state: confirm, setConfirm: setConfirm };
    useEffect(() => {
        if(confirm !== null) {
            if(Action.match(/(update)/)) {
                if(confirm) {
                    const comment = ActionObject.UpdateObject.state.element;
                    ActionObject.UpdateObject.setUpdateAction({ isTrue: false, element: comment });
                    return ActionObject.CommentUpdateFormObject.toggleCommentUpdateForm(true);
                } else {
                    return ActionObject.UpdateObject.setUpdateAction(false);
                };
            } else {
                if(confirm) {
                    return fetchDeleteComment(API, SessionObject, ActionObject, NotificationObject);
                } else {
                    return ActionObject.DeleteObject.setDeleteAction(false);
                };
            };
        };
    });
    return <Content Action={ Action } ConfirmObject={ objectConfirm }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ Action, ConfirmObject }) {
    const content = <div id="confirmLayer">
        <div className="confirm">
            <p>Êtes-vous certain de vouloir { (Action.match(/(update)/)) ? "mettre à jour" : "supprimer" } cet élément ?</p>
            <div className="buttons">
                <button className="confirm" onClick={ () => { return ConfirmObject.setConfirm(true); } }>Oui</button>
                <button className="cancel" onClick={ () => { return ConfirmObject.setConfirm(false); } }>Annuler</button>
            </div>
        </div>
    </div>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default Confirm;
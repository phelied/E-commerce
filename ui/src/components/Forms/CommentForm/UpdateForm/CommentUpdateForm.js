/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState } from "react";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchUpdateComment } from "../../../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./CommentUpdateForm.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function CommentUpdateForm({ API, SessionObject, ActionObject, NotificationObject }) {
    const [ title, setTitle ] = useState(ActionObject.UpdateObject.state.element.title);
    const objectTitle = { title: title, setTitle: setTitle };
    const [ content, setContent ] = useState(ActionObject.UpdateObject.state.element.content);
    const objectContent = { content: content, setContent: setContent };
    const [ stars, setStars ] = useState(ActionObject.UpdateObject.state.element.stars);
    const objectStars = { stars: stars, setStars: setStars };
    const objectFields = { TitleObject: objectTitle, ContentObject: objectContent, StarsObject: objectStars };
    return <Content API={ API } SessionObject={ SessionObject } ActionObject={ ActionObject } FieldsObject={ objectFields } NotificationObject={ NotificationObject }></Content>
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, SessionObject, ActionObject, FieldsObject, NotificationObject }) {
    const content = <div id="commentUpdate">
        <form>
            <div>
                <input type="text" onChange={ (event) => { return FieldsObject.TitleObject.setTitle(event.target.value); } } placeholder="Titre de l'avis" value={ FieldsObject.TitleObject.title }></input>
            </div>
            <div>
                <input type="text" onChange={ (event) => { return FieldsObject.ContentObject.setContent(event.target.value); } } placeholder="Rédiger un avis" value={ FieldsObject.ContentObject.content }></input>
            </div>
            <div className="formFooter">
                <div id="stars">
                    <input type="radio" onClick={ (event) => { return FieldsObject.StarsObject.setStars(event.target.value); } } id="star5" name="stars" value="5"></input>
                    <label className="full" htmlFor="star5" title="5 étoiles"></label>
                    <input type="radio" onClick={ (event) => { return FieldsObject.StarsObject.setStars(event.target.value); } } id="star4half" name="stars" value="4.5"></input>
                    <label className="half" htmlFor="star4half" title="4.5 étoiles"></label>
                    <input type="radio" onClick={ (event) => { return FieldsObject.StarsObject.setStars(event.target.value); } } id="star4" name="stars" value="4"></input>
                    <label className="full" htmlFor="star4" title="4 étoiles"></label>
                    <input type="radio" onClick={ (event) => { return FieldsObject.StarsObject.setStars(event.target.value); } } id="star3half" name="stars" value="3.5"></input>
                    <label className="half" htmlFor="star3half" title="3.5 étoiles"></label>
                    <input type="radio" onClick={ (event) => { return FieldsObject.StarsObject.setStars(event.target.value); } } id="star3" name="stars" value="3"></input>
                    <label className="full" htmlFor="star3" title="3 étoiles"></label>
                    <input type="radio" onClick={ (event) => { return FieldsObject.StarsObject.setStars(event.target.value); } } id="star2half" name="stars" value="2.5"></input>
                    <label className="half" htmlFor="star2half" title="2.5 étoiles"></label>
                    <input type="radio" onClick={ (event) => { return FieldsObject.StarsObject.setStars(event.target.value); } } id="star2" name="stars" value="2"></input>
                    <label className="full" htmlFor="star2" title="2 étoiles"></label>
                    <input type="radio" onClick={ (event) => { return FieldsObject.StarsObject.setStars(event.target.value); } } id="star1half" name="stars" value="1.5"></input>
                    <label className="half" htmlFor="star1half" title="1.5 étoile"></label>
                    <input type="radio" onClick={ (event) => { return FieldsObject.StarsObject.setStars(event.target.value); } } id="star1" name="stars" value="1"></input>
                    <label className="full" htmlFor="star1" title="1 étoile"></label>
                    <input type="radio" onClick={ (event) => { return FieldsObject.StarsObject.setStars(event.target.value); } } id="starhalf" name="stars" value="0.5"></input>
                    <label className="half" htmlFor="starhalf" title="0.5 étoile"></label>
                </div>
                <div>
                    <input type="submit" value="Soumettre mon avis" onClick={ (event) => { return fetchUpdateComment(event, API, SessionObject, ActionObject, FieldsObject, NotificationObject); } }></input>
                </div>
            </div>
        </form>
    </div>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default CommentUpdateForm;
/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState } from "react";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchCreateComment } from "../../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./CommentForm.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function Comment({ API, SessionObject, ProductObject, NotificationObject }) {
    const [ comment, setComment ] = useState(null);
    const objectComment = { response: comment, setComment: setComment };
    const [ title, setTitle ] = useState(null);
    const objectTitle = { title: title, setTitle: setTitle };
    const [ content, setContent ] = useState(null);
    const objectContent = { content: content, setContent: setContent };
    const [ stars, setStars ] = useState(null);
    const objectStars = { stars: stars, setStars: setStars };
    const objectFields = { TitleObject: objectTitle, ContentObject: objectContent, StarsObject: objectStars };
    return <Content API={ API } SessionObject={ SessionObject } ProductObject={ ProductObject } CommentObject={ objectComment } FieldsObject={ objectFields } NotificationObject={ NotificationObject }></Content>
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, SessionObject, ProductObject, CommentObject, FieldsObject, NotificationObject }) {
    const content = <div id="commentForm">
        <form>
            <div>
                <input type="text" onChange={ (event) => { return FieldsObject.TitleObject.setTitle(event.target.value); } } placeholder="Titre de l'avis"></input>
            </div>
            <div>
                <input type="text" onChange={ (event) => { return FieldsObject.ContentObject.setContent(event.target.value); } } placeholder="Rédiger un avis"></input>
            </div>
            <div className="formFooter">
                <div id="stars">
                    <input type="radio" onClick={ () => { return FieldsObject.StarsObject.setStars(5); } } id="star5" name="stars" value="5"></input>
                    <label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                    <input type="radio" onClick={ () => { return FieldsObject.StarsObject.setStars(4.5); } } id="star4half" name="stars" value="4.5"></input>
                    <label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                    <input type="radio" onClick={ () => { return FieldsObject.StarsObject.setStars(4); } } id="star4" name="stars" value="4"></input>
                    <label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                    <input type="radio" onClick={ () => { return FieldsObject.StarsObject.setStars(3.5); } } id="star3half" name="stars" value="3.5"></input>
                    <label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                    <input type="radio" onClick={ () => { return FieldsObject.StarsObject.setStars(3); } } id="star3" name="stars" value="3"></input>
                    <label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                    <input type="radio" onClick={ () => { return FieldsObject.StarsObject.setStars(2.5); } } id="star2half" name="stars" value="2.5"></input>
                    <label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                    <input type="radio" onClick={ () => { return FieldsObject.StarsObject.setStars(2); } } id="star2" name="stars" value="2"></input>
                    <label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                    <input type="radio" onClick={ () => { return FieldsObject.StarsObject.setStars(1.5); } } id="star1half" name="stars" value="1.5"></input>
                    <label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                    <input type="radio" onClick={ () => { return FieldsObject.StarsObject.setStars(1); } } id="star1" name="stars" value="1"></input>
                    <label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                    <input type="radio" onClick={ () => { return FieldsObject.StarsObject.setStars(0.5); } } id="starhalf" name="stars" value="0.5"></input>
                    <label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                </div>
                <div>
                    <input type="submit" value="Soumettre mon avis" onClick={ (event) => { return fetchCreateComment(event, API, SessionObject, ProductObject, CommentObject, FieldsObject, NotificationObject); } }></input>
                </div>
            </div>
        </form>
    </div>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default Comment;
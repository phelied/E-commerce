/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStar, faStarHalf, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
/* ----------------------------------------------------------------------------------------- */
/* COMPONENTS */
/* ----------------------------------------------------------------------------------------- */
import AddToCartButton from "../../components/Buttons/AddToCartButton/AddToCartButton";
import CommentForm from "../../components/Forms/CommentForm/CommentForm";
import CommentUpdateForm from "../../components/Forms/CommentForm/UpdateForm/CommentUpdateForm";
import Gallery from "../../components/Gallery/Gallery";
import Confirm from "../../components/Popups/Confirm/Confirm";
import Footer from "../../components/Footer/Footer";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchProduct, getPostedCommentStars, fullGallery, setBigPicture } from "../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./Product.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function Product({ API, SessionObject, NotificationObject }) {
    const { id } = useParams();
    const [ product, setProduct ] = useState(null);
    const objectProduct = { response: product, setProduct: setProduct };
    const [ updateAction, setUpdateAction ] = useState({ isTrue: false, element: null });
    const objectUpdate = { state: updateAction, setUpdateAction: setUpdateAction };
    const [ deleteAction, setDeleteAction ] = useState({ isTrue: false, element: null });
    const objectDelete = { state: deleteAction, setDeleteAction: setDeleteAction };
    const [ commentUpdateForm, toggleCommentUpdateForm ] = useState(false);
    const objectCommentUpdateForm = { state: commentUpdateForm, toggleCommentUpdateForm: toggleCommentUpdateForm };
    const objectAction = { UpdateObject: objectUpdate, DeleteObject: objectDelete, CommentUpdateFormObject: objectCommentUpdateForm };
    useEffect(() => {
        return fetchProduct(API, objectProduct, id);
    }, [ id ]);
    return <Content API={ API } SessionObject={ SessionObject } ProductObject={ objectProduct } NotificationObject={ NotificationObject } ActionObject={ objectAction }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, SessionObject, ProductObject, NotificationObject, ActionObject }) {
    let content = null;
    if(ProductObject.response !== null) {
        const firstPicture = ProductObject.response.product.pictures[0];
        content = <div id="product">
            <div className="productBanner">
                <div className="galery">
                    <div className="bigPicture">
                        <img src={ API.data.domain + firstPicture } onClick={ (event) => { return fullGallery(event); } } alt={ "Aperçu du produit " + ProductObject.response.product.title }></img>
                    </div>
                    <div className="miniatures">
                        { ProductObject.response.product.pictures.map((picture, key) => {
                            return <img key={ key } className="fit-picture" src={ API.data.domain + picture} onMouseOver={ (event) => { return setBigPicture(event); } } alt={ "Aperçu du produit " + ProductObject.response.product.title }></img>
                        }) }
                    </div>
                </div>
                <div className="productTitles">
                    <h3>{ (ProductObject.response.product.title.length > 50) ? ProductObject.response.product.title.substr(0, 47) + "..." : ProductObject.response.product.title }</h3>
                    <h4 title={ ProductObject.response.product.subtitle }>{ (ProductObject.response.product.subtitle.length > 60) ? ProductObject.response.product.subtitle.substr(0, 57) + "..." : ProductObject.response.product.subtitle }</h4>
                    <ul>
                        <li>Nombre d'avis : <span>{ ProductObject.response.product.comments.length }</span></li>
                        <li>Note du produit : <span>{ ((ProductObject.response.product.stars === null) ? "0" : Math.round(ProductObject.response.product.stars * 10) / 10) + " / 5" }</span></li>
                        <li>Poids du produit : <span>{ (ProductObject.response.product.weight !== null) ? ProductObject.response.product.weight + "kg" : "Non indiqué" }</span></li>
                        <li>État du produit : <span className={ (ProductObject.response.product.available) ? "available" : "unavailable" }>{ (ProductObject.response.product.available) ? "Disponible" : "Indisponible" }</span></li>
                    </ul>
                    { (ProductObject.response.product.discount) ? <p>
                        Produit actuellement en promotion !
                        <br></br>
                        Utilisez le code suivant : <span>{ ProductObject.response.product.discount.code }</span>
                        <br></br>
                        Vous bénéficierez d'une réduction de <span>{ ProductObject.response.product.discount.percent }%</span> sur ce produit !
                    </p> : null }
                </div>
                <div className="productInfos">
                    <p className="price">{ (ProductObject.response.product.price.toString().match(".")) ? ProductObject.response.product.price.toString().replace(".", "€") : ProductObject.response.product.price + "€" }</p>
                    <AddToCartButton Product={ ProductObject.response.product }></AddToCartButton>
                    <div className="productQuantity">
                        <h5>En stock</h5>
                        <p>{ ProductObject.response.product.quantity }</p>
                    </div>
                </div>
            </div>
            <div className="breadcrumb">
                <div>
                    <FontAwesomeIcon icon={ faHome }></FontAwesomeIcon>
                    <Link to="/">Accueil</Link>
                </div>
                <p className="separator">/</p>
                <Link to={ "/catégorie/" + ProductObject.response.product.category.id }>{ ProductObject.response.product.category.name }</Link>
                <p className="separator">/</p>
                <p>{ ProductObject.response.product.title }</p>
            </div>
            <div className="productDescription">
                <h3>Description</h3>
                <p>{ ProductObject.response.product.description }</p>
            </div>
            <div className="productComment">
                <h3>Laisser un avis</h3>
                <CommentForm API={ API } SessionObject={ SessionObject } ProductObject={ ProductObject } NotificationObject={ NotificationObject }></CommentForm>
            </div>
            <div className="userComments">
                <h3>Avis sur le produit</h3>
                <div className="commentsList">
                    { (ProductObject.response.product.comments.length > 0) ? ProductObject.response.product.comments.map((comment, key) => {
                        return <div key={ key } className="comment">
                            <div className="userPicture">
                                <img src={ (comment.user.picture === null) ? API.data.domain + "/uploads/users/defaultavatar.png" : API.data.domain + comment.user.picture } alt="Avatar"></img>
                            </div>
                            <div className="commentInfo">
                                <p className="title">{ comment.title }</p>
                                <p className="content">{ comment.content }</p>
                                <p className="author">Posté par&nbsp;<span>{ comment.user.firstname + " " + comment.user.lastname.substr(0, 1) + "." }</span>&nbsp;le&nbsp;<span>{ new Date(comment.date).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }) }</span></p>
                                <div className={ (SessionObject.session === null || SessionObject.session.id !== comment.user.id) ? "userNotation pushRight" : "userNotation" }>
                                    <div className="greyStars">
                                        { Object.entries(getPostedCommentStars(comment.stars)).map((star, key) => {
                                            return <FontAwesomeIcon key={ key } icon={ faStar }></FontAwesomeIcon>;
                                        }) }
                                    </div>
                                    <div className="coloredStars">
                                        { Object.entries(getPostedCommentStars(comment.stars)).map((star, key) => {
                                            if(star[1] === "full") {
                                                return <FontAwesomeIcon key={ key } icon={ faStar }></FontAwesomeIcon>;
                                            } else if(star[1] === "half") {
                                                return <FontAwesomeIcon key={ key } icon={ faStarHalf }></FontAwesomeIcon>;
                                            } else {
                                                return <FontAwesomeIcon key={ key } icon={ faStar } style={ { opacity: 0 } }></FontAwesomeIcon>;
                                            };
                                        }) }
                                    </div>
                                </div>
                                { (SessionObject.session !== null && ProductObject.response !== null) ? ((SessionObject.session.id === comment.user.id) ? <div className="userButtons">
                                    <button title="Modifier le commentaire" className="editComment" onClick={ () => { return ActionObject.UpdateObject.setUpdateAction({ isTrue: true, element: comment }); } }>
                                        <FontAwesomeIcon icon={ faPen }></FontAwesomeIcon>
                                    </button>
                                    <button title="Supprimer le commentaire" className="deleteComment" onClick={ () => { return ActionObject.DeleteObject.setDeleteAction({ isTrue: true, element: comment }); } }>
                                        <FontAwesomeIcon icon={ faTrash }></FontAwesomeIcon>
                                    </button>
                                </div> : null) : null }
                            </div>
                        </div>;
                    }) : null }
                </div>
            </div>
            <div className="sameCategoryProducts">
                <h3>Produits similaires</h3>
                <div className="someProducts">
                    { ProductObject.response.product.category.products.map((product, key) => {
                        if(product.id && key < 5) {
                            return <div key={ key } className="similarProduct" title={ product.title }>
                                <div className="carousel">
                                    { product.pictures.map((element, key) => { return <img key={ key } src={ API.data.domain + element } alt="Représentation graphique du produit."></img> }) }
                                </div>
                                <div className="category">
                                    <p>{ ProductObject.response.product.category.name }</p>
                                </div>
                                <div className="price">
                                    <p>{ (product.price.toString().match(".")) ? product.price.toString().replace(".", "€") : product.price + "€" }</p>
                                </div>
                                <div className="title">
                                    {/* <p>{ (product.title.length > 10) ? product.title.substr(0, 17) + "..." : product.title }</p> */}
                                    <Link key={ key } to={ "/produit/" + product.id } className="seeProduct">Voir</Link>
                                </div>
                                {/* <AddToCartButton Product={ product }></AddToCartButton> */}
                            </div>;
                        } else {
                            return null;
                        };
                    }) }
                </div>
            </div>
            <Gallery></Gallery>
            { (ActionObject.UpdateObject.state.isTrue) ? <Confirm API={ API } Action={ "updateComment" } SessionObject={ SessionObject } ActionObject={ ActionObject } NotificationObject={ NotificationObject }></Confirm> : null }
            { (ActionObject.DeleteObject.state.isTrue) ? <Confirm API={ API } Action={ "deleteComment" } SessionObject={ SessionObject } ActionObject={ ActionObject } NotificationObject={ NotificationObject }></Confirm> : null }
            { (ActionObject.CommentUpdateFormObject.state) ? <CommentUpdateForm API={ API } SessionObject={ SessionObject } ActionObject={ ActionObject } NotificationObject={ NotificationObject }></CommentUpdateForm> : null }     
            <Footer></Footer>
        </div>;
    } else {
        content = <></>;
    };
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default Product;
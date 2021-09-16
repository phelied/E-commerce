/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/* ----------------------------------------------------------------------------------------- */
/* COMPONENTS */
/* ----------------------------------------------------------------------------------------- */
import AddToCartButton from "../../components/Buttons/AddToCartButton/AddToCartButton";
import Footer from "../../components/Footer/Footer";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchLatestProducts, slideLeft, slideRight, resetLastOffset } from "../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./Home.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function Home({ API }) {
    const [ latestProducts, setLatestProducts ] = useState(null);
    const objectLatestProducts = { response: latestProducts, setLatestProducts: setLatestProducts };
    useEffect(() => {
        if(latestProducts === null) {
            return fetchLatestProducts(API, objectLatestProducts);
        };
    });
    resetLastOffset();
    return <Content API={ API } LatestProductsObject={ objectLatestProducts }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, LatestProductsObject }) {
    const content = <div id="home">
        <div className="slider">
            <div className="arrows">
                <a href="#gauche" onClick={ (event) => { return slideLeft(event); } }>
                    <FontAwesomeIcon icon={ faChevronLeft }></FontAwesomeIcon>
                </a>
                <a href="#droite" onClick={ (event) => { return slideRight(event); } }>
                    <FontAwesomeIcon icon={ faChevronRight }></FontAwesomeIcon>
                </a>
            </div>
            { (LatestProductsObject.response !== null) ? Array.from(LatestProductsObject.response.products).map((product, key) => {
                return <div key={ key } className="product">
                    <div className="new">
                        <p>Nouveau</p>
                    </div>
                    <div className="title">
                        <h3>{ (product.title.length > 30) ? product.title.substr(0, 27) + "..." : product.title }</h3>
                    </div>
                    <div className="price">
                        <p>{ (product.price.toString().match(".")) ? product.price.toString().replace(".", "€") : product.price + "€" }</p>
                    </div>
                    <AddToCartButton Product={ product }></AddToCartButton>
                    <Link className="seeMore" to={ "/produit/" + product.id }>Voir le produit</Link>
                    <div className="pictures">
                        { Array.from(product.pictures).map((picture, subkey) => {
                            return <img key={ subkey } src={ API.data.domain + picture } alt="Illustration du produit."></img>;
                        }) }
                    </div>
                </div>;
            }) : null }
        </div>
        <div className="latestProductsBanner">
            <div>
                <h2>Matrix<span>TechTips</span></h2>
                <p>Leader dans la vente de produits Tech'</p>
            </div>
        </div>
        <Footer></Footer>
    </div>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default Home;
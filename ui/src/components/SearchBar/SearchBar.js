/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchSearchedProducts } from "../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./SearchBar.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function SearchBar({ API }) {
    const [list, toggleList] = useState(false);
    const objectList = { state: list, toggleList: toggleList };
    const [products, setProducts] = useState(null);
    const objectProducts = { response: products, setProducts: setProducts };
    return <Content API={ API } ListObject={ objectList } ProductsObject={ objectProducts }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, ListObject, ProductsObject }) {
    const content = <>
        <div id="searchBar">
            <label className="icon" htmlFor="searchInput">
                <FontAwesomeIcon icon={ faSearch }></FontAwesomeIcon>
            </label>
            <input id="searchInput" title="Recherche" type="search" aria-label="Rechercher un produit en particulier." placeholder="Rechercher" onChange={ (event) => { return fetchSearchedProducts(event, API, ListObject, ProductsObject); } }></input>
        </div>
        { (ProductsObject.response !== null) ? <div className="matchedProducts" style={ { display: (ListObject.state) ? "flex" : "none" } }>
            { (ProductsObject.response.products !== undefined) ? Array.from(ProductsObject.response.products).map((product, key) => {
                return <Link key={ key } title={ product.title } to={ "/produit/" + product.id }>
                    <div className="icon">
                        <FontAwesomeIcon icon={ faShoppingBag }></FontAwesomeIcon>
                    </div>
                    <p>{ (product.title.length > 30) ? product.title.substr(0, 27) + "..." : product.title }</p>
                </Link>;
            }) : null }
        </div> : null }
    </>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default SearchBar;
/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchCategories } from "../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./Categories.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function Categories({ API, NotificationObject }) {
    const [ categories, setCategories ] = useState(null);
    const objectCategories = { response: categories, setCategories: setCategories };
    useEffect(() => {
        if(categories === null) {
            fetchCategories(null, API, null, objectCategories, 1, null, NotificationObject);
        };
    });
    return <Content API={ API } CategoriesObject={ objectCategories } NotificationObject={ NotificationObject }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, CategoriesObject, NotificationObject }) {
    const content = <div id="categories">
        <div className="categoriesFilters">

        </div>
        <div className="categoriesList">
            <div className="display">
                { (CategoriesObject.response !== null) ? Array.from(CategoriesObject.response.categories).map((category, key) => {
                    return <Link to={ "/categorie/" + category.id } className="categoryCard" key={ key }>
                        <div>
                            <h3>{ category.name }</h3>
                            <p><span>{ category.products.length }</span>&nbsp;produit(s)</p>
                        </div>
                        { (category.discount) ? <div className="discount">
                            <p>Promotion disponible !</p>
                        </div> : null }
                    </Link>;
                }) : null }
            </div>
        </div>
        <div className="pagination">
            { (CategoriesObject.response !== null && CategoriesObject.response.previous !== null) ? <button onClick={ (event) => { return fetchCategories(event, API, null, CategoriesObject, null, CategoriesObject.response.previous, NotificationObject); } }>Page précédente</button> : null }
            { (CategoriesObject.response !== null && CategoriesObject.response.next !== null) ? <button onClick={ (event) => { return fetchCategories(event, API, null, CategoriesObject, null, CategoriesObject.response.next, NotificationObject); } }>Page suivante</button> : null }
        </div>
    </div>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default Categories;
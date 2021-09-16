/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
/* ----------------------------------------------------------------------------------------- */
/* COMPONENTS */
/* ----------------------------------------------------------------------------------------- */
import AddToCartButton from "../../components/Buttons/AddToCartButton/AddToCartButton";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchProducts, fetchMinAndMax } from "../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./Products.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function Products({ API, NotificationObject }) {
    const [ products, setProducts ] = useState(null);
    const objectProducts = { response: products, setProducts: setProducts };
    const [ sort, setSort ] = useState(null);
    const objectSort = { sort: sort, setSort: setSort };
    const [ minPrice, setMinPrice ] = useState(null);
    const objectMinPrice = { price: minPrice, setMinPrice: setMinPrice };
    const [ maxPrice, setMaxPrice ] = useState(null);
    const objectMaxPrice = { price: maxPrice, setMaxPrice: setMaxPrice };
    const [ available, setAvailable ] = useState(false);
    const objectAvailable = { available: available, setAvailable: setAvailable };
    const objectFields = { SortObject: objectSort, MinPriceObject: objectMinPrice, MaxPriceObject: objectMaxPrice, AvailableObject: objectAvailable };
    useEffect(() => {
        if(products === null) {
            fetchMinAndMax(null, API, objectMinPrice, objectMaxPrice);
            fetchProducts(null, API, objectProducts, 1, null, objectFields, NotificationObject);
        };
    });
    return <Content API={ API } ProductsObject={ objectProducts } FieldsObject={ objectFields } NotificationObject={ NotificationObject }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, ProductsObject, FieldsObject, NotificationObject }) {
    const content = <div id="products">
        <div className="productsFilters">
            <h4>Filtres</h4>
            <form>
                <div>
                    <label htmlFor="sort">Trier par :</label>
                    <select id="sort" defaultValue="null" onChange={ (event) => { return FieldsObject.SortObject.setSort(event.target.value); } }>
                        <option disabled value="null">---</option>
                        <option value="id_desc">Nouveauté</option>
                        <option value="stars_desc">Popularité</option>
                        <option value="price_asc">Prix croissant</option>
                        <option value="price_desc">Prix décroissant</option>
                    </select>
                </div>
                <div>
                    <label>Prix min et max :</label>
                    <div>
                        <input type="number" value={ (FieldsObject.MinPriceObject.price !== null) ? FieldsObject.MinPriceObject.price : 0 } onChange={ (event) => { return FieldsObject.MinPriceObject.setMinPrice((event.target.value === "" || event.target.value === 0 || event.target.value < 0) ? null : event.target.value); } } placeholder="Min"></input>
                        <input type="number" value={ (FieldsObject.MaxPriceObject.price !== null) ? FieldsObject.MaxPriceObject.price : 0 } onChange={ (event) => { return FieldsObject.MaxPriceObject.setMaxPrice((event.target.value === "" || event.target.value === 0 || event.target.value < 0) ? null : event.target.value); } } placeholder="Max"></input>
                    </div>
                </div>
                <div>
                    <label>Disponibilité :</label>
                    <div>
                        <input id="available" type="checkbox" onChange={ () => { return FieldsObject.AvailableObject.setAvailable(!FieldsObject.AvailableObject.available); } }></input>
                        <label htmlFor="available">Disponible</label>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Valider" onClick={ (event) => { return fetchProducts(event, API, ProductsObject, null, "/products/read/1", FieldsObject, NotificationObject); } }></input>
                </div>
            </form>
        </div>
        <div className="productsList">
            <div className="display">
                { (ProductsObject.response !== null) ? Array.from(ProductsObject.response.products).map((product, key) => {
                    return <div className="productCard" key={ key }>
                        <div className="carousel">
                            { product.pictures.map((element, key) => { return <img key={ key } src={ API.data.domain + element } alt="Représentation graphique du produit."></img> }) }
                        </div>
                        <div className="category">
                            <p>{ product.category.name }</p>
                        </div>
                        <div className="title" title={ product.title }>
                            <p>{ (product.title.length > 10) ? product.title.substr(0, 17) + "..." : product.title }</p>
                            <p className="price">{ (product.price.toString().match(".")) ? product.price.toString().replace(".", "€") : product.price + "€" }</p>
                            <Link key={ key } to={ "/produit/" + product.id } className="seeProduct">Voir le produit</Link>
                        </div>
                        <AddToCartButton Product={ product }></AddToCartButton>
                        { (product.discount) ? <div className="discount">
                            <p>Promotion disponible !</p>
                        </div> : null }
                    </div>;
                }) : null }
            </div>
        </div>
        <div className="pagination">
            { (ProductsObject.response !== null && ProductsObject.response.previous !== null) ? <button onClick={ (event) => { return fetchProducts(event, API, ProductsObject, null, ProductsObject.response.previous, FieldsObject, NotificationObject); } }>Page précédente</button> : null }
            { (ProductsObject.response !== null && ProductsObject.response.next !== null) ? <button onClick={ (event) => { return fetchProducts(event, API, ProductsObject, null, ProductsObject.response.next, FieldsObject, NotificationObject); } }>Page suivante</button> : null }
        </div>
    </div>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default Products;
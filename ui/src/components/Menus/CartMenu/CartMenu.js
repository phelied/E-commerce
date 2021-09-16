/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import { Link } from "react-router-dom";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./CartMenu.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function CartMenu() {
    const cart = localStorage.getItem("cart");
    if(cart) {
        const parseCart = JSON.parse(cart);
        var productsCount = 0;
        var cartTotal = 0;
        if(parseCart !== null && parseCart !== undefined){
            parseCart.forEach((item) => {
                productsCount += item.quantity;
                if(item.quantity > 1) {
                    let result = item.quantity * parseFloat(item.product.price);
                    cartTotal += Math.floor(result * 10 / 10);
                } else {
                    cartTotal += item.product.price;
                };
            });
        }
    };
    const objectCartData = { products: productsCount, total: cartTotal };
    return <Content CartDataObject={ objectCartData }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ CartDataObject }) {
    var content = null;
    console.log(CartDataObject)
    if(CartDataObject !== null && CartDataObject !== undefined) {
        if(CartDataObject.products !== null && CartDataObject.products !== undefined && CartDataObject.total !== null && CartDataObject.total !== undefined) {
            content = <div className="cartMenu">
                <div>
                    <h3>Matrix<span>TechTips</span></h3>
                    <h4>Panier</h4>
                    <p><span>{ CartDataObject.products }</span>&nbsp; produits ajoutés.</p>
                    <p>Coût total : <span>{ (CartDataObject.total.toString().match(".")) ? (Math.round(CartDataObject.total*100)/100).toString().replace(".", "€") : CartDataObject.total + "€" }</span>.</p>
                    <Link to="/panier">Voir mon panier</Link>
                </div>
            </div>;
        } else {
            content = <div className="cartMenu">
                <div>
                    <h3>Matrix<span>TechTips</span></h3>
                    <h4>Panier</h4>
                    <p>Votre panier est vide.</p>
                </div>
            </div>;
        };
    } else {
        content = <div className="cartMenu">
            <div>
                <h3>Matrix<span>TechTips</span></h3>
                <h4>Panier</h4>
                <p>Votre panier est vide.</p>
            </div>
        </div>;
    };
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default CartMenu;
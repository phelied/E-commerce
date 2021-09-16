/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./AdminMenu.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function AdminMenu({ ContentObject }) {
    return <Content ContentObject={ ContentObject }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ ContentObject }) {
    const content = <ul id="adminMenu">
        <li>
            <button onClick={ () => { return ContentObject.setContent("users"); } }>Utilisateurs</button>
        </li>
        <li>
            <button onClick={ () => { return ContentObject.setContent("categories"); } }>Catégories</button>
        </li>
        <li>
            <button onClick={ () => { return ContentObject.setContent("products"); } }>Produits</button>
        </li>
        <li>
            <button onClick={ () => { return ContentObject.setContent("comments"); } }>Avis</button>
        </li>
        <li>
            <button onClick={ () => { return ContentObject.setContent("deliveries"); } }>Transporteurs</button>
        </li>
        <li>
            <button onClick={ () => { return ContentObject.setContent("orders"); } }>Commandes</button>
        </li>
        <li>
            <button onClick={ () => { return ContentObject.setContent("discounts"); } }>Promotions</button>
        </li>
    </ul>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default AdminMenu;
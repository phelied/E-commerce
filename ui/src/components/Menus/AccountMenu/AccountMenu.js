/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./AccountMenu.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function AccountMenu({ ContentObject }) {
    return <Content ContentObject={ ContentObject }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ ContentObject }) {
    const content = <ul id="accountMenu">
        <li>
            <button onClick={ () => { return ContentObject.setContent("informations"); } }>Mes Informations</button>
        </li>
        <li>
            <button onClick={ () => { return ContentObject.setContent("orders"); } }>Mes Commandes</button>
        </li>
        <li>
            <button onClick={ () => { return ContentObject.setContent("comments"); } }>Mes Avis</button>
        </li>
        <li>
            <button onClick={ () => { return ContentObject.setContent("parameters"); } }>Mes Paramètres</button>
        </li>
    </ul>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default AccountMenu;
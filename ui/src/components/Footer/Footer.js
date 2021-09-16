/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faPaperPlane, faShippingFast } from "@fortawesome/free-solid-svg-icons";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./Footer.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function Footer() {
    return <Content></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content() {
    const content = <footer>
        <div className="firstRow">
            <div>
                <h4>NOUS REJOINDRE</h4>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Vendez sur MatrixTechTips.fr</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Recrutement</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>École MatrixTechTips</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Marketplace</a>
            </div>
            <div>
                <h4>INFORMATIONS</h4>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Le Groupe MatrixTechTips</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>CGV / Avis clients</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Données personnelles et Cookies</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Gérer mes cookies</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Mentions légales</a>
            </div>
            <div>
                <h4>AIDES</h4>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Questions fréquentes</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Modes de livraison</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Modes de règlement</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Garantie et Pack Confort</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Demander un retour</a>
            </div>
            <div>
                <h4>NOUS CONTACTER</h4>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>04 36 98 30 00</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>support@matrixtechtips.fr</a>
                <a href="/" onClick={ (event) => { return event.preventDefault(); } }>Boulevard des Vignes - 75000 Paris</a>
            </div>
        </div>
        <div className="secondRow">
            <div>
                <div className="icon">
                    <FontAwesomeIcon icon={ faBox }></FontAwesomeIcon>
                </div>
                <div className="footerText">
                    <h4>DÉBIT À L'EXPÉDITION</h4>
                    <p>Aucun prélèvement avant la prépartion de votre colis.</p>
                </div>
            </div>
            <div>
                <div className="icon">
                    <FontAwesomeIcon icon={ faPaperPlane }></FontAwesomeIcon>
                </div>
                <div className="footerText">
                    <h4>LIVRAISON DOM-TOM</h4>
                    <p>Nous livrons dans les DOM-TOM !</p>
                </div>
            </div>
            <div>
                <div className="icon">
                    <FontAwesomeIcon icon={ faShippingFast }></FontAwesomeIcon>
                </div>
                <div className="footerText">
                    <h4>LIVRAISON EXPRESS</h4>
                    <p>Livré en 48h max !</p>
                </div>
            </div>
        </div>
        <div className="thirdRow">
            <div>
                <h2>Matrix<span>TechTips</span></h2>
                <p>France</p>
            </div>
        </div>
        <p>Matrix<span>TechTips</span>&nbsp;© 2021</p>
    </footer>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default Footer;
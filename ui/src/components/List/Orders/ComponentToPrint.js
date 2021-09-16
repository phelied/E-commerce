import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import "./ComponentToPrint.css";

export default function ComponentToPrint({ API, print }) {
    let products = print.items.map(JSON.parse);
    console.log(products);
    return (
        <div className="userOrders">
            <div className="printThis" onClick={ () => window.print() }>
                <h3><FontAwesomeIcon icon={ faPrint }></FontAwesomeIcon> Cliquer pour imprimer la facture.</h3>
            </div>
            <div className="row info userOrder">
                <div className="col col-6">
                    <h3>Identifiant</h3>
                </div>
                <div className="col col-6">
                    <h3>Livraison</h3>
                </div>
                <div className="col col-6">
                    <h3>Prix total</h3>
                </div>
                <div className="col col-3">
                    <h3>Etat</h3>
                </div>
            </div>
            <div className="rowPrint" key={ print.id }>
                <div className="col col-5">
                    <h3>{print.id}</h3>
                </div>
                <div className="col col-5">
                    <h3>{ Math.round(print.fee * 100)/100} EUR</h3>
                </div>
                <div className="col col-5">
                    <h3>{print.total} EUR</h3>
                </div>
                <div className="col col-5">
                    {(print.payment) ? (<h3>{print.state}</h3>) : (<h3>Pas encore payée.</h3>)}
                </div>
            </div>
            <div className="OrderProducts">
                <h3>Détail :</h3>
                {(products !== null && products !== undefined) ? products.map((product, key) => {
                    let subTotal = product.price;
                    if (product.quantity > 1)
                        subTotal = Math.floor(product.quantity * parseFloat(product.price) * 100) / 100;
                    return (
                        <div className="" key={key}>
                            <div className="col col-5">
                                <h3>{product.id}</h3>
                            </div>
                            <div className="col col-5">
                                {((product.pictures[0] !== null) ? (<img src={API.data.domain + product.pictures.split(', ')[0]} alt="Illustration du produit."></img>) : null)};
                                <h3>{(product.title.substring(0, 15) + '(...)')}</h3>
                            </div>
                            <div className="col col-5">
                                <h3>{product.price}</h3>
                            </div>
                            <div className="col col-2 quantity">
                                <h3>{product.quantity}</h3>
                            </div>
                            <div className="col col-3 subTotal">
                                <h3>{(subTotal.toString().match(".")) ? subTotal.toString().replace(".", "€") : subTotal + " €"}</h3>
                            </div>
                        </div>
                    );
                }) : null}
            </div>
        </div>
    )
}

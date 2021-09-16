/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState, useEffect } from 'react'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {  } from "@fortawesome/free-solid-svg-icons";
import ComponentToPrint from './ComponentToPrint';
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import './OrdersList.css';
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
export default function OrdersList({ API, user }) {
    const [ search, setSearch ] = useState(false);
    const [ print, setPrint ] = useState(null);
    let content = (
        <div className="userOrders">
            <div className="row">
                <input type="text" placeholder="Rechercher par numéro de commande..." onChange={ (e) => setSearch(e.target.value) } />
            </div>
            <div className="row info userOrder">
                <div className="col col-6">
                    <h3>Identifiant</h3>
                </div>
                <div className="col col-3">
                    <h3>Produits</h3>
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
            { (user !== null && user.orders !== null) ? user.orders.sort((a, b) => a.id < b.id ? 1 : -1).map((order, key) => {
                if(!search || parseInt(search) === parseInt(order.id)){
                    return (
                        <div className="row userOrder" key={ key } onClick={ () => setPrint(order) }>
                            <div className="col col-5">
                                <h3>{ order.id }</h3>
                            </div>
                            <div className="col col-5">
                                {((order.items !== null && order.items[0] !== null ) ? (<img src={API.data.domain + JSON.parse(order.items[0]).pictures.split(', ')[0] } alt="Illustration du produit."></img>) : null)};
                                <h3>{((order.items !== null && order.items[0] !== null ) ? (JSON.parse(order.items[0]).title.substring(0, 15) + '(...)') : null )}</h3>
                            </div>
                            <div className="col col-5">
                                <h3>{ Math.round(order.fee * 100)/100 } EUR</h3>
                            </div>
                            <div className="col col-5">
                                <h3>{ order.total } EUR</h3>
                            </div>
                            <div className="col col-5">
                            { (order.payment) ? (<h3>{ order.state }</h3>) : (<button>Payer la commande</button>)}
                            </div>
                        </div>
                        );
                }
            }) : null}
        </div>
    );
    return (print === null) ? content : <ComponentToPrint API={ API } print={ print } />; 
};
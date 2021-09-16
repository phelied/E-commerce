import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { fetchConfirmPayment } from "../../config/utilities";
import "./Paypal.css";
export default function Paypal({ API, SessionObject, checkOut }) {
    const [ paid, setPaid ] = useState(false);
    const [ error, setError ] = useState(null);
    const paypalRef = React.useRef();
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    if(checkOut !== undefined){
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    description: "Paiement de la commande " + checkOut.id,
                                    amount: {
                                        currency_code: "EUR",
                                        value: checkOut.total,
                                    },
                                },
                            ],
                        });
                    }
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaid(true);
                    console.log(order);
                },
                onError: (err) => {
                    //   setError(err),
                    console.error(err);
                },
            })
            .render(paypalRef.current);
    }, []);
    // Default Render
    let content = (
        <div>
            <h3>Reste à Payer : <span className="price">{checkOut.total} EUR</span></h3>
            <div ref={paypalRef} />
        </div>
    );
    // If the payment has been made
    if (checkOut === undefined || checkOut === null) {
        return <Redirect to="/"></Redirect>
    };
    if(paid) {
        fetchConfirmPayment(API, SessionObject, checkOut.id);
        content = (
            <div>
                <h3>Paiement réussi, merci !</h3>
                <Link to="/compte">Mon compte</Link>
            </div>
        );
    }
    // If any error occurs
    if(error) {
        content = (
            <div>
                <h3>
                Une erreur s'est produite. Merci de réessayer ultérieurement.
                </h3>
            </div>
        );
    }
    
    return(
        <div className="payment">
            {content}
        </div>
    );
}
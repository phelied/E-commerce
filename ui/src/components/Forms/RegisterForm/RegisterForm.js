/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faIdCard, faAt, faPhone, faBirthdayCake, faKey, faGlobeEurope, faCity, faMapMarkerAlt, faMailBulk } from "@fortawesome/free-solid-svg-icons";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchCreateUser } from "../../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./RegisterForm.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function RegisterForm({ API, NotificationObject }) {
    const [ lastname, setLastname ] = useState(null);
    const objectLastname = { lastname: lastname, setLastname: setLastname };
    const [ firstname, setFirstname ] = useState(null);
    const objectFirstname = { firstname: firstname, setFirstname: setFirstname };
    const [ email, setEmail ] = useState(null);
    const objectEmail = { email: email, setEmail: setEmail };
    const [ password, setPassword ] = useState(null);
    const objectPassword = { password: password, setPassword: setPassword };
    const [ passwordConfirmation, setPasswordConfirmation ] = useState(null);
    const objectPasswordConfirmation = { passwordConfirmation: passwordConfirmation, setPasswordConfirmation: setPasswordConfirmation };
    const [ phone, setPhone ] = useState(null);
    const objectPhone = { phone: phone, setPhone: setPhone };
    const [ birthdate, setBirthdate ] = useState(null);
    const objectBirthdate = { birthdate: birthdate, setBirthdate: setBirthdate };
    const [ picture, setPicture ] = useState(null);
    const objectPicture = { picture: picture, setPicture: setPicture };
    const [ country, setCountry ] = useState(null);
    const objectCountry = { country: country, setCountry: setCountry };
    const [ city, setCity ] = useState(null);
    const objectCity = { city: city, setCity: setCity };
    const [ address, setAddress ] = useState(null);
    const objectAddress = { address: address, setAddress: setAddress };
    const [ postalCode, setPostalCode ] = useState(null);
    const objectPostalCode = { postalCode: postalCode, setPostalCode: setPostalCode };
    const objectFields = {
        LastnameObject: objectLastname,
        FirstnameObject: objectFirstname,
        EmailObject: objectEmail,
        PasswordObject: objectPassword,
        PasswordConfirmationObject: objectPasswordConfirmation,
        PhoneObject: objectPhone,
        BirthdateObject: objectBirthdate,
        PictureObject: objectPicture,
        CountryObject: objectCountry,
        CityObject: objectCity,
        AddressObject: objectAddress,
        PostalCodeObject: objectPostalCode
    };
    return <Content API={ API } FieldsObject={ objectFields } NotificationObject={ NotificationObject }></Content>;
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, FieldsObject, NotificationObject }) {
    const content = <form>
        <h2>Matrix<span>TechTips</span></h2>
        <div>
            <div>
                <div>
                    <div className="icon">
                        <FontAwesomeIcon icon={ faIdCard }></FontAwesomeIcon>
                    </div>
                    <label htmlFor="lastname">Nom</label>
                    <input type="text" id="lastname" onChange={ (event) => { return FieldsObject.LastnameObject.setLastname(event.target.value); } } placeholder="Votre nom"></input>
                </div>
                <div>
                    <div className="icon">
                        <FontAwesomeIcon icon={ faIdCard }></FontAwesomeIcon>
                    </div>
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" id="firstname" onChange={ (event) => { return FieldsObject.FirstnameObject.setFirstname(event.target.value); } } placeholder="Votre prénom"></input>
                </div>
                <div>
                    <div className="icon">
                        <FontAwesomeIcon icon={ faAt }></FontAwesomeIcon>
                    </div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" onChange={ (event) => { return FieldsObject.EmailObject.setEmail(event.target.value); } } placeholder="Votre adresse email"></input>
                </div>
                <div>
                    <div className="icon">
                        <FontAwesomeIcon icon={ faKey }></FontAwesomeIcon>
                    </div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" onChange={ (event) => { return FieldsObject.PasswordObject.setPassword(event.target.value); } } placeholder="Votre mot de passe"></input>
                </div>
                <div>
                    <div className="icon">
                        <FontAwesomeIcon icon={ faKey }></FontAwesomeIcon>
                    </div>
                    <label htmlFor="passwordConf">Confirmation</label>
                    <input type="password" id="passwordConf" onChange={ (event) => { return FieldsObject.PasswordConfirmationObject.setPasswordConfirmation(event.target.value); } } placeholder="Confirmation du mot de passe"></input>
                </div>
                <div>
                    <div className="icon">
                        <FontAwesomeIcon icon={ faPhone }></FontAwesomeIcon>
                    </div>
                    <label htmlFor="phone">Téléphone</label>
                    <input type="text" id="phone" onChange={ (event) => { return FieldsObject.PhoneObject.setPhone(event.target.value); } } placeholder="Votre numéro de téléphone"></input>
                </div>
                <div>
                    <div className="icon">
                        <FontAwesomeIcon icon={ faBirthdayCake }></FontAwesomeIcon>
                    </div>
                    <label htmlFor="birthdate">Date de naissance</label>
                    <input type="date" id="birthdate" onChange={ (event) => { return FieldsObject.BirthdateObject.setBirthdate(event.target.value); } }></input>
                </div>
                <div className="loadPicture">
                    <div className="icon">
                        <FontAwesomeIcon icon={ faImage }></FontAwesomeIcon>
                    </div>
                    <label htmlFor="picture">Avatar</label>
                    <input type="file" id="picture" onChange={ (event) => { return FieldsObject.PictureObject.setPicture(event.target.files[0]); } }></input>
                </div>
                <div>
                    <div className="icon">
                        <FontAwesomeIcon icon={ faGlobeEurope }></FontAwesomeIcon>
                    </div>
                    <label htmlFor="country">Pays</label>
                    <input type="text" id="country" onChange={ (event) => { return FieldsObject.CountryObject.setCountry(event.target.value); } } placeholder="Votre pays de résidence"></input>
                </div>
                <div>
                    <div className="icon">
                        <FontAwesomeIcon icon={ faCity }></FontAwesomeIcon>
                    </div>
                    <label htmlFor="city">Ville</label>
                    <input type="text" id="city" onChange={ (event) => { return FieldsObject.CityObject.setCity(event.target.value); } } placeholder="Votre ville de résidence"></input>
                </div>
                <div>
                    <div className="icon">
                        <FontAwesomeIcon icon={ faMapMarkerAlt }></FontAwesomeIcon>
                    </div>
                    <label htmlFor="address">Adresse</label>
                    <input type="text" id="address" onChange={ (event) => { return FieldsObject.AddressObject.setAddress(event.target.value); } } placeholder="Votre adresse de facturation"></input>
                </div>
                <div>
                    <div className="icon">
                        <FontAwesomeIcon icon={ faMailBulk }></FontAwesomeIcon>
                    </div>
                    <label htmlFor="postal_code">Code postal</label>
                    <input type="text" id="postal_code" onChange={ (event) => { return FieldsObject.PostalCodeObject.setPostalCode(event.target.value); } } placeholder="Votre code postal"></input>
                </div>
                <div>
                    <input type="submit" value="Valider le formulaire" onClick={ (event) => { return fetchCreateUser(event, API, FieldsObject, NotificationObject); } }></input>
                </div>
            </div>
        </div>
    </form>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default RegisterForm;
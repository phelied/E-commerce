/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faIdCard, faAt, faPhone, faBirthdayCake, faKey, faGlobeEurope, faCity, faMapMarkerAlt, faMailBulk } from "@fortawesome/free-solid-svg-icons";
/* ----------------------------------------------------------------------------------------- */
/* DATA */
/* ----------------------------------------------------------------------------------------- */
import { fetchUpdateUser } from "../../../../config/utilities";
/* ----------------------------------------------------------------------------------------- */
/* STYLESHEETS */
/* ----------------------------------------------------------------------------------------- */
import "./UserUpdateForm.css";
/* ----------------------------------------------------------------------------------------- */
/* FUNCTION */
/* ----------------------------------------------------------------------------------------- */
function UserUpdateForm({ API, SessionObject, NotificationObject }) {
    const [ lastname, setLastname ] = useState(SessionObject.session.lastname);
    const objectLastname = { lastname: lastname, setLastname: setLastname };
    const [ firstname, setFirstname ] = useState(SessionObject.session.firstname);
    const objectFirstname = { firstname: firstname, setFirstname: setFirstname };
    const [ email, setEmail ] = useState(SessionObject.session.email);
    const objectEmail = { email: email, setEmail: setEmail };
    const [ phone, setPhone ] = useState(SessionObject.session.phone);
    const objectPhone = { phone: phone, setPhone: setPhone };
    const [ birthdate, setBirthdate ] = useState(SessionObject.session.birthdate);
    const objectBirthdate = { birthdate: birthdate, setBirthdate: setBirthdate };
    const [ picture, setPicture ] = useState(SessionObject.session.picture);
    const objectPicture = { picture: picture, setPicture: setPicture };
    const [ country, setCountry ] = useState(SessionObject.session.country);
    const objectCountry = { country: country, setCountry: setCountry };
    const [ city, setCity ] = useState(SessionObject.session.city);
    const objectCity = { city: city, setCity: setCity };
    const [ address, setAddress ] = useState(SessionObject.session.address);
    const objectAddress = { address: address, setAddress: setAddress };
    const [ postalCode, setPostalCode ] = useState(SessionObject.session.postalCode);
    const objectPostalCode = { postalCode: postalCode, setPostalCode: setPostalCode };
    const [ password, setPassword ] = useState(null);
    const objectPassword = { password: password, setPassword: setPassword };
    const objectFields = {
        LastnameObject: objectLastname,
        FirstnameObject: objectFirstname,
        EmailObject: objectEmail,
        PhoneObject: objectPhone,
        BirthdateObject: objectBirthdate,
        PictureObject: objectPicture,
        CountryObject: objectCountry,
        CityObject: objectCity,
        AddressObject: objectAddress,
        PostalCodeObject: objectPostalCode,
        PasswordObject: objectPassword
    };
    const formatDate = (dateString) => {
        let year = dateString.getFullYear();
        let month = dateString.getMonth() + 1;
        let date = dateString.getDate();
        month = (month < 10) ? "0" + month : month;
        date = (date < 10) ? "0" + date : date;
        return [ year, month, date ].join("-");
    };
    return <Content API={ API } SessionObject={ SessionObject } FieldsObject={ objectFields } DateFormatObject={ { format: formatDate } } NotificationObject={ NotificationObject }></Content>
};
/* ----------------------------------------------------------------------------------------- */
/* CONTENT */
/* ----------------------------------------------------------------------------------------- */
function Content({ API, SessionObject, FieldsObject, DateFormatObject, NotificationObject }) {
    const content = <div id="userUpdate">
        <form>
            <div>
                <div>
                    <div>
                        <div className="icon">
                            <FontAwesomeIcon icon={ faIdCard }></FontAwesomeIcon>
                        </div>
                        <label htmlFor="lastname">Nom</label>
                        <input type="text" value={ (FieldsObject.LastnameObject.lastname) ? FieldsObject.LastnameObject.lastname : "" } id="lastname" onChange={ (event) => { return FieldsObject.LastnameObject.setLastname(event.target.value); } } placeholder="Votre nom"></input>
                    </div>
                    <div>
                        <div className="icon">
                            <FontAwesomeIcon icon={ faIdCard }></FontAwesomeIcon>
                        </div>
                        <label htmlFor="firstname">Prénom</label>
                        <input type="text" value={ (FieldsObject.FirstnameObject.firstname) ? FieldsObject.FirstnameObject.firstname : "" } id="firstname" onChange={ (event) => { return FieldsObject.FirstnameObject.setFirstname(event.target.value); } } placeholder="Votre prénom"></input>
                    </div>
                    <div>
                        <div className="icon">
                            <FontAwesomeIcon icon={ faAt }></FontAwesomeIcon>
                        </div>
                        <label htmlFor="email">Email</label>
                        <input type="text" value={ (FieldsObject.EmailObject.email) ? FieldsObject.EmailObject.email : "" } id="email" onChange={ (event) => { return FieldsObject.EmailObject.setEmail(event.target.value); } } placeholder="Votre adresse email"></input>
                    </div>
                    <div>
                        <div className="icon">
                            <FontAwesomeIcon icon={ faPhone }></FontAwesomeIcon>
                        </div>
                        <label htmlFor="phone">Téléphone</label>
                        <input type="text" value={ (FieldsObject.PhoneObject.phone) ? FieldsObject.PhoneObject.phone : "" } id="phone" onChange={ (event) => { return FieldsObject.PhoneObject.setPhone(event.target.value); } } placeholder="Votre numéro de téléphone"></input>
                    </div>
                    <div>
                        <div className="icon">
                            <FontAwesomeIcon icon={ faBirthdayCake }></FontAwesomeIcon>
                        </div>
                        <label htmlFor="birthdate">Date de naissance</label>
                        <input type="date" value={ (FieldsObject.BirthdateObject.birthdate) ? DateFormatObject.format(new Date(FieldsObject.BirthdateObject.birthdate)) : "" } id="birthdate" onChange={ (event) => { return FieldsObject.BirthdateObject.setBirthdate(event.target.value); } }></input>
                    </div>
                </div>
                <div>
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
                        <input type="text" value={ (FieldsObject.CountryObject.country) ? FieldsObject.CountryObject.country : "" } id="country" onChange={ (event) => { return FieldsObject.CountryObject.setCountry(event.target.value); } } placeholder="Votre pays de résidence"></input>
                    </div>
                    <div>
                        <div className="icon">
                            <FontAwesomeIcon icon={ faCity }></FontAwesomeIcon>
                        </div>
                        <label htmlFor="city">Ville</label>
                        <input type="text" value={ (FieldsObject.CityObject.city) ? FieldsObject.CityObject.city : "" } id="city" onChange={ (event) => { return FieldsObject.CityObject.setCity(event.target.value); } } placeholder="Votre ville de résidence"></input>
                    </div>
                    <div>
                        <div className="icon">
                            <FontAwesomeIcon icon={ faMapMarkerAlt }></FontAwesomeIcon>
                        </div>
                        <label htmlFor="address">Adresse</label>
                        <input type="text" value={ (FieldsObject.AddressObject.address) ? FieldsObject.AddressObject.address : "" } id="address" onChange={ (event) => { return FieldsObject.AddressObject.setAddress(event.target.value); } } placeholder="Votre adresse de facturation"></input>
                    </div>
                    <div>
                        <div className="icon">
                            <FontAwesomeIcon icon={ faMailBulk }></FontAwesomeIcon>
                        </div>
                        <label htmlFor="postal_code">Code postal</label>
                        <input type="text" value={ (FieldsObject.PostalCodeObject.postalCode) ? FieldsObject.PostalCodeObject.postalCode : "" } id="postal_code" onChange={ (event) => { return FieldsObject.PostalCodeObject.setPostalCode(event.target.value); } } placeholder="Votre code postal"></input>
                    </div>
                </div>
            </div>
            <div className="password">
                <div className="icon">
                    <FontAwesomeIcon icon={ faKey }></FontAwesomeIcon>
                </div>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" onChange={ (event) => { return FieldsObject.PasswordObject.setPassword(event.target.value); } } placeholder="Votre mot de passe"></input>
            </div>
            <div className="submitButton">
                <input type="submit" value="Modifier mes données" onClick={ (event) => { return fetchUpdateUser(event, API, SessionObject, FieldsObject, NotificationObject); } }></input>
            </div>
        </form>
    </div>;
    return content;
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default UserUpdateForm;
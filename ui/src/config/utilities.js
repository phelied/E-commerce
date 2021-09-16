/* ----------------------------------------------------------------------------------------- */
/* DEFAULTS */
/* ----------------------------------------------------------------------------------------- */
const _ = require("lodash");
/* ----------------------------------------------------------------------------------------- */
/* FETCH FUNCTIONS */
/* ----------------------------------------------------------------------------------------- */
function fetchCreateUser(event, API, FieldsObject, NotificationObject) {
    event.preventDefault();
    if(FieldsObject.PasswordObject.password !== FieldsObject.PasswordConfirmationObject.passwordConfirmation) {
        const response = {
            status: 400,
            message: "Vos mots de passe ne correspondent pas."
        };
        return NotificationObject.setNotification(response);
    } else {
        const formData = new FormData();
        formData.append("lastname", FieldsObject.LastnameObject.lastname);
        formData.append("firstname", FieldsObject.FirstnameObject.firstname);
        formData.append("email", FieldsObject.EmailObject.email);
        formData.append("password", FieldsObject.PasswordObject.password);
        formData.append("phone", FieldsObject.PhoneObject.phone);
        formData.append("birthdate", FieldsObject.BirthdateObject.birthdate);
        formData.append("picture", FieldsObject.PictureObject.picture);
        formData.append("country", FieldsObject.CountryObject.country);
        formData.append("city", FieldsObject.CityObject.city);
        formData.append("postal_code", FieldsObject.PostalCodeObject.postalCode);
        formData.append("address", FieldsObject.AddressObject.address);
        const options = { method: "POST", body: formData };
        const callback1 = (response) => { return response.json(); };
        const callback2 = (response) => { return NotificationObject.setNotification(response); };
        const errorHandler = (error) => { return error; };
        return API.instance.execFetch(API.data.domain + API.data.routes.register, options, callback1, callback2, errorHandler);
    };
};
function fetchUser(API, SessionObject, setUser){
    const options = { method: "GET" };
    const callback1 = (response) => { return response.json(); };
    const callback2 = (response) => { 
        if(response.status === 200){
            return setUser(response.user);
        }
    };
    const errorHandler = (error) => { return error; };
    return API.instance.execFetch(API.data.domain + API.data.routes.account.read + "/" +  SessionObject.session.id, options, callback1, callback2, errorHandler);
};
function fetchUpdateUser(event, API, SessionObject, FieldsObject, NotificationObject) {
    event.preventDefault();
    if(FieldsObject.PasswordObject.password === "" || FieldsObject.PasswordObject.password === null) {
        const response = {
            status: 403,
            message: "Vous devez indiquer votre mot de passe pour modifier vos données !"
        };
        return NotificationObject.setNotification(response);
    } else {
        if(SessionObject.session.id !== null && SessionObject.session.token !== null) {
            if(FieldsObject.LastnameObject.lastname === "" || FieldsObject.LastnameObject.lastname === null) {
                const response = {
                    status: 403,
                    message: "Le champ nom ne doit pas être vide !"
                };
                return NotificationObject.setNotification(response);
            } else if(FieldsObject.FirstnameObject.firstname === "" || FieldsObject.FirstnameObject.firstname === null) {
                const response = {
                    status: 403,
                    message: "Le champ prénom ne doit pas être vide !"
                };
                return NotificationObject.setNotification(response);
            } else if(FieldsObject.EmailObject.email === "" || FieldsObject.EmailObject.email === null) {
                const response = {
                    status: 403,
                    message: "Le champ email ne doit pas être vide !"
                };
                return NotificationObject.setNotification(response);
            } else if(FieldsObject.PhoneObject.phone === "" || FieldsObject.PhoneObject.phone === null) {
                const response = {
                    status: 403,
                    message: "Le champ téléphone ne doit pas être vide !"
                };
                return NotificationObject.setNotification(response);
            } else if(FieldsObject.CountryObject.country === "" || FieldsObject.CountryObject.country === null) {
                const response = {
                    status: 403,
                    message: "Le champ pays ne doit pas être vide !"
                };
                return NotificationObject.setNotification(response);
            } else if(FieldsObject.CityObject.city === "" || FieldsObject.CityObject.city === null) {
                const response = {
                    status: 403,
                    message: "Le champ ville ne doit pas être vide !"
                };
                return NotificationObject.setNotification(response);
            } else if(FieldsObject.AddressObject.address === "" || FieldsObject.AddressObject.address === null) {
                const response = {
                    status: 403,
                    message: "Le champ adresse ne doit pas être vide !"
                };
                return NotificationObject.setNotification(response);
            } else if(FieldsObject.PostalCodeObject.postalCode === "" || FieldsObject.PostalCodeObject.postalCode === null) {
                const response = {
                    status: 403,
                    message: "Le champ code postal ne doit pas être vide !"
                };
                return NotificationObject.setNotification(response);
            } else {
                const formData = new FormData();
                formData.append("id", SessionObject.session.id);
                formData.append("lastname", FieldsObject.LastnameObject.lastname);
                formData.append("firstname", FieldsObject.FirstnameObject.firstname);
                formData.append("email", FieldsObject.EmailObject.email);
                formData.append("phone", FieldsObject.PhoneObject.phone);
                formData.append("birthdate", FieldsObject.BirthdateObject.birthdate);
                formData.append("picture", FieldsObject.PictureObject.picture);
                formData.append("country", FieldsObject.CountryObject.country);
                formData.append("city", FieldsObject.CityObject.city);
                formData.append("address", FieldsObject.AddressObject.address);
                formData.append("postal_code", FieldsObject.PostalCodeObject.postalCode);
                formData.append("password", FieldsObject.PasswordObject.password);
                formData.append("user_id", SessionObject.session.id);
                formData.append("token", SessionObject.session.token);
                const options = { method: "POST", body: formData };
                const callback1 = (response) => { return response.json(); };
                const callback2 = (response) => {
                    if(response.status === 200) {
                        SessionObject.setSession(response.user);
                    };
                    return NotificationObject.setNotification(response);
                };
                const errorHandler = (error) => { return error; };
                return API.instance.execFetch(API.data.domain + API.data.routes.account.update, options, callback1, callback2, errorHandler);
            };
        } else {
            const response = {
                status: 403,
                message: "Vous devez être connecté pour modifier votre compte !"
            };
            return NotificationObject.setNotification(response);
        };
    };
};
function fetchLogin(event, API, SessionObject, FieldsObject, NotificationObject) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("credential", FieldsObject.credential);
    formData.append("password", FieldsObject.password);
    if(FieldsObject.credential !== null && FieldsObject.password !== null) {
        const options = { method: "POST", body: formData };
        const callback1 = (response) => { return response.json(); };
        const callback2 = (response) => {
            if(response.status === 200) {
                localStorage.setItem("session", JSON.stringify(response.user));
                SessionObject.setSession(JSON.parse(localStorage.getItem("session")));
                const loginFormElement = document.querySelector("#loginForm");
                if(loginFormElement.classList.contains("openedLogin")) {
                    loginFormElement.classList.remove("openedLogin");
                };
            };
            return NotificationObject.setNotification(response);
        };
        const errorHandler = (error) => { return error; };
        return API.instance.execFetch(API.data.domain + API.data.routes.login, options, callback1, callback2, errorHandler);
    };
};
function fetchLogout(event, API, SessionObject, NotificationObject) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", SessionObject.session.id);
    formData.append("token", SessionObject.session.token);
    if(SessionObject.session !== null) {
        const options = { method: "POST", body: formData };
        const callback1 = (response) => { return response.json(); };
        const callback2 = (response) => {
            if(response.status === 200) {
                localStorage.removeItem("session");
                SessionObject.setSession(null);
            };
            return NotificationObject.setNotification(response);
        };
        const errorHandler = (error) => { return error; };
        return API.instance.execFetch(API.data.domain + API.data.routes.logout, options, callback1, callback2, errorHandler);
    };
};
function fetchSearchedProducts(event, API, ListObject, ProductsObject) {
    const formData = new FormData();
    formData.append("search", event.target.value);
    if(event.target.value.length > 0 && event.target.value.trim() !== "") {
        ListObject.toggleList(true);
    } else {
        ListObject.toggleList(false);
    };
    if(event.target.value.trim().length > 0) {
        const options = { method: "POST", body: formData };
        const callback1 = (response) => { return response.json(); };
        const callback2 = (response) => { return ProductsObject.setProducts(response); };
        const errorHandler = (error) => { return error; };
        return API.instance.execFetch(API.data.domain + API.data.routes.products.search, options, callback1, callback2, errorHandler);
    };
};
function fetchLatestProducts(API, LatestProductsObject) {
    const options = { method: "GET" };
    const callback1 = (response) => { return response.json(); };
    const callback2 = (response) => { return LatestProductsObject.setLatestProducts(response); };
    const errorHandler = (error) => { return error; };
    return API.instance.execFetch(API.data.domain + API.data.routes.products.latest, options, callback1, callback2, errorHandler);
};
function fetchProducts(event, API, ProductsObject, Page, Url, FieldsObject, NotificationObject) {
    if(event !== null) {
        event.preventDefault();
    };
    var options = { method: "GET" };
    const callback1 = (response) => { return response.json(); };
    const callback2 = (response) => { return ProductsObject.setProducts(response); };
    const errorHandler = (error) => { return error; };
    if(Page !== null) {
        return API.instance.execFetch(API.data.domain + API.data.routes.products.all + "/" +  Page, options, callback1, callback2, errorHandler);
    } else {
        const formData = new FormData();
        if(FieldsObject !== null) {
            if(FieldsObject.SortObject.sort !== null) {
                if(FieldsObject.MinPriceObject.price !== null && FieldsObject.MaxPriceObject.price !== null && !FieldsObject.AvailableObject.available) {
                    if(parseFloat(FieldsObject.MinPriceObject.price) > parseFloat(FieldsObject.MaxPriceObject.price)) {
                        const response = {
                            status: 400,
                            message: "Veuillez indiquer une valeur min ainsi qu'une valeur max correcte."
                        };
                        return NotificationObject.setNotification(response);
                    } else {
                        formData.append("sort", FieldsObject.SortObject.sort);
                        formData.append("minPrice", parseFloat(FieldsObject.MinPriceObject.price));
                        formData.append("maxPrice", parseFloat(FieldsObject.MaxPriceObject.price));
                        options = { method: "POST", body: formData };
                    };
                } else if(FieldsObject.MinPriceObject.price === null && FieldsObject.MaxPriceObject.price === null && FieldsObject.AvailableObject.available) {
                    formData.append("sort", FieldsObject.SortObject.sort);
                    formData.append("available", (FieldsObject.AvailableObject.available) ? 1 : 0);
                    options = { method: "POST", body: formData };
                } else if(FieldsObject.MinPriceObject.price !== null && FieldsObject.MaxPriceObject.price !== null && FieldsObject.AvailableObject.available) {
                    if(parseFloat(FieldsObject.MinPriceObject.price) > parseFloat(FieldsObject.MaxPriceObject.price)) {
                        const response = {
                            status: 400,
                            message: "Veuillez indiquer une valeur min ainsi qu'une valeur max correcte."
                        };
                        return NotificationObject.setNotification(response);
                    } else {
                        formData.append("sort", FieldsObject.SortObject.sort);
                        formData.append("available", (FieldsObject.AvailableObject.available) ? 1 : 0);
                        formData.append("minPrice", parseFloat(FieldsObject.MinPriceObject.price));
                        formData.append("maxPrice", parseFloat(FieldsObject.MaxPriceObject.price));
                        options = { method: "POST", body: formData };
                    };
                } else {
                    formData.append("sort", FieldsObject.SortObject.sort);
                    options = { method: "POST", body: formData };
                };
            } else {
                if(FieldsObject.MinPriceObject.price !== null && FieldsObject.MaxPriceObject.price !== null && !FieldsObject.AvailableObject.available) {
                    if(parseFloat(FieldsObject.MinPriceObject.price) > parseFloat(FieldsObject.MaxPriceObject.price)) {
                        const response = {
                            status: 400,
                            message: "Veuillez indiquer une valeur min ainsi qu'une valeur max correcte."
                        };
                        return NotificationObject.setNotification(response);
                    } else {
                        formData.append("minPrice", parseFloat(FieldsObject.MinPriceObject.price));
                        formData.append("maxPrice", parseFloat(FieldsObject.MaxPriceObject.price));
                        options = { method: "POST", body: formData };
                    };
                } else if(FieldsObject.MinPriceObject.price === null && FieldsObject.MaxPriceObject.price === null && FieldsObject.AvailableObject.available) {
                    formData.append("available", (FieldsObject.AvailableObject.available) ? 1 : 0);
                    options = { method: "POST", body: formData };
                } else if(FieldsObject.MinPriceObject.price !== null && FieldsObject.MaxPriceObject.price !== null && FieldsObject.AvailableObject.available) {
                    if(parseFloat(FieldsObject.MinPriceObject.price) > parseFloat(FieldsObject.MaxPriceObject.price)) {
                        const response = {
                            status: 400,
                            message: "Veuillez indiquer une valeur min ainsi qu'une valeur max correcte."
                        };
                        return NotificationObject.setNotification(response);
                    } else {
                        formData.append("available", (FieldsObject.AvailableObject.available) ? 1 : 0);
                        formData.append("minPrice", parseFloat(FieldsObject.MinPriceObject.price));
                        formData.append("maxPrice", parseFloat(FieldsObject.MaxPriceObject.price));
                        options = { method: "POST", body: formData };
                    };
                };
            };
        };
        return API.instance.execFetch(API.data.domain + Url, options, callback1, callback2, errorHandler);
    };
};
function fetchMinAndMax(event, API, MinPriceObject, MaxPriceObject) {
    if(event !== null) {
        event.preventDefault();
    };
    const options = { method: "GET" };
    const callback1 = (response) => { return response.json(); };
    const callback2 = (response) => {
        MinPriceObject.setMinPrice(response.range.minPrice);
        MaxPriceObject.setMaxPrice(response.range.maxPrice);
    };
    const errorHandler = (error) => { return error; };
    return API.instance.execFetch(API.data.domain + API.data.routes.products.range, options, callback1, callback2, errorHandler);
};
function fetchProduct(API, ProductObject, Id) {
    const options = { method: "GET" };
    const callback1 = (response) => { return response.json(); };
    const callback2 = (response) => { return ProductObject.setProduct(response); };
    const errorHandler = (error) => { return error; };
    return API.instance.execFetch(API.data.domain + API.data.routes.product.read + "/" +  Id, options, callback1, callback2, errorHandler);
};
function fetchCategories(event, API, SessionObject, CategoriesObject, Page, Url) {
    if(event !== null) {
        event.preventDefault();
    };
    const options = { method: "GET" };
    const callback1 = (response) => { return response.json(); };
    const callback2 = (response) => { return CategoriesObject.setCategories(response); };
    const errorHandler = (error) => { return error; };
    if(Page !== null) {
        return API.instance.execFetch(API.data.domain + API.data.routes.categories + "/" +  Page, options, callback1, callback2, errorHandler);
    } else {
        return API.instance.execFetch(API.data.domain + Url, options, callback1, callback2, errorHandler);
    };
};
function fetchComments(event, API, SessionObject, CommentsObject, Page, Url) {
    if(event !== null) {
        event.preventDefault();
    };
    if(SessionObject !== null) {

    } else {
        const options = { method: "GET" };
        const callback1 = (response) => { return response.json(); };
        const callback2 = (response) => { return CommentsObject.setComments(response); };
        const errorHandler = (error) => { return error; };
        if(Page !== null) {
            return API.instance.execFetch(API.data.domain + API.data.routes.comments + "/" +  Page, options, callback1, callback2, errorHandler);
        } else {
            return API.instance.execFetch(API.data.domain + Url, options, callback1, callback2, errorHandler);
        };
    };
};
function fetchDiscounts(event, API, SessionObject, DiscountsObject, Page, Url) {
    if(event !== null) {
        event.preventDefault();
    };
    if(SessionObject !== null) {

    } else {
        const options = { method: "GET" };
        const callback1 = (response) => { return response.json(); };
        const callback2 = (response) => { return DiscountsObject.setDiscounts(response); };
        const errorHandler = (error) => { return error; };
        if(Page !== null) {
            return API.instance.execFetch(API.data.domain + API.data.routes.discounts + "/" +  Page, options, callback1, callback2, errorHandler);
        } else {
            return API.instance.execFetch(API.data.domain + Url, options, callback1, callback2, errorHandler);
        };
    };
};
function fetchOrders(event, API, SessionObject, OrdersObject, Page, Url) {
    if(event !== null) {
        event.preventDefault();
    };
    if(SessionObject !== null) {

    } else {
        const options = { method: "GET" };
        const callback1 = (response) => { return response.json(); };
        const callback2 = (response) => { return OrdersObject.setOrders(response); };
        const errorHandler = (error) => { return error; };
        if(Page !== null) {
            return API.instance.execFetch(API.data.domain + API.data.routes.orders + "/" +  Page, options, callback1, callback2, errorHandler);
        } else {
            return API.instance.execFetch(API.data.domain + Url, options, callback1, callback2, errorHandler);
        };
    };
};
function fetchDeliveries(event, API, SessionObject, DeliveriesObject, Page, Url) {
    if(event !== null) {
        event.preventDefault();
    };
    if(SessionObject !== null) {

    } else {
        const options = { method: "GET" };
        const callback1 = (response) => { return response.json(); };
        const callback2 = (response) => { return DeliveriesObject.setDeliveries(response); };
        const errorHandler = (error) => { return error; };
        if(Page !== null) {
            return API.instance.execFetch(API.data.domain + API.data.routes.deliveries + "/" +  Page, options, callback1, callback2, errorHandler);
        } else {
            return API.instance.execFetch(API.data.domain + Url, options, callback1, callback2, errorHandler);
        };
    };
};
function fetchUsers(event, API, SessionObject, UsersObject, Page, Url) {
    if(event !== null) {
        event.preventDefault();
    };
    if(SessionObject !== null) {
        console.log("test")
    } else {
        const options = { method: "GET" };
        const callback1 = (response) => { return response.json(); };
        const callback2 = (response) => { return UsersObject.setUsers(response); };
        const errorHandler = (error) => { return error; };
        if(Page !== null) {
            return API.instance.execFetch(API.data.domain + API.data.routes.users + "/" +  Page, options, callback1, callback2, errorHandler);
        } else {
            return API.instance.execFetch(API.data.domain + Url, options, callback1, callback2, errorHandler);
        };
    };
};
function fetchCreateComment(event, API, SessionObject, ProductObject, CommentObject, FieldsObject, NotificationObject) {
    event.preventDefault();
    if(SessionObject.session === null) {
        const response = {
            status: 401,
            message: "Vous devez être connecté(e) pour laisser un avis sur ce produit."
        };
        return NotificationObject.setNotification(response);
    } else {
        const formData = new FormData();
        formData.append("title", FieldsObject.TitleObject.title);
        formData.append("content", FieldsObject.ContentObject.content);
        formData.append("stars", (FieldsObject.StarsObject.stars === "" || !FieldsObject.StarsObject.stars) ? 0 : FieldsObject.StarsObject.stars);
        formData.append("user", SessionObject.session.id);
        formData.append("product", ProductObject.response.product.id);
        formData.append("user_id", SessionObject.session.id);
        formData.append("token", SessionObject.session.token);
        if(FieldsObject.TitleObject.title !== null && FieldsObject.ContentObject.content !== null) {
            const options = { method: "POST", body: formData };
            const callback1 = (response) => { return response.json(); };
            const callback2 = (response) => {
                if(response.status === 200) {
                    CommentObject.setComment(response);
                };
                return NotificationObject.setNotification(response);
            };
            const errorHandler = (error) => { return error; };
            return API.instance.execFetch(API.data.domain + API.data.routes.comment.create, options, callback1, callback2, errorHandler);
        };
    };
};
function fetchDeleteComment(API, SessionObject, ActionObject, NotificationObject) {
    if(SessionObject.session === null) {
        const response = {
            status: 401,
            message: "Vous devez être connecté(e) et avoir rédigé(e) cet avis pour le supprimer."
        };
        return NotificationObject.setNotification(response);
    } else {
        const formData = new FormData();
        formData.append("id", ActionObject.DeleteObject.state.element.id);
        formData.append("user_id", SessionObject.session.id);
        formData.append("token", SessionObject.session.token);
        if(ActionObject.DeleteObject.state.element.id !== null && SessionObject.session.id !== null && SessionObject.session.token !== null) {
            const options = { method: "POST", body: formData };
            const callback1 = (response) => { return response.json(); };
            const callback2 = (response) => {
                return NotificationObject.setNotification(response);
            };
            const errorHandler = (error) => { return error; };
            return API.instance.execFetch(API.data.domain + API.data.routes.comment.delete, options, callback1, callback2, errorHandler);
        };
    };
};
function fetchUpdateComment(event, API, SessionObject, ActionObject, FieldsObject, NotificationObject) {
    event.preventDefault();
    if(SessionObject.session === null) {
        const response = {
            status: 401,
            message: "Vous devez être connecté(e) et avoir rédigé(e) cet avis pour le modifier."
        };
        return NotificationObject.setNotification(response);
    } else {
        const formData = new FormData();
        formData.append("id", ActionObject.UpdateObject.state.element.id);
        formData.append("title", FieldsObject.TitleObject.title);
        formData.append("content", FieldsObject.ContentObject.content);
        formData.append("stars",  (FieldsObject.StarsObject.stars === "" || !FieldsObject.StarsObject.stars) ? 0 : FieldsObject.StarsObject.stars);
        formData.append("user_id", SessionObject.session.id);
        formData.append("token", SessionObject.session.token);
        if(ActionObject.UpdateObject.state.element.id !== null && SessionObject.session.id !== null && SessionObject.session.token !== null) {
            if(FieldsObject.TitleObject.title !== null && FieldsObject.ContentObject.content !== null && FieldsObject.StarsObject.stars !== null) {
                const options = { method: "POST", body: formData };
                const callback1 = (response) => { return response.json(); };
                const callback2 = (response) => {
                    return NotificationObject.setNotification(response);
                };
                const errorHandler = (error) => { return error; };
                return API.instance.execFetch(API.data.domain + API.data.routes.comment.update, options, callback1, callback2, errorHandler);
            };
        };
    };
};
function fetchCreateOrder(API, SessionObject, NotificationObject, Order, setCheckOut){
    if(SessionObject.session === null) {
        const response = {
            status: 401,
            message: "Vous devez être connecté(e) pour passer une commande."
        };
        return NotificationObject.setNotification(response);
    } else {
        const formData = new FormData();
        formData.append("order", JSON.stringify(Order));
        formData.append("user_id", SessionObject.session.id);
        formData.append("token", SessionObject.session.token);
        if(Order !== null) {
            const options = { method: "POST", body: formData };
            const callback1 = (response) => { return response.json(); };
            const callback2 = (response) => {
                console.log(response)
                if(response.status === 200) {
                    localStorage.removeItem('cart');
                    setCheckOut(response.order);
                };
                // // return NotificationObject.setNotification(response);
            };
            const errorHandler = (error) => { return error; };
            return API.instance.execFetch(API.data.domain + API.data.routes.order.create, options, callback1, callback2, errorHandler);
        };
    };
};
function fetchConfirmPayment(API, SessionObject, ID){
    if(SessionObject.session === null) {
        const response = {
            status: 401,
            message: "Vous devez être connecté(e) pour passer une commande."
        };
        console.log(response);
    } else {
        const formData = new FormData();
        formData.append("order_id", ID);
        formData.append("user_id", SessionObject.session.id);
        formData.append("token", SessionObject.session.token);
        if(ID !== null) {
            const options = { method: "POST", body: formData };
            const callback1 = (response) => { return response.json(); };
            const callback2 = (response) => {
                console.log(response)
            };
            const errorHandler = (error) => { return error; };
            return API.instance.execFetch(API.data.domain + API.data.routes.order.confirm, options, callback1, callback2, errorHandler);
        };
    };
};
/* ----------------------------------------------------------------------------------------- */
/* UTILITIES FUNCTIONS */
/* ----------------------------------------------------------------------------------------- */
var offset = 0;
function slideLeft(event) {
    event.preventDefault();
    const products = document.querySelectorAll(".product");
    if(offset > 0) {
        offset--;
        products.forEach((container) => {
            container.style.cssText = `transform: translateX(-${ offset }00%)`;
        });
    };
};
function slideRight(event) {
    event.preventDefault();
    const products = document.querySelectorAll(".product");
    if(offset < products.length - 3) {
        offset++;
        products.forEach((container) => {
            container.style.cssText = `transform: translateX(-${ offset }00%)`;
        });
    };
};
function resetLastOffset() {
    return offset = 0;
};
function addToCart(event, Product, CartObject) {
    event.preventDefault();
    var itemsInCart = 0;
    if(localStorage.getItem("cart")) {
        let cart = [];
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        if(cart.length > 0) {
            let bool = false;
            cart.forEach((item) => {
                if(_.isEqual(item.product, Product)) {
                    if(item.product.quantity > item.quantity) {
                        item.quantity++;
                        bool = true;
                        itemsInCart += item.quantity;
                    };
                } else {
                    itemsInCart += item.quantity;
                };
            });
            if(!bool){
                cart.push({ product: Product, quantity: 1 });
                itemsInCart += 1;
                CartObject.setCart(itemsInCart);
            };
            CartObject.setCart(itemsInCart);
            return localStorage.setItem("cart", JSON.stringify(cart));
        };
    } else {
        let cart = [];
        cart.push({ product: Product, quantity: 1 });
        itemsInCart += 1;
        CartObject.setCart(itemsInCart);
        return localStorage.setItem("cart", JSON.stringify(cart));
    };
};
function removeFromCart(event, Product, CartObject){
    event.preventDefault();
    CartObject.cart.forEach((item, index, object) => {
        if(Product.id === item.product.id)
            item.quantity -= 1;
        if(item.quantity <= 0)
            object.splice(index, 1);
    });
    (CartObject.cart.length <= 0) ? localStorage.removeItem("cart") : localStorage.setItem("cart", JSON.stringify(CartObject.cart));
    return CartObject.setCart('reload');
};
function getPostedCommentStars(stars) {
    let icons = {
        first: null,
        second: null,
        third: null,
        fourth: null,
        fifth: null
    };
    for(let i = 0; i <= stars; i += 0.5) {
        switch(i) {
            case 0.5:
                icons.first = "half";
                break;
            case 1:
                icons.first = "full";
                break;
            case 1.5:
                icons.second = "half";
                break;
            case 2:
                icons.second = "full";
                break;
            case 2.5:
                icons.third = "half";
                break;
            case 3:
                icons.third = "full";
                break;
            case 3.5:
                icons.fourth = "half";
                break;
            case 4:
                icons.fourth = "full";
                break;
            case 4.5:
                icons.fifth = "half";
                break;
            case 5:
                icons.fifth = "full";
                break;
            default:
                break;
        };
    };
    return icons;
};
function setBigPicture(event) {
    const bigPicture = document.querySelector(".bigPicture > img");
    bigPicture.setAttribute("src", event.target.getAttribute("src"));
};
function fullGallery(event) {
    event.preventDefault();
    const gallery = document.querySelector("#galleryLayer");
    gallery.classList.add("openedGallery");
    const galleryImg = document.querySelector("#galleryLayer > .galleryContainer > img");
    galleryImg.setAttribute("src", event.target.getAttribute("src"));
};
function closeFullGallery(event) {
    event.preventDefault();
    const gallery = document.querySelector("#galleryLayer");
    gallery.classList.remove("openedGallery");
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export {
    fetchCreateUser,
    fetchUser,
    fetchUpdateUser,
    fetchLogin,
    fetchLogout,
    fetchProducts,
    fetchSearchedProducts,
    fetchLatestProducts,
    fetchMinAndMax,
    fetchProduct,
    fetchCategories,
    fetchComments,
    fetchCreateComment,
    fetchDeleteComment,
    fetchUpdateComment,
    fetchDeliveries,
    fetchCreateOrder,
    fetchConfirmPayment,
    slideLeft,
    slideRight,
    resetLastOffset,
    addToCart,
    removeFromCart,
    getPostedCommentStars,
    setBigPicture,
    fullGallery,
    closeFullGallery,
    fetchDiscounts,
    fetchOrders,
    fetchUsers
};
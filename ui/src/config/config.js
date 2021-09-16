/* ----------------------------------------------------------------------------------------- */
/* API */
/* ----------------------------------------------------------------------------------------- */
class API {
    #auth = {
        login: "/login",
        logout: "/logout",
        deactivate: "/user/verify"
    };
    #crud = {
        create: {
            user: "/user/create",
            category: "/category/create",
            product: "/product/create",
            delivery: "/delivery/create",
            comment: "/comment/create",
            order: "/order/create",
            discount: "/discount/create"
        },
        read: {
            user: { unique: "/user/read", all: "/users/read" },
            category: { unique: "/category/read", all: "/categories/read" },
            product: { unique: "/product/read", all: "/products/read", latest: "/products/latest", search: "/products/search", range: "/products/range" },
            comment: { unique: "/comment/read", all: "/comments/read" },
            delivery: { unique: "/delivery/read", all: "/deliveries/read" },
            order: { unique: "/order/read", all: "/orders/read" },
            discount: { unique: "/discount/read", all: "/discounts/read" },
        },
        update: {
            user: "/user/update",
            category: "/category/update",
            product: "/product/update",
            comment: "/comment/update",
            delivery: "/delivery/update",
            order: "/order/update",
            discount: "/discount/update"
        },
        confirm: {
            order: "/order/confirm",
        },
        delete: {
            user: "/user/delete",
            category: "/category/delete",
            product: "/product/delete",
            comment: "/comment/delete",
            delivery: "/delivery/delete",
            order: "/order/delete",
            discount: "/discount/delete"
        }
    };
    #data = {
        domain: "https://localhost:8000",
        routes: {
            login: this.#auth.login,
            logout: this.#auth.logout,
            deactivate: this.#auth.deactivate,
            register: this.#crud.create.user,
            account: {
                update: this.#crud.update.user,
                read: this.#crud.read.user.unique
            },
            user: {
                delete: this.#crud.delete.user
            },
            users: this.#crud.read.user.all,
            category: {
                create: this.#crud.create.category,
                update: this.#crud.update.category,
                read: this.#crud.read.category.unique,
                delete: this.#crud.delete.category 
            },
            categories: this.#crud.read.category.all,
            product: {
                create: this.#crud.create.product,
                update: this.#crud.update.product,
                read: this.#crud.read.product.unique,
                delete: this.#crud.delete.product 
            },
            products: {
                all: this.#crud.read.product.all,
                latest: this.#crud.read.product.latest,
                search: this.#crud.read.product.search,
                range: this.#crud.read.product.range
            },
            comment: {
                create: this.#crud.create.comment,
                update: this.#crud.update.comment,
                read: this.#crud.read.comment.unique,
                delete: this.#crud.delete.comment 
            },
            comments: this.#crud.read.comment.all,
            delivery: {
                create: this.#crud.create.delivery,
                update: this.#crud.update.delivery,
                read: this.#crud.read.delivery.unique,
                delete: this.#crud.delete.delivery 
            },
            deliveries: this.#crud.read.delivery.all,
            order:{
                create: this.#crud.create.order,
                update: this.#crud.update.order,
                confirm: this.#crud.confirm.order,
                read: this.#crud.read.order.unique,
                delete: this.#crud.delete.order,
            },
            orders: this.#crud.read.order.all,
            discount: {
                create: this.#crud.create.discount,
                update: this.#crud.update.discount,
                read: this.#crud.read.discount.unique,
                delete: this.#crud.delete.discount 
            },
            discounts: this.#crud.read.discount.all,
        }
    };
    getData() {
        return this.#data;
    };
    execFetch(url = "", options = {}, callback1 = () => {}, callback2 = () => {}, errorHandler = () => {}) {
        return fetch(url, options).then(callback1).then(callback2).catch(errorHandler);
    };
};
/* ----------------------------------------------------------------------------------------- */
/* EXPORTS */
/* ----------------------------------------------------------------------------------------- */
export default API;
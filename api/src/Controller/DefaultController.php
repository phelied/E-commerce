<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Controller;
    /* ----------------------------------------------------------------------------------------- */
    /* DEFAULTS */
    /* ----------------------------------------------------------------------------------------- */
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Response;
    /* ----------------------------------------------------------------------------------------- */
    /* CONTROLLER */
    /* ----------------------------------------------------------------------------------------- */
    class DefaultController extends AbstractController {
        public function index(): Response {
            return $this->render("index.html.twig", [
                "data" => [
                    "home" => [
                        "home" => [
                            "entity" => null,
                            "method" => "GET",
                            "route" => "/",
                            "success" => null,
                            "failure" => null
                        ]
                    ],
                    "auth" => [
                        "login" => [
                            "entity" => "User",
                            "method" => "POST",
                            "route" => "/login",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "logout" => [
                            "entity" => "User",
                            "method" => "POST",
                            "route" => "/logout",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "verify" => [
                            "entity" => "User",
                            "method" => "POST",
                            "route" => "/user/verify",
                            "success" => "200 + message",
                            "failure" => "400 + message / 401 + message"
                        ],
                        "deactivate" => [
                            "entity" => "User",
                            "method" => "POST",
                            "route" => "/user/deactivate",
                            "success" => "200 + message",
                            "failure" => "400 + message / 401 + message"
                        ]
                    ],
                    "user" => [
                        "create" => [
                            "entity" => "User",
                            "method" => "POST",
                            "route" => "/user/create",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "read" => [
                            "entity" => "User",
                            "method" => "GET",
                            "route" => "/user/read/{id}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "update" => [
                            "entity" => "User",
                            "method" => "POST",
                            "route" => "/user/update",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "delete" => [
                            "entity" => "User",
                            "method" => "POST",
                            "route" => "/user/delete",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "readAllPaginate" => [
                            "entity" => "User",
                            "method" => "GET",
                            "route" => "/users/read/{page}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "readAll" => [
                            "entity" => "User",
                            "method" => "GET",
                            "route" => "/users/read",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ]
                    ],
                    "category" => [
                        "create" => [
                            "entity" => "Category",
                            "method" => "POST",
                            "route" => "/category/create",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "read" => [
                            "entity" => "Category",
                            "method" => "GET",
                            "route" => "/category/read/{id}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "update" => [
                            "entity" => "Category",
                            "method" => "POST",
                            "route" => "/category/update",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "delete" => [
                            "entity" => "Category",
                            "method" => "POST",
                            "route" => "/category/delete",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "readAllPaginate" => [
                            "entity" => "Category",
                            "method" => "GET",
                            "route" => "/categories/read/{page}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "readAll" => [
                            "entity" => "Category",
                            "method" => "GET",
                            "route" => "/categories/read",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ]
                    ],
                    "product" => [
                        "create" => [
                            "entity" => "Product",
                            "method" => "POST",
                            "route" => "/product/create",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "read" => [
                            "entity" => "Product",
                            "method" => "GET",
                            "route" => "/product/read/{id}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "update" => [
                            "entity" => "Product",
                            "method" => "POST",
                            "route" => "/product/update",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "delete" => [
                            "entity" => "Product",
                            "method" => "POST",
                            "route" => "/product/delete",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "readAllPaginate" => [
                            "entity" => "Product",
                            "method" => "GET",
                            "route" => "/products/read/{page}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "readAll" => [
                            "entity" => "Product",
                            "method" => "GET",
                            "route" => "/products/read",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "readLatest" => [
                            "entity" => "Product",
                            "method" => "GET",
                            "route" => "/products/latest",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "search" => [
                            "entity" => "Product",
                            "method" => "POST",
                            "route" => "/products/search",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ]
                    ],
                    "comment" => [
                        "create" => [
                            "entity" => "Comment",
                            "method" => "POST",
                            "route" => "/comment/create",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "read" => [
                            "entity" => "Comment",
                            "method" => "GET",
                            "route" => "/comment/read/{id}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "update" => [
                            "entity" => "Comment",
                            "method" => "POST",
                            "route" => "/comment/update",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "delete" => [
                            "entity" => "Comment",
                            "method" => "POST",
                            "route" => "/comment/delete",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "readAllPaginate" => [
                            "entity" => "Comment",
                            "method" => "GET",
                            "route" => "/comments/read/{page}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "readAll" => [
                            "entity" => "Comment",
                            "method" => "GET",
                            "route" => "/comments/read",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ]
                    ],
                    "delivery" => [
                        "create" => [
                            "entity" => "Delivery",
                            "method" => "POST",
                            "route" => "/delivery/create",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "read" => [
                            "entity" => "Delivery",
                            "method" => "GET",
                            "route" => "/delivery/read/{id}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "update" => [
                            "entity" => "Delivery",
                            "method" => "POST",
                            "route" => "/delivery/update",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "delete" => [
                            "entity" => "Delivery",
                            "method" => "POST",
                            "route" => "/delivery/delete",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "readAllPaginate" => [
                            "entity" => "Delivery",
                            "method" => "GET",
                            "route" => "/deliveries/read/{page}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "readAll" => [
                            "entity" => "Delivery",
                            "method" => "GET",
                            "route" => "/deliveries/read",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ]
                    ],
                    "order" => [
                        "create" => [
                            "entity" => "Order",
                            "method" => "POST",
                            "route" => "/order/create",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "read" => [
                            "entity" => "Order",
                            "method" => "GET",
                            "route" => "/order/read/{id}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "update" => [
                            "entity" => "Order",
                            "method" => "POST",
                            "route" => "/order/update",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "delete" => [
                            "entity" => "Order",
                            "method" => "POST",
                            "route" => "/order/delete",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "readAllPaginate" => [
                            "entity" => "Order",
                            "method" => "GET",
                            "route" => "/orders/read/{page}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "readAll" => [
                            "entity" => "Order",
                            "method" => "GET",
                            "route" => "/orders/read",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ]
                    ],
                    "discount" => [
                        "create" => [
                            "entity" => "Discount",
                            "method" => "POST",
                            "route" => "/discount/create",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "read" => [
                            "entity" => "Discount",
                            "method" => "GET",
                            "route" => "/discount/read/{id}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "update" => [
                            "entity" => "Discount",
                            "method" => "POST",
                            "route" => "/discount/update",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "delete" => [
                            "entity" => "Discount",
                            "method" => "POST",
                            "route" => "/discount/delete",
                            "success" => "200 + message",
                            "failure" => "400 + message"
                        ],
                        "readAllPaginate" => [
                            "entity" => "Discount",
                            "method" => "GET",
                            "route" => "/discounts/read/{page}",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ],
                        "readAll" => [
                            "entity" => "Discount",
                            "method" => "GET",
                            "route" => "/discounts/read",
                            "success" => "200 + message + data",
                            "failure" => "400 + message"
                        ]
                    ],
                    "unmatched" => [
                        "unmatched" => [
                            "entity" => "",
                            "method" => "POST & GET",
                            "route" => "unmatched",
                            "success" => "",
                            "failure" => "404 + message"
                        ]
                    ]
                ]
            ]);
        }
        public function unmatched(): Response {
            return new Response(json_encode([
                "status" => 404,
                "message" => "La page demandée n'existe pas !"
            ]));
        }
    };
?>
<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Controller;
    /* ----------------------------------------------------------------------------------------- */
    /* DEFAULTS */
    /* ----------------------------------------------------------------------------------------- */
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Doctrine\ORM\EntityManagerInterface;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITITES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Entity\Product;
    use App\Entity\Category;
    use App\Entity\User;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Service\ObjectSerializer;
    use App\Service\Filter;
    use App\Service\Paginate;
    use App\Service\FileUploader;
    use App\Service\FieldsChecker;
    use App\Service\EntityManager;
    use App\Service\Security;
    /* ----------------------------------------------------------------------------------------- */
    /* CONTROLLER */
    /* ----------------------------------------------------------------------------------------- */
    class ProductController extends AbstractController {
        public function create(Request $request, EntityManagerInterface $entityManager, FileUploader $uploader): Response {
            /* SECURITY ---------------------------------------------- */
            $sec = new Security($request, $this->getDoctrine()->getRepository(User::class));
            $sec_msg = $sec->check('admin');
            if($sec_msg){
                return new Response(json_encode([
                    "status" => 403,
                    "message" => $sec_msg
                ]));
            }
            /* ------------------------------------------------------ */
            $requiredFields = [ "title", "description", "price", "quantity", "available" ];
            $fieldsChecker = new FieldsChecker();
            if(!$fieldsChecker->check($requiredFields, $request)) {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Certains champs obligatoires n'ont pas été soumis ou aucun formulaire n'a été soumis !"
                ]));
            };
            $categoryRepository = $this->getDoctrine()->getRepository(Category::class);
            $product = new Product();
            $entityManagerService = new EntityManager();
            $entityManagerService->persistEntity($request, $product, null, $uploader, $entityManager, [ "category" => $categoryRepository ]);
            return new Response(json_encode([
                "status" => 200,
                "message" => "Le produit " . strtoupper($request->get("title")) . " a bien été ajouté !"
            ]));
        }
        public function read(Request $request, $id): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Product::class);
            $product = $repository->findOneById($id);
            if($product) {
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Le produit a bien été retrouvé !",
                    "product" => json_decode($serializer->serialize($product, null))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Ce produit n'existe pas !"
                ]));
            };
        }
        public function update(Request $request, EntityManagerInterface $entityManager, FileUploader $uploader): Response {
            /* SECURITY ---------------------------------------------- */
            $sec = new Security($request, $this->getDoctrine()->getRepository(User::class));
            $sec_msg = $sec->check('admin');
            if($sec_msg){
                return new Response(json_encode([
                    "status" => 403,
                    "message" => $sec_msg
                ]));
            }
            /* ------------------------------------------------------ */
            $categoryRepository = $this->getDoctrine()->getRepository(Category::class);
            $repository = $this->getDoctrine()->getRepository(Product::class);
            $product = $repository->findOneById($request->get("id"));
            if($product) {
                $entityManagerService = new EntityManager();
                $entityManagerService->persistEntity($request, $product, null, $uploader, $entityManager, [ "category" => $categoryRepository ]);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Le produit " . strtoupper($request->get("title")) . " a bien été mis à jour !"
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Ce produit n'existe pas !"
                ]));
            };
        }
        public function delete(Request $request, EntityManagerInterface $entityManager, FileUploader $uploader): Response {
            /* SECURITY ---------------------------------------------- */
            $sec = new Security($request, $this->getDoctrine()->getRepository(User::class));
            $sec_msg = $sec->check('admin');
            if($sec_msg){
                return new Response(json_encode([
                    "status" => 403,
                    "message" => $sec_msg
                ]));
            }
            /* ------------------------------------------------------ */
            $repository = $this->getDoctrine()->getRepository(Product::class);
            $product = $repository->findOneById($request->get("id"));
            if($product) {
                $uploader->delete($product->getPictures());
                $productTitle = $product->getTitle();
                $entityManagerService = new EntityManager();
                $entityManagerService->removeEntity($product, $entityManager);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Le produit " . $productTitle . " a bien été supprimé !"
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Ce produit n'existe pas !"
                ]));
            };
        }
        public function readAll(Request $request, $page): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Product::class);
            if($page === 0) {
                $products = $repository->findAll();
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Les produits ont bien été récupérés.",
                    "products" => json_decode($serializer->serialize(null, $products))
                ]));
            } elseif($page > 0) {
                $pagination = new Paginate();
                $pagination = $pagination->setPaginationData($repository->getProductsCount($request), 25, $page, ceil($repository->getProductsCount($request) / 25), ($page * 25) - 25, $repository->getProducts(($page * 25) - 25, 25, $request), "/products/read/");
                return new Response(json_encode([
                    "page" => $pagination["page"],
                    "status" => 200,
                    "message" => "Les produits ont bien été récupérés.",
                    "count" => $pagination["count"],
                    "pages" => $pagination["pages"],
                    "previous" => $pagination["previous"],
                    "next" => $pagination["next"],
                    "products" => json_decode($pagination["elements"])
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 404,
                    "message" => "La page demandée n'existe pas !"
                ]));
            };
        }
        public function latest(Request $request): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Product::class);
            $products = $repository->getLatestProducts();
            if($products) {
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Les produits ont bien été récupérés.",
                    "products" => json_decode($serializer->serialize(null, $products))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Aucun produit n'a été récupéré."
                ]));
            };
        }
        public function search(Request $request): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Product::class);
            $products = $repository->getSearchedProducts($request->get("search"));
            if($products) {
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Les produits ont bien été récupérés.",
                    "products" => json_decode($serializer->serialize(null, $products))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Aucun produit n'a été récupéré."
                ]));
            };
        }
        public function range(Request $request): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Product::class);
            $range = $repository->getMinAndMaxProductsPrices();
            if($range) {
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Les valeurs min et max ont bien été récupérées.",
                    "range" => json_decode($serializer->serialize($range, null))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Impossible de déterminer les valeurs min et max des prix des produits."
                ]));
            };
        }
    };
?>
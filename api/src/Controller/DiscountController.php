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
    use App\Entity\Discount;
    use App\Entity\Product;
    use App\Entity\Category;
    use App\Entity\User;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Service\ObjectSerializer;
    use App\Service\Paginate;
    use App\Service\FieldsChecker;
    use App\Service\EntityManager;
    use App\Service\Security;
    /* ----------------------------------------------------------------------------------------- */
    /* CONTROLLER */
    /* ----------------------------------------------------------------------------------------- */
    class DiscountController extends AbstractController {
        public function create(Request $request, EntityManagerInterface $entityManager): Response {
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
            $requiredFields = [ "code", "percent", "start_date", "end_date" ];
            $fieldsChecker = new FieldsChecker();
            if(!$fieldsChecker->check($requiredFields, $request)) {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Certains champs obligatoires n'ont pas été soumis ou aucun formulaire n'a été soumis !"
                ]));
            };
            $discount = new Discount();
            $repository = $this->getDoctrine()->getRepository(Discount::class);
            if($request->get("product") !== null) {
                $productRepository = $this->getDoctrine()->getRepository(Product::class);
            };
            if($request->get("category") !== null) {
                $categoryRepository = $this->getDoctrine()->getRepository(Category::class);
            };
            $discountCheck = $repository->findBy([ "code" => $request->get("code") ]);
            if(!$discountCheck) {
                if(isset($productRepository) && !isset($categoryRepository)) {
                    $repositories = [ "product" => $productRepository ];
                } elseif(isset($categoryRepository) && !isset($productRepository)) {
                    $repositories = [ "category" => $categoryRepository ];
                } elseif(isset($productRepository) && isset($categoryRepository)) {
                    $repositories = [ "product" => $productRepository, "category" => $categoryRepository ];
                } else {
                    $repositories = null;
                };
                $entityManagerService = new EntityManager();
                $entityManagerService->persistEntity($request, $discount, null, null, $entityManager, $repositories);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "La promotion " . $request->get("code") . " a bien été ajoutée !"
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "La promotion " . $request->get("code") . " existe déjà !"
                ]));
            };
        }
        public function read(Request $request, $id): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Discount::class);
            $discount = $repository->findOneById($id);
            if($discount) {
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "La promotion a bien été retrouvée !",
                    "discount" => json_decode($serializer->serialize($discount, null))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cette promotion n'existe pas !"
                ]));
            };
        }
        public function update(Request $request, EntityManagerInterface $entityManager): Response {
            /* ----------------------------------------------------------------------------------------- */
            /* Don't update discounts, to avoid orders total price change */
            /* ----------------------------------------------------------------------------------------- */
        }
        public function delete(Request $request, EntityManagerInterface $entityManager): Response {
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
            $repository = $this->getDoctrine()->getRepository(Discount::class);
            $discount = $repository->findOneById($request->get("id"));
            if($discount) {
                $discountCode = $discount->getCode();
                $entityManagerService = new EntityManager();
                $entityManagerService->removeEntity($discount, $entityManager);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "La promotion " . $discountCode . " a bien été supprimée !"
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cette promotion n'existe pas !"
                ]));
            };
        }
        public function readAll(Request $request, $page): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Discount::class);
            if($page === 0) {
                $discounts = $repository->findAll();
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Les promotions ont bien été récupérées.",
                    "discounts" => json_decode($serializer->serialize(null, $discounts))
                ]));
            } elseif($page > 0) {
                $pagination = new Paginate();
                $pagination = $pagination->setPaginationData($repository->getDiscountsCount(), 25, $page, ceil($repository->getDiscountsCount() / 25), ($page * 25) - 25, $repository->getDiscounts(($page * 25) - 25, 25), "/discounts/read/");
                return new Response(json_encode([
                    "page" => $pagination["page"],
                    "status" => 200,
                    "message" => "Les promotions ont bien été récupérées.",
                    "count" => $pagination["count"],
                    "pages" => $pagination["pages"],
                    "previous" => $pagination["previous"],
                    "next" => $pagination["next"],
                    "discounts" => json_decode($pagination["elements"])
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 404,
                    "message" => "La page demandée n'existe pas !"
                ]));
            };
        }
    };
?>
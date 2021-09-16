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
    class CategoryController extends AbstractController {
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
            $requiredFields = [ "name" ];
            $fieldsChecker = new FieldsChecker();
            if(!$fieldsChecker->check($requiredFields, $request)) {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Certains champs obligatoires n'ont pas été soumis ou aucun formulaire n'a été soumis !"
                ]));
            };
            $category = new Category();
            $repository = $this->getDoctrine()->getRepository(Category::class);
            $categoryCheck = $repository->findOneBy([ "name" => $request->get("name") ]);
            if(!$categoryCheck) {
                $entityManagerService = new EntityManager();
                $entityManagerService->persistEntity($request, $category, null, null, $entityManager, null);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "La catégorie " . ucwords(strtolower($request->get("name"))) . " a bien été ajoutée !"
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Une catégorie porte déjà ce nom !"
                ]));
            };
        }
        public function read(Request $request, $id): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Category::class);
            $category = $repository->findOneById($id);
            if($category) {
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "La catégorie a bien été retrouvé !",
                    "category" => json_decode($serializer->serialize($category, null))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cette catégorie n'existe pas !"
                ]));
            };
        }
        public function update(): Response {
            /* ----------------------------------------------------------------------------------------- */
            /* Don't update categories, or you'll end up with keyboards under watercooling category */
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
            $repository = $this->getDoctrine()->getRepository(Category::class);
            $category = $repository->findOneById($request->get("id"));
            if($category) {
                $categoryName = $category->getName();
                $entityManagerService = new EntityManager();
                $entityManagerService->removeEntity($category, $entityManager);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "La catégorie " . $categoryName . " a bien été supprimée !"
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cette catégorie n'existe pas !"
                ]));
            };
        }
        public function readAll(Request $request, $page): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Category::class);
            if($page === 0) {
                $categories = $repository->findBy([], [ "id" => "ASC" ], null, null);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Les catégories ont bien été récupérées.",
                    "categories" => json_decode($serializer->serialize(null, $categories))
                ]));
            } elseif($page > 0) {
                $pagination = new Paginate();
                $pagination = $pagination->setPaginationData($repository->getCategoriesCount(), 25, $page, ceil($repository->getCategoriesCount() / 25), ($page * 25) - 25, $repository->getCategories(($page * 25) - 25, 25), "/categories/read/");
                return new Response(json_encode([
                    "page" => $pagination["page"],
                    "status" => 200,
                    "message" => "Les catégories ont bien été récupérées.",
                    "count" => $pagination["count"],
                    "pages" => $pagination["pages"],
                    "previous" => $pagination["previous"],
                    "next" => $pagination["next"],
                    "categories" => json_decode($pagination["elements"])
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
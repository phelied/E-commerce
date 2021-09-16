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
    use App\Entity\Comment;
    use App\Entity\User;
    use App\Entity\Product;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Service\ObjectSerializer;
    use App\Service\Paginate;
    use App\Service\FieldsChecker;
    use App\Service\EntityManager;
    use App\Service\Security;
    use App\Service\Average;
    /* ----------------------------------------------------------------------------------------- */
    /* CONTROLLER */
    /* ----------------------------------------------------------------------------------------- */
    class CommentController extends AbstractController {
        public function create(Request $request, EntityManagerInterface $entityManager): Response {
            /* SECURITY ---------------------------------------------- */
            if($request->get("user") !== $request->get("user_id")){
                return new Response(json_encode([
                    "status" => 403,
                    "message" => "Identifiant erroné, mise en ligne du commentaire - refusée."
                ]));
            }
            $sec = new Security($request, $this->getDoctrine()->getRepository(User::class));
            $sec_msg = $sec->check('user');
            if($sec_msg){
                return new Response(json_encode([
                    "status" => 403,
                    "message" => $sec_msg
                ]));
            }
            /* ------------------------------------------------------ */
            $requiredFields = [ "title", "content", "user", "product" ];
            $fieldsChecker = new FieldsChecker();
            if(!$fieldsChecker->check($requiredFields, $request)) {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Certains champs obligatoires n'ont pas été soumis ou aucun formulaire n'a été soumis !"
                ]));
            };
            $commentEntity = new Comment();
            $userRepository = $this->getDoctrine()->getRepository(User::class);
            $productRepository = $this->getDoctrine()->getRepository(Product::class);
            $commentRepository = $this->getDoctrine()->getRepository(Comment::class);
            $user = $userRepository->findOneById($request->get("user"));
            $product = $productRepository->findOneById($request->get("product"));
            $comment = $commentRepository->findBy([ "user" => $user->getId(), "product" => $product->getId() ]);
            if($comment) {
                return new Response(json_encode([
                    "status" => 403,
                    "message" => "Vous avez déjà laissé un avis sur ce produit !"
                ]));
            } else {
                if($user && $product) {
                    $entityManagerService = new EntityManager();
                    $entityManagerService->persistEntity($request, $commentEntity, null, null, $entityManager, [ "user" => $userRepository, "product" => $productRepository ]);
                    $averageHandler = new Average();
                    $averageHandler->setAverage($commentRepository->getAverage($product), $product, $entityManager);
                    return new Response(json_encode([
                        "status" => 200,
                        "message" => "Votre avis a bien été ajouté !"
                    ]));
                } else {
                    return new Response(json_encode([
                        "status" => 400,
                        "message" => "Votre avis n'a pas pu être ajouté !"
                    ]));
                };
            };
        }
        public function read(Request $request, $id): Response {
            $serializer = new ObjectSerializer();
            $commentRepository = $this->getDoctrine()->getRepository(Comment::class);
            $comment = $commentRepository->findOneById($id);
            if($comment) {
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "L'avis a bien été retrouvé !",
                    "comment" => json_decode($serializer->serialize($comment, null))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cet avis n'existe pas !"
                ]));
            };
        }
        public function update(Request $request, EntityManagerInterface $entityManager): Response {
            /* SECURITY ---------------------------------------------- */
            // if($request->get("author") !== $request->get("user_id")){
            //     return new Response(json_encode([
            //         "status" => 403,
            //         "message" => "Modification des données de ce commentaire - refusée."
            //     ]));
            // }
            $sec = new Security($request, $this->getDoctrine()->getRepository(User::class));
            $sec_msg = $sec->check('user');
            if($sec_msg){
                return new Response(json_encode([
                    "status" => 403,
                    "message" => $sec_msg
                ]));
            }
            /* ------------------------------------------------------ */
            $serializer = new ObjectSerializer();
            $userRepository = $this->getDoctrine()->getRepository(User::class);
            $productRepository = $this->getDoctrine()->getRepository(Product::class);
            $commentRepository = $this->getDoctrine()->getRepository(Comment::class);
            $user = $userRepository->findOneById($request->get("user_id"));
            $comment = $commentRepository->findOneById($request->get("id"));
            if($user) {
                if($comment) {
                    $product = $comment->getProduct();
                    if($comment->getUser() === $user || in_array("ROLE_ADMIN", $user->getRoles())) {
                        $entityManagerService = new EntityManager();
                        $entityManagerService->persistEntity($request, $comment, null, null, $entityManager, null);
                        $averageHandler = new Average();
                        $averageHandler->setAverage($commentRepository->getAverage($product), $product, $entityManager);
                        return new Response(json_encode([
                            "status" => 200,
                            "message" => "Votre avis a bien été modifié !",
                            "comment" => json_decode($serializer->serialize($comment, null))
                        ]));
                    } else {
                        return new Response(json_encode([
                            "status" => 403,
                            "message" => "Vous n'êtes pas en droit de modifier cet avis !"
                        ]));
                    };
                } else {
                    return new Response(json_encode([
                        "status" => 400,
                        "message" => "Cet avis n'existe pas !"
                    ]));
                };
            } else {
                return new Response(json_encode([
                    "status" => 403,
                    "message" => "Une erreur est survenue lors de la modification de cet avis !"
                ]));
            };
        }
        public function delete(Request $request, EntityManagerInterface $entityManager): Response {
            /* SECURITY ---------------------------------------------- */
            $sec = new Security($request, $this->getDoctrine()->getRepository(User::class));
            $sec_msg = $sec->check('user');
            if($sec_msg){
                return new Response(json_encode([
                    "status" => 403,
                    "message" => $sec_msg
                ]));
            }
            /* ------------------------------------------------------ */
            $productRepository = $this->getDoctrine()->getRepository(Product::class);
            $commentRepository = $this->getDoctrine()->getRepository(Comment::class);
            $comment = $commentRepository->findOneById($request->get("id"));
            if($comment) {
                /* SECURITY - SECOND PART --------------------------------------------*/
                if($comment->getUser()->getId() !== intval($request->get("user_id"))){
                    $sec = new Security($request, $this->getDoctrine()->getRepository(User::class));
                    $sec_msg = $sec->check('admin');
                    if($sec_msg){
                        return new Response(json_encode([
                            "status" => 403,
                            "message" => "Par manque de droit la suppression de ce commentaire est refusée."
                        ]));
                    }
                }
                $product = $productRepository->findOneById($comment->getProduct()->getId());
                $commentTitle = $comment->getTitle();
                $entityManagerService = new EntityManager();
                $entityManagerService->removeEntity($comment, $entityManager);
                $averageHandler = new Average();
                $averageHandler->setAverage($commentRepository->getAverage($product), $product, $entityManager);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Votre avis " . $commentTitle . " a bien été supprimé !"
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cet avis n'existe pas !"
                ]));
            };
        }
        public function readAll(Request $request, $page): Response {
            $serializer = new ObjectSerializer();
            $commentRepository = $this->getDoctrine()->getRepository(Comment::class);
            if($page === 0) {
                $comments = $commentRepository->findAll();
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Les avis ont bien été récupérés.",
                    "comments" => json_decode($serializer->serialize(null, $comments))
                ]));
            } elseif($page > 0) {
                $pagination = new Paginate();
                $pagination = $pagination->setPaginationData($commentRepository->getCommentsCount(), 25, $page, ceil($commentRepository->getCommentsCount() / 25), ($page * 25) - 25, $commentRepository->getComments(($page * 25) - 25, 25), "/comments/read/");
                return new Response(json_encode([
                    "page" => $pagination["page"],
                    "status" => 200,
                    "message" => "Les avis ont bien été récupérés.",
                    "count" => $pagination["count"],
                    "pages" => $pagination["pages"],
                    "previous" => $pagination["previous"],
                    "next" => $pagination["next"],
                    "comments" => json_decode($pagination["elements"])
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
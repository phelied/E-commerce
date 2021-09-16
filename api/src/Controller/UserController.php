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
    use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
    use Doctrine\ORM\EntityManagerInterface;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITITES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Entity\User;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Service\ObjectSerializer;
    use App\Service\Paginate;
    use App\Service\FileUploader;
    use App\Service\FieldsChecker;
    use App\Service\Mailer;
    use App\Service\EntityManager;
    use App\Service\Security;
    /* ----------------------------------------------------------------------------------------- */
    /* CONTROLLER */
    /* ----------------------------------------------------------------------------------------- */
    class UserController extends AbstractController {
        public function create(Request $request, UserPasswordHasherInterface $hasher, EntityManagerInterface $entityManager, FileUploader $uploader, \Swift_Mailer $swiftMailer): Response {
            $requiredFields = [ "lastname", "firstname", "email", "password", "phone", "country", "city", "address", "postal_code" ];
            $fieldsChecker = new FieldsChecker();
            if(!$fieldsChecker->check($requiredFields, $request)) {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Certains champs obligatoires n'ont pas été soumis ou aucun formulaire n'a été soumis !"
                ]));
            };
            $user = new User();
            $repository = $this->getDoctrine()->getRepository(User::class);
            $emailCheck = $repository->findOneBy([ "email" => $request->get("email") ]);
            $phoneCheck = $repository->findOneBy([ "phone" => $request->get("phone") ]);
            if(!$emailCheck && !$phoneCheck) {
                $entityManagerService = new EntityManager();
                $entityManagerService->persistEntity($request, $user, $hasher, $uploader, $entityManager, null);
                $mailer = new Mailer();
                $receiver = $repository->findOneBy([ "email" => $user->getEmail() ]);
                $mailStatus = $mailer->send($this->renderView("email/email.html.twig", [ "id" => $receiver->getId() ]), "proxima-centaury@matrixtechtips.fr", $receiver->getEmail(), $swiftMailer);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Votre compte a bien été créé !",
                    "mail" => ($mailStatus) ? "Un mail de confirmation d'inscription vous a été envoyé." : "Un mail vous sera envoyé pour confirmer votre inscription."
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "L'Adresse email ou le numéro de téléphone est indisponible !"
                ]));
            };
        }
        public function read(Request $request, $id): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(User::class);
            $user = $repository->findOneById($id);
            if($user) {
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "L'utilisateur a bien été retrouvé !",
                    "user" => json_decode($serializer->serialize($user, null))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cet utilisateur n'existe pas !"
                ]));
            };
        }
        public function update(Request $request, UserPasswordHasherInterface $hasher, EntityManagerInterface $entityManager, FileUploader $uploader): Response {
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
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(User::class);
            $user = $repository->findOneById($request->get("id"));
            if($user && $hasher->isPasswordValid($user, $request->get("password"), $user->getSalt())) {
                $entityManagerService = new EntityManager();
                $entityManagerService->persistEntity($request, $user, $hasher, $uploader, $entityManager, null);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Votre compte a bien été modifié !",
                    "user" => json_decode($serializer->serialize($user, null))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Ce compte n'existe pas ou les identifiants sont erronés."
                ]));
            };
        }
        public function delete(Request $request, UserPasswordHasherInterface $hasher, EntityManagerInterface $entityManager, FileUploader $uploader): Response {
            /* SECURITY ---------------------------------------------- */
            $sec = new Security($request, $this->getDoctrine()->getRepository(User::class));
            if($request->get("id") !== $request->get("user_id")){
                if($sec->check('admin')){
                    return new Response(json_encode([
                        "status" => 403,
                        "message" => "Suppression de ce profil - refusée."
                    ]));
                }
            }else{
                $sec_msg = $sec->check('user');
                if($sec_msg){
                    return new Response(json_encode([
                        "status" => 403,
                        "message" => $sec_msg
                    ]));
                }
            }
            /* ------------------------------------------------------ */
            $repository = $this->getDoctrine()->getRepository(User::class);
            $user = $repository->findOneById($request->get("id"));
            if($user && $hasher->isPasswordValid($user, $request->get("password"), $user->getSalt())) {
                if($user->getPicture()){
                    $uploader->delete($user->getPicture());
                }
                $entityManagerService = new EntityManager();
                $entityManagerService->removeEntity($user, $entityManager);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Votre compte a bien été supprimé !"
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Ce compte n'existe pas ou les identifiants sont erronés."
                ]));
            };
        }
        public function readAll(Request $request, $page): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(User::class);
            if($page === 0) {
                $users = $repository->findAll();
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Les utilisateurs ont bien été récupérés.",
                    "users" => json_decode($serializer->serialize(null, $users))
                ]));
            } elseif($page > 0) {
                $pagination = new Paginate();
                $pagination = $pagination->setPaginationData($repository->getUsersCount(), 25, $page, ceil($repository->getUsersCount() / 25), ($page * 25) - 25, $repository->getUsers(($page * 25) - 25, 25), "/users/read/");
                return new Response(json_encode([
                    "page" => $pagination["page"],
                    "status" => 200,
                    "message" => "Les utilisateurs ont bien été récupérés.",
                    "count" => $pagination["count"],
                    "pages" => $pagination["pages"],
                    "previous" => $pagination["previous"],
                    "next" => $pagination["next"],
                    "users" => json_decode($pagination["elements"])
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
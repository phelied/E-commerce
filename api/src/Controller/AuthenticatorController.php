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
    use DateTimeImmutable;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITIES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Entity\User;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Service\ObjectSerializer;
    use App\Service\Security;
    /* ----------------------------------------------------------------------------------------- */
    /* CONTROLLER */
    /* ----------------------------------------------------------------------------------------- */
    class AuthenticatorController extends AbstractController {
        public function login(Request $request, UserPasswordHasherInterface $hasher, EntityManagerInterface $entityManager): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(User::class);
            $type = (preg_match("/^[0-9]{10}$/", $request->get("credential"))) ? "phone" : "email";
            $user = $repository->findOneBy([ $type => $request->get("credential") ]);
            if($user && $hasher->isPasswordValid($user, $request->get("password"), $user->getSalt())) {
                if($user->getEmailVerifiedAt() === null) {
                    return new Response(json_encode([
                        "status" => 401,
                        "message" => "Vous devez d'abord valider votre inscription en cliquant sur le lien envoyé par mail."
                    ]));
                } else {
                    $user->setToken(substr(bin2hex(random_bytes(255)), 255));
                    $entityManager->persist($user);
                    $entityManager->flush();
                    return new Response(json_encode([
                        "status" => 200,
                        "message" => "Vous êtes à présent connecté(e).",
                        "user" => json_decode($serializer->serialize($user, null))
                    ]));
                };
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Vos identifiants sont incorrects."
                ]));
            };
        }
        public function logout(Request $request, EntityManagerInterface $entityManager): Response {
            $repository = $this->getDoctrine()->getRepository(User::class);
            $user = $repository->findOneById($request->get("id"));
            if($user && $user->getToken() === $request->get("token")) {
                $user->setToken(null);
                $entityManager->persist($user);
                $entityManager->flush();
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Vous êtes à présent déconnecté(e)."
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Une erreur empêche votre déconnexion."
                ]));
            };
        }
        public function verify(Request $request, EntityManagerInterface $entityManager, $id): Response {
            $repository = $this->getDoctrine()->getRepository(User::class);
            $user = $repository->findOneById($id);
            if($user) {
                if($user->getEmailVerifiedAt() === null) {
                    $user->setEmailVerifiedAt(new DateTimeImmutable());
                    $entityManager->persist($user);
                    $entityManager->flush();
                    return new Response(json_encode([
                        "status" => 200,
                        "message" => "Votre inscription a bien été confirmée !"
                    ]));
                } else {
                    return new Response(json_encode([
                        "status" => 400,
                        "message" => "Vous avez déjà confirmé votre inscription !"
                    ]));
                };
            } else {
                return new Response(json_encode([
                    "status" => 401,
                    "message" => "Ce compte n'existe pas !"
                ]));
            };
        }
        public function deactivate(Request $request, UserPasswordHasherInterface $hasher, EntityManagerInterface $entityManager): Response {
            $repository = $this->getDoctrine()->getRepository(User::class);
            $user = $repository->findOneBy([ "id" => $request->get("id") ]);
            if($user) {
                if($hasher->isPasswordValid($user, $request->get("password"), $user->getSalt())) {
                    $user->setToken(null);
                    $user->setActive(false);
                    $entityManager->persist($user);
                    $entityManager->flush();
                    return new Response(json_encode([
                        "status" => 200,
                        "message" => "Tentative de désactivation du compte réussie !"
                    ]));
                } else {
                    return new Response(json_encode([
                        "status" => 400,
                        "message" => "Tentative de désactivation du compte échouée !"
                    ]));
                };
            } else {
                return new Response(json_encode([
                    "status" => 401,
                    "message" => "Ce compte n'existe pas !"
                ]));
            };
        }
        /* ----------------------------------------------------------------------------------------- */
        /* SECURITY PART */
        /* ----------------------------------------------------------------------------------------- */
        public function security(Request $request, EntityManagerInterface $entityManager): Response {
            $sec = new Security($request, $this->getDoctrine()->getRepository(User::class));
            $sec_msg = $sec->check('user');
            if($sec_msg){
                return new Response(json_encode([
                    "status" => 403,
                    "message" => $sec_msg
                ]));
            }else{
                return new Response(json_encode([
                    "status" => 200,
                    "message" => 'Aucune anomalie détectée.'
                ]));
            }
        }
    }
?>
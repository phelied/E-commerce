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
    use App\Entity\Delivery;
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
    class DeliveryController extends AbstractController {
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
            $requiredFields = [ "company", "price" ];
            $fieldsChecker = new FieldsChecker();
            if(!$fieldsChecker->check($requiredFields, $request)) {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Certains champs obligatoires n'ont pas été soumis ou aucun formulaire n'a été soumis !"
                ]));
            };
            $delivery = new Delivery();
            $repository = $this->getDoctrine()->getRepository(Delivery::class);
            $deliveryCheck = $repository->findBy([ "company" => $request->get("company") ]);
            if(!$deliveryCheck) {
                $entityManagerService = new EntityManager();
                $entityManagerService->persistEntity($request, $delivery, null, null, $entityManager, null);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "La compagnie " . $request->get("company") . " a bien été ajoutée !"
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "La compagnie " . $request->get("company") . " existe déjà !"
                ]));
            };
        }
        public function read(Request $request, $id): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Delivery::class);
            $delivery = $repository->findOneById($id);
            if($delivery) {
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "La compagnie a bien été retrouvée !",
                    "delivery" => json_decode($serializer->serialize($delivery, null))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cette compagnie n'existe pas !"
                ]));
            };
        }
        public function update(Request $request, EntityManagerInterface $entityManager): Response {
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
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Delivery::class);
            $delivery = $repository->findOneById($request->get("id"));
            if($delivery) {
                $entityManagerService = new EntityManager();
                $entityManagerService->persistEntity($request, $delivery, null, null, $entityManager, null);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "La compagnie a bien été modifiée !",
                    "delivery" => json_decode($serializer->serialize($delivery, null))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cette compagnie n'existe pas !"
                ]));
            };
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
            $repository = $this->getDoctrine()->getRepository(Delivery::class);
            $delivery = $repository->findOneById($request->get("id"));
            if($delivery) {
                $deliveryCompany = $delivery->getCompany();
                $entityManagerService = new EntityManager();
                $entityManagerService->removeEntity($delivery, $entityManager);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "La compagnie " . $deliveryCompany . " a bien été supprimée !"
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cette compagnie n'existe pas !"
                ]));
            };
        }
        public function readAll(Request $request, $page): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Delivery::class);
            if($page === 0) {
                $deliveries = $repository->findAll();
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Les compagnies ont bien été récupérées.",
                    "deliveries" => json_decode($serializer->serialize(null, $deliveries))
                ]));
            } elseif($page > 0) {
                $pagination = new Paginate();
                $pagination = $pagination->setPaginationData($repository->getDeliveriesCount(), 25, $page, ceil($repository->getDeliveriesCount() / 25), ($page * 25) - 25, $repository->getDeliveries(($page * 25) - 25, 25), "/deliveries/read/");
                return new Response(json_encode([
                    "page" => $pagination["page"],
                    "status" => 200,
                    "message" => "Les compagnies ont bien été récupérées.",
                    "count" => $pagination["count"],
                    "pages" => $pagination["pages"],
                    "previous" => $pagination["previous"],
                    "next" => $pagination["next"],
                    "deliveries" => json_decode($pagination["elements"])
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
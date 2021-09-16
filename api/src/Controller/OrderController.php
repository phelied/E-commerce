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
    use App\Entity\Order;
    use App\Entity\User;
    use App\Entity\Product;
    use App\Entity\Delivery;
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
    class OrderController extends AbstractController {
        public function create(Request $request, EntityManagerInterface $entityManager): Response {
            $requiredFields = [ "order", "user_id", "token" ];
            $fieldsChecker = new FieldsChecker();
            if(!$fieldsChecker->check($requiredFields, $request)) {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Certains champs obligatoires n'ont pas été soumis ou aucun formulaire n'a été soumis !"
                ]));
            };
            /* SECURITY ---------------------------------------------- */           
            // if($request->get("user") !== $request->get("user_id")){
            //     return new Response(json_encode([
            //         "status" => 403,
            //         "message" => "Création de la commande - refusée (user et user_id sont différents)."
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
            $order = new Order();
            $serializer = new ObjectSerializer();
            // REPOSITORIES //
            $userRepository = $this->getDoctrine()->getRepository(User::class);
            $productRepository = $this->getDoctrine()->getRepository(Product::class);
            $deliveryRepository = $this->getDoctrine()->getRepository(Delivery::class);
            // GETERS FROM REQUEST //
            $client_order = json_decode($request->get('order'));
            $user = $userRepository->findOneById($request->get('user_id'));
            $items = $client_order->products;
            $order_items = [];
            $delivery_id = $client_order->delivery_id;
            // ADD PRODUCT ONE BY ONE AND ADDITION OF THE TOTAL PRICE
            $total = 0;
            $total_weight = 0;
            foreach ($items as $item) {
                $product = $productRepository->findOneById($item->id);
                $total += floatVal($product->getPrice() * intval($item->quantity));
                $total_weight += floatval($product->getWeight());
                array_push($order_items, json_encode(array(
                    'id' => $product->getId(),
                    'title' => $product->getTitle(),
                    'pictures' => $product->getPictures(),
                    'price' => $product->getPrice(),
                    'quantity' => $item->quantity)));
                // REMOVE THOSE PRODUCTS FROM THE STOCKAGE
                $product->setQuantity(intval($product->getQuantity()) - intval($item->quantity));
                $entityManager->persist($product);
                $entityManager->flush();
            }
            // SETERS //
            $order->setUser($user);
            $delivery = $deliveryRepository->findOneById($delivery_id);
            // POTENTIAL FREE DELIVERY
            if($total < 100){
                $delivery_price = floatval($delivery->getPrice()) * floatval($total_weight);
                $total += $delivery_price;
                $order->setFee($delivery_price);
            }else{
                $order->setFee(0);
            }
            // POTENTIAL GIFT WRAP FOR FREE
            if($total > 250 || date('m') === 12){
                $wrap = $productRepository->findOneById(1);
                array_push($order_items, json_encode(array(
                    'id' => $wrap->getId(),
                    'title' => $wrap->getTitle(),
                    'price' => $wrap->getPrice(),
                    "quantity" => 1)));
            }
            $order->setItems($order_items);
            $order->setTotal(round(floatVal($total), 2));
            $order->setPayment(false);
            $order->setState('En cours de préparation.');
            // ENTITY MANAGER PART
            $entityManager->persist($order);
            $entityManager->flush();
            return new Response(json_encode([
                "status" => 200,
                "message" => "Votre commande n° " . $order->getId() . " a bien été créée !",
                "order" => json_decode($serializer->serialize($order)),
            ]));
        }
        public function read(Request $request, $id): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Order::class);
            $order = $repository->findOneById($id);
            if($order) {
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Votre commande a bien été retrouvée !",
                    "order" => json_decode($serializer->serialize($order, null))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cette commande n'existe pas !"
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
            $repository = $this->getDoctrine()->getRepository(Order::class);
            $order = $repository->findOneById($request->get("id"));
            if($order) {
                $entityManagerService = new EntityManager();
                $entityManagerService->persistEntity($request, $order, null, null, $entityManager, null);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "La commande n° " . $order->getId() . " a bien été modifiée !",
                    "order" => json_decode($serializer->serialize($order, null))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cette commande n'existe pas !"
                ]));
            };
        }
        public function confirmPayment(Request $request, EntityManagerInterface $entityManager): Response {
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
            $repository = $this->getDoctrine()->getRepository(Order::class);
            $order = $repository->findOneById($request->get("order_id"));
            if($order) {
                $order->setPayment(true);
                $entityManager->persist($order);
                $entityManager->flush();
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "La commande n° " . $order->getId() . " a bien été payée !",
                    "order" => json_decode($serializer->serialize($order, null))
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cette commande n'existe pas !"
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
            $repository = $this->getDoctrine()->getRepository(Order::class);
            $order = $repository->findOneById($request->get("id"));
            if($order) {
                $orderNumber = $order->getId();
                $entityManagerService = new EntityManager();
                $entityManagerService->removeEntity($order, $entityManager);
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Votre commande n° " . $orderNumber . " a bien été annulée et supprimée !"
                ]));
            } else {
                return new Response(json_encode([
                    "status" => 400,
                    "message" => "Cette commande n'existe pas !"
                ]));
            };
        }
        public function readAll(Request $request, $page): Response {
            $serializer = new ObjectSerializer();
            $repository = $this->getDoctrine()->getRepository(Order::class);
            if($page === 0) {
                $orders = $repository->findAll();
                return new Response(json_encode([
                    "status" => 200,
                    "message" => "Les commandes ont bien été récupérées.",
                    "orders" => json_decode($serializer->serialize(null, $orders))
                ]));
            } elseif($page > 0) {
                $pagination = new Paginate();
                $pagination = $pagination->setPaginationData($repository->getOrdersCount(), 25, $page, ceil($repository->getOrdersCount() / 25), ($page * 25) - 25, $repository->getOrders(($page * 25) - 25, 25), "/orders/read/");
                return new Response(json_encode([
                    "page" => $pagination["page"],
                    "status" => 200,
                    "message" => "Les commandes ont bien été récupérées.",
                    "count" => $pagination["count"],
                    "pages" => $pagination["pages"],
                    "previous" => $pagination["previous"],
                    "next" => $pagination["next"],
                    "orders" => json_decode($pagination["elements"])
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
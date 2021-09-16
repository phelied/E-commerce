<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Service;
    /* ----------------------------------------------------------------------------------------- */
    /* DEFAULTS */
    /* ----------------------------------------------------------------------------------------- */
    use DateTimeImmutable;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITITES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Entity\User;
    use App\Entity\Product;
    use App\Entity\Comment;
    use App\Entity\Order;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICE */
    /* ----------------------------------------------------------------------------------------- */
    class EntityManager {
        public function __construct() {}
        public function persistEntity($request, $entity, $hasher, $uploader, $entityManager, $repositories) {
            $data = $request->request->all();
            foreach($data as $field => $value) {
                if($field !== "id" && $field !== "update" && $field !== "author") {
                    $method = "set" . ucwords(str_replace("_", "", $field));
                    if($value !== "" && $value !== null) {
                        switch($field) {
                            case "title":
                                $entity->$method(strtoupper($value));
                                break;
                            case "category":
                                $category = ($repositories["category"]->findOneById($value)) ? $repositories["category"]->findOneById($value) : null;
                                $entity->$method($category);
                                break;
                            case "user":
                                $user = ($repositories["user"]->findOneById($value)) ? $repositories["user"]->findOneById($value) : null;
                                $entity->$method($user);
                                break;
                            case "product":
                                $product = ($repositories["product"]->findOneById($value)) ? $repositories["product"]->findOneById($value) : null;
                                $entity->$method($product);
                                break;
                            case "name":
                                $entity->$method(ucwords(strtolower($value)));
                                break;
                            case "password":
                                $user = new User();
                                $entity->$method($hasher->hashPassword($user, $value));
                                break;
                            case "password_update":
                                $user = new User();
                                $method = preg_replace("/(Update)|(update)/", "", $method);
                                ($value === "" || strlen($value) === 0) ? null : $entity->$method($hasher->hashPassword($user, $value));
                                break;
                            case "birthdate":
                                ($value === "" || strlen($value) === 0) ? $entity->$method(null) : $entity->$method(new DateTimeImmutable($value));
                                break;
                            case "start_date":
                                ($value === "" || strlen($value) === 0) ? $entity->$method(null) : $entity->$method(new DateTimeImmutable($value));
                                break;
                            case "end_date":
                                ($value === "" || strlen($value) === 0) ? $entity->$method(null) : $entity->$method(new DateTimeImmutable($value));
                                break;
                            case "global":
                                ($request->get("product") === "" && $request->get("category") === "") ? $entity->$method(true) : $entity->$method(false);
                                break;
                            default:
                                ($field !== "id" && $field !== "update" && $field !== "author" && $field !== "user_id" && $field !== "token") ? $entity->$method($value) : null;
                                break;
                        };
                    } else {
                        if($field !== 'password_update'){
                            if($field === "global") {
                                $entity->$method(false);
                            } else {
                                $entity->$method(null);
                            };
                        }
                    };
                };
            };
            if($entity instanceof User) {
                $picture = $request->files->get("picture");
                if($picture) {
                    if($request->get("password_update") !== null) {
                        if($entity->getPicture() !== null && $entity->getPicture() !== "") {
                            $uploader->delete($entity->getPicture());
                        };
                        $filename = $uploader->upload($picture, "users");
                        $entity->setPicture("/uploads/users/" . $filename);
                    } else {
                        $filename = $uploader->upload($picture, "users");
                        $entity->setPicture("/uploads/users/" . $filename);
                    };
                };
                $entity->setRoles([ "ROLE_USER" ]);
                $entity->setActive(true);
            } elseif($entity instanceof Product) {
                if($request->get("update")) {
                    $pictures = $request->files->get("pictures");
                    $picturesArray = explode(", ", $entity->getPictures());
                    if($pictures) {
                        foreach($pictures as $key => $picture) {
                            $filename = $uploader->upload($picture, "products");
                            array_push($picturesArray, "/uploads/products/" . $filename);
                        };
                        $entity->setPictures(implode(", ", $picturesArray));
                    } else {
                        $entity->setPictures(implode(", ", $picturesArray));
                    };
                } else {
                    $pictures = $request->files->get("pictures");
                    $picturesArray = [];
                    if($pictures) {
                        foreach($pictures as $key => $picture) {
                            $filename = $uploader->upload($picture, "products");
                            $picturesArray[$key] = "/uploads/products/" . $filename;
                        };
                        $entity->setPictures(implode(", ", $picturesArray));
                    };
                };
            } elseif($entity instanceof Comment) {
                $entity->setDate(new DateTimeImmutable());
            } elseif($entity instanceof Order && $request->get("update") === null) {
                $entity->setPayment(false);
                $entity->setState("En attente de validation");
            };
            $entityManager->persist($entity);
            return $entityManager->flush();
        }
        public function removeEntity($entity, $entityManager) {
            $entityManager->remove($entity);
            return $entityManager->flush();
        }
    };
?>
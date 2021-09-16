<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Repository;
    /* ----------------------------------------------------------------------------------------- */
    /* DEFAULTS */
    /* ----------------------------------------------------------------------------------------- */
    use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
    use Doctrine\Persistence\ManagerRegistry;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITIES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Entity\Product;
    /* ----------------------------------------------------------------------------------------- */
    /* REPOSITORY */
    /* ----------------------------------------------------------------------------------------- */
    /**
     * @method Product|null find($id, $lockMode = null, $lockVersion = null)
     * @method Product|null findOneBy(array $criteria, array $orderBy = null)
     * @method Product[]    findAll()
     * @method Product[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class ProductRepository extends ServiceEntityRepository {
        public function __construct(ManagerRegistry $registry) {
            parent::__construct($registry, Product::class);
        }
        public function getProductsCount($request) {
            if($request->get("minPrice") && $request->get("maxPrice") && !$request->get("available")) {
                $products = $this->createQueryBuilder("products")
                ->where("products.price BETWEEN :min AND :max")
                ->setParameter("min", $request->get("minPrice"))
                ->setParameter("max", $request->get("maxPrice"))
                ->getQuery()
                ->getResult();
            } elseif(!$request->get("minPrice") && !$request->get("maxPrice") && $request->get("available")) {
                $products = $this->createQueryBuilder("products")
                ->where("products.available = :available")
                ->setParameter("available", $request->get("available"))
                ->getQuery()
                ->getResult();
            } elseif($request->get("minPrice") && $request->get("maxPrice") && $request->get("available")) {
                $products = $this->createQueryBuilder("products")
                ->where("products.price BETWEEN :min AND :max HAVING products.available = :available")
                ->setParameter("min", $request->get("minPrice"))
                ->setParameter("max", $request->get("maxPrice"))
                ->setParameter("available", $request->get("available"))
                ->getQuery()
                ->getResult();
            } else {
                $products = $this->findAll();
            };
            return sizeof($products);
        }
        public function getProducts($firstProduct, $productsPerPage, $request) {
            if($request->get("sort")) {
                switch($request->get("sort")) {
                    case "id_desc":
                        if($request->get("minPrice") && $request->get("maxPrice") && !$request->get("available")) {
                            return $this->createQueryBuilder("products")
                            ->where("products.price BETWEEN :min AND :max")
                            ->setParameter("min", $request->get("minPrice"))
                            ->setParameter("max", $request->get("maxPrice"))
                            ->orderBy("products.id", "DESC")
                            ->setFirstResult($firstProduct)
                            ->setMaxResults($productsPerPage)
                            ->getQuery()
                            ->getResult();
                        } elseif($request->get("minPrice") && $request->get("maxPrice") && $request->get("available")) {
                            return $this->createQueryBuilder("products")
                            ->where("products.price BETWEEN :min AND :max HAVING products.available = :available")
                            ->setParameter("min", $request->get("minPrice"))
                            ->setParameter("max", $request->get("maxPrice"))
                            ->setParameter("available", $request->get("available"))
                            ->orderBy("products.id", "DESC")
                            ->setFirstResult($firstProduct)
                            ->setMaxResults($productsPerPage)
                            ->getQuery()
                            ->getResult();
                        } else {
                            return $this->findBy([], [ "id" => "DESC" ], $productsPerPage, $firstProduct);
                        };
                    case "stars_desc":
                        if($request->get("minPrice") && $request->get("maxPrice") && !$request->get("available")) {
                            return $this->createQueryBuilder("products")
                            ->where("products.price BETWEEN :min AND :max")
                            ->setParameter("min", $request->get("minPrice"))
                            ->setParameter("max", $request->get("maxPrice"))
                            ->orderBy("products.stars", "DESC")
                            ->setFirstResult($firstProduct)
                            ->setMaxResults($productsPerPage)
                            ->getQuery()
                            ->getResult();
                        } elseif($request->get("minPrice") && $request->get("maxPrice") && $request->get("available")) {
                            return $this->createQueryBuilder("products")
                            ->where("products.price BETWEEN :min AND :max HAVING products.available = :available")
                            ->setParameter("min", $request->get("minPrice"))
                            ->setParameter("max", $request->get("maxPrice"))
                            ->setParameter("available", $request->get("available"))
                            ->orderBy("products.stars", "DESC")
                            ->setFirstResult($firstProduct)
                            ->setMaxResults($productsPerPage)
                            ->getQuery()
                            ->getResult();
                        } else {
                            return $this->findBy([], [ "stars" => "DESC" ], $productsPerPage, $firstProduct);
                        };
                    case "price_asc":
                        if($request->get("minPrice") && $request->get("maxPrice") && !$request->get("available")) {
                            return $this->createQueryBuilder("products")
                            ->where("products.price BETWEEN :min AND :max")
                            ->setParameter("min", $request->get("minPrice"))
                            ->setParameter("max", $request->get("maxPrice"))
                            ->orderBy("products.price", "ASC")
                            ->setFirstResult($firstProduct)
                            ->setMaxResults($productsPerPage)
                            ->getQuery()
                            ->getResult();
                        } elseif($request->get("minPrice") && $request->get("maxPrice") && $request->get("available")) {
                            return $this->createQueryBuilder("products")
                            ->where("products.price BETWEEN :min AND :max HAVING products.available = :available")
                            ->setParameter("min", $request->get("minPrice"))
                            ->setParameter("max", $request->get("maxPrice"))
                            ->setParameter("available", $request->get("available"))
                            ->orderBy("products.price", "ASC")
                            ->setFirstResult($firstProduct)
                            ->setMaxResults($productsPerPage)
                            ->getQuery()
                            ->getResult();
                        } else {
                            return $this->findBy([], [ "price" => "ASC" ], $productsPerPage, $firstProduct);
                        };
                    case "price_desc":
                        if($request->get("minPrice") && $request->get("maxPrice") && !$request->get("available")) {
                            return $this->createQueryBuilder("products")
                            ->where("products.price BETWEEN :min AND :max")
                            ->setParameter("min", $request->get("minPrice"))
                            ->setParameter("max", $request->get("maxPrice"))
                            ->orderBy("products.price", "DESC")
                            ->setFirstResult($firstProduct)
                            ->setMaxResults($productsPerPage)
                            ->getQuery()
                            ->getResult();
                        } elseif($request->get("minPrice") && $request->get("maxPrice") && $request->get("available")) {
                            return $this->createQueryBuilder("products")
                            ->where("products.price BETWEEN :min AND :max HAVING products.available = :available")
                            ->setParameter("min", $request->get("minPrice"))
                            ->setParameter("max", $request->get("maxPrice"))
                            ->setParameter("available", $request->get("available"))
                            ->orderBy("products.price", "DESC")
                            ->setFirstResult($firstProduct)
                            ->setMaxResults($productsPerPage)
                            ->getQuery()
                            ->getResult();
                        } else {
                            return $this->findBy([], [ "price" => "DESC" ], $productsPerPage, $firstProduct);
                        };
                    default:
                        break;
                };
            } else {
                if($request->get("minPrice") && $request->get("maxPrice") && !$request->get("available")) {
                    return $this->createQueryBuilder("products")
                    ->where("products.price BETWEEN :min AND :max")
                    ->setParameter("min", $request->get("minPrice"))
                    ->setParameter("max", $request->get("maxPrice"))
                    ->setFirstResult($firstProduct)
                    ->setMaxResults($productsPerPage)
                    ->getQuery()
                    ->getResult();
                } elseif(!$request->get("minPrice") && !$request->get("maxPrice") && $request->get("available")) {
                    return $this->createQueryBuilder("products")
                    ->where("products.available = :available")
                    ->setParameter("available", $request->get("available"))
                    ->setFirstResult($firstProduct)
                    ->setMaxResults($productsPerPage)
                    ->getQuery()
                    ->getResult();
                } elseif($request->get("minPrice") && $request->get("maxPrice") && $request->get("available")) {
                    return $this->createQueryBuilder("products")
                    ->where("products.price BETWEEN :min AND :max HAVING products.available = :available")
                    ->setParameter("min", $request->get("minPrice"))
                    ->setParameter("max", $request->get("maxPrice"))
                    ->setParameter("available", $request->get("available"))
                    ->getQuery()
                    ->getResult();
                } else {
                    return $this->findBy([], null, $productsPerPage, $firstProduct);
                };
            };
        }
        public function getLatestProducts() {
            return $this->findBy([], [ "id" => "DESC" ], 9, null);
        }
        public function getSearchedProducts($match) {
            $products = $this->createQueryBuilder("products")
            ->where("products.title LIKE :title")
            ->setParameter("title", "%" . $match ."%")
            ->setMaxResults(9)
            ->getQuery()
            ->getResult();
            return $products;
        }
        public function getMinAndMaxProductsPrices() {
            $min = $this->createQueryBuilder("products")->select("MIN(products.price)")->getQuery()->getSingleResult();
            $max = $this->createQueryBuilder("products")->select("MAX(products.price)")->getQuery()->getSingleResult();
            return [ "minPrice" => $min[1], "maxPrice" => $max[1] ];
        }
    };
?>
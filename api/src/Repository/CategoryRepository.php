<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Repository;
    namespace App\Repository;
    /* ----------------------------------------------------------------------------------------- */
    /* DEFAULTS */
    /* ----------------------------------------------------------------------------------------- */
    use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
    use Doctrine\Persistence\ManagerRegistry;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITIES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Entity\Category;
    /* ----------------------------------------------------------------------------------------- */
    /* REPOSITORY */
    /* ----------------------------------------------------------------------------------------- */
    /**
     * @method Category|null find($id, $lockMode = null, $lockVersion = null)
     * @method Category|null findOneBy(array $criteria, array $orderBy = null)
     * @method Category[]    findAll()
     * @method Category[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class CategoryRepository extends ServiceEntityRepository {
        public function __construct(ManagerRegistry $registry) {
            return parent::__construct($registry, Category::class);
        }
        public function getCategoriesCount() {
            $query = $this->createQueryBuilder("categories")->getQuery()->getResult();
            return sizeof($query);
        }
        public function getCategories($firstCategory, $categoriesPerPage) {
            return $this->findBy(array(), [ "id" => "ASC" ], $categoriesPerPage, $firstCategory);
        }
    };
?>
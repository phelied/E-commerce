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
    use App\Entity\Discount;
    /* ----------------------------------------------------------------------------------------- */
    /* REPOSITORY */
    /* ----------------------------------------------------------------------------------------- */
    /**
     * @method Discount|null find($id, $lockMode = null, $lockVersion = null)
     * @method Discount|null findOneBy(array $criteria, array $orderBy = null)
     * @method Discount[]    findAll()
     * @method Discount[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class DiscountRepository extends ServiceEntityRepository {
        public function __construct(ManagerRegistry $registry) {
            parent::__construct($registry, Discount::class);
        }
        public function getDiscountsCount() {
            $query = $this->createQueryBuilder("discounts")->getQuery()->getResult();
            return sizeof($query);
        }
        public function getDiscounts($firstDiscount, $discountsPerPage) {
            return $this->findBy(array(), null, $discountsPerPage, $firstDiscount);
        }
    };
?>
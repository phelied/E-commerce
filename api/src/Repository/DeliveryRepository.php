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
    use App\Entity\Delivery;
    /* ----------------------------------------------------------------------------------------- */
    /* REPOSITORY */
    /* ----------------------------------------------------------------------------------------- */
    /**
     * @method Delivery|null find($id, $lockMode = null, $lockVersion = null)
     * @method Delivery|null findOneBy(array $criteria, array $orderBy = null)
     * @method Delivery[]    findAll()
     * @method Delivery[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class DeliveryRepository extends ServiceEntityRepository {
        public function __construct(ManagerRegistry $registry) {
            parent::__construct($registry, Delivery::class);
        }
        public function getDeliveriesCount() {
            $query = $this->createQueryBuilder("deliveries")->getQuery()->getResult();
            return sizeof($query);
        }
        public function getDeliveries($firstDelivery, $deliveriesPerPage) {
            return $this->findBy(array(), null, $deliveriesPerPage, $firstDelivery);
        }
    };
?>
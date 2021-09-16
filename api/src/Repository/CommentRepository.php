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
    use App\Entity\Comment;
    /* ----------------------------------------------------------------------------------------- */
    /* REPOSITORY */
    /* ----------------------------------------------------------------------------------------- */
    /**
     * @method Comment|null find($id, $lockMode = null, $lockVersion = null)
     * @method Comment|null findOneBy(array $criteria, array $orderBy = null)
     * @method Comment[]    findAll()
     * @method Comment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class CommentRepository extends ServiceEntityRepository {
        public function __construct(ManagerRegistry $registry) {
            parent::__construct($registry, Comment::class);
        }
        public function getCommentsCount() {
            $query = $this->createQueryBuilder("comments")->getQuery()->getResult();
            return sizeof($query);
        }
        public function getComments($firstComment, $commentsPerPage) {
            return $this->findBy(array(), null, $commentsPerPage, $firstComment);
        }
        public function getAverage($product) {
            $query = $this->createQueryBuilder("comments")
            ->select("avg(comments.stars)")
            ->where("comments.product = :product")
            ->setParameter("product", $product)
            ->getQuery()
            ->getSingleResult();
            return $query;
        }
    };
?>
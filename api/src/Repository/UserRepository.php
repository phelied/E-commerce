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
    use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
    use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
    use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITIES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Entity\User;
    /* ----------------------------------------------------------------------------------------- */
    /* REPOSITORY */
    /* ----------------------------------------------------------------------------------------- */
    /**
     * @method User|null find($id, $lockMode = null, $lockVersion = null)
     * @method User|null findOneBy(array $criteria, array $orderBy = null)
     * @method User[]    findAll()
     * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface {
        public function __construct(ManagerRegistry $registry) {
            parent::__construct($registry, User::class);
        }
        public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void {
            if(!$user instanceof User) {
                throw new UnsupportedUserException(sprintf("Instances of '%s' are not supported.", \get_class($user)));
            };
            $user->setPassword($newHashedPassword);
            $this->_em->persist($user);
            $this->_em->flush();
        }
        public function getUsersCount() {
            $query = $this->createQueryBuilder("users")->getQuery()->getResult();
            return sizeof($query);
        }
        public function getUsers($firstUser, $usersPerPage) {
            return $this->findBy(array(), null, $usersPerPage, $firstUser);
        }
    };
?>
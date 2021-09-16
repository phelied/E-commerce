<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\DataFixtures;
    /* ----------------------------------------------------------------------------------------- */
    /* DEFAULTS */
    /* ----------------------------------------------------------------------------------------- */
    use Doctrine\Bundle\FixturesBundle\Fixture;
    use Doctrine\Persistence\ObjectManager;
    use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
    use DateTimeImmutable;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITITES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Entity\User;
    /* ----------------------------------------------------------------------------------------- */
    /* FIXTURE */
    /* ----------------------------------------------------------------------------------------- */
    class UserFixtures extends Fixture {
        private $hasher;
        public function __construct(UserPasswordHasherInterface $hasher) {
            return $this->hasher = $hasher;
        }
        public function load(ObjectManager $manager) {
            $usersToCreate = 50;
            for($i = 0; $i < $usersToCreate; $i++) {
                $user = new User();
                $user->setLastname("Utilisateur" . $i);
                $user->setFirstname("Utilisateur" . $i);
                $user->setEmail("utilisateur" . $i . "@gmail.com");
                $user->setPassword($this->hasher->hashPassword($user, "Utilisateur" . $i));
                ($i < 10) ? $user->setPhone("000000000" . $i) : $user->setPhone("00000000" . $i);
                $user->setBirthdate(new DateTimeImmutable("2001-01-01"));
                $user->setPicture(null);
                $user->setCountry("France");
                $user->setCity("Paris");
                $user->setAddress("17 Rue des Envierges");
                $user->setPostalCode("75020");
                $user->setEmailVerifiedAt(null);
                ($i === 0) ? $user->setRoles([ "ROLE_USER", "ROLE_ADMIN" ]) : $user->setRoles([ "ROLE_USER" ]);
                $user->setActive(true);
                $manager->persist($user);
            };
            return $manager->flush();
        }
    };
?>
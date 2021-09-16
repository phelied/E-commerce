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
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITITES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Entity\Category;
    /* ----------------------------------------------------------------------------------------- */
    /* FIXTURE */
    /* ----------------------------------------------------------------------------------------- */
    class CategoryFixtures extends Fixture {
        public function __construct() {}
        public function load(ObjectManager $manager) {
            $categories = [
                "Aucune",
                "Carte Graphique",
                "Console",
                "Logiciel",
                "Souris",
                "Clavier",
                "Écran",
                "Casque",
                "Écouteurs",
                "Ordinateur Portable",
                "Téléphone",
                "Disque Dur",
                "Néon",
                "Mémoire Vive",
                "Alimentation",
                "Ventilateur",
                "Ventirad",
                "Radiateur",
                "Processeur",
                "Tablette Graphique",
                "Boîtier",
                "Carte Mère",
                "Manette",
                "Home Cinéma",
                "Enceinte",
                "Appareil Photo",
                "Hub",
                "Climatiseur",
                "Support Casque",
                "Support Écran"
            ];
            foreach($categories as $categoryName) {
                $category = new Category();
                $category->setName($categoryName);
                $manager->persist($category);
                $this->addReference($categoryName, $category);
            };
            return $manager->flush();
        }
    };
?>
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
    use App\Entity\Product;
    use App\Entity\Category;
    /* ----------------------------------------------------------------------------------------- */
    /* FIXTURE */
    /* ----------------------------------------------------------------------------------------- */
    class ProductFixtures extends Fixture {
        public function __construct() {}
        public function load(ObjectManager $manager) {
            $products = [
                0 => [
                    "title" => "NZXT H210I BLANC",
                    "subtitle" => "Boîtier mini tour avec fenêtre latérale en verre trempé et rétroéclairage RGB",
                    "pictures" => "/uploads/products/LD0005351087-2-611938a731a9f.jpg, /uploads/products/LD0005351092-2-611938a734c9d.jpg, /uploads/products/LD0005351097-2-611938a7357a1.jpg, /uploads/products/LD0005351102-2-611938a736373.jpg, /uploads/products/LD0005351107-2-611938a736da5.jpg",
                    "description" => "Tout comme les autres boîtiers de la série H de NZXT ce boîtier H210i est conçu pour la performance et le silence. Élégant avec son panneau en verre trempé, il est prêt à accueillir la configuration compacte de vos rêves. Il peut recevoir une carte mère au format Mini-ITX...",
                    "price" => 129.95,
                    "weight" => 6,
                    "quantity" => 24,
                    "stars" => null,
                    "available" => 1,
                    "category" => "Boîtier"
                ],
                1 => [
                    "title" => "NZXT H210 NOIR/ROUGE",
                    "subtitle" => "Boîtier mini tour avec fenêtre latérale en verre trempé",
                    "pictures" => "/uploads/products/LD0005351568-2-611939b0600f1.jpg, /uploads/products/LD0005351573-2-611939b0631a3.jpg, /uploads/products/LD0005351578-2-611939b063de8.jpg, /uploads/products/LD0005351583-2-611939b0648d1.jpg, /uploads/products/LD0005351588-2-611939b0652a3.jpg",
                    "description" => "Tout comme les autres boîtiers de la série H de NZXT ce boîtier H210 est conçu pour la performance et le silence. Compact, élégant avec son panneau en verre trempé, il est prêt à accueillir la configuration de vos rêves.",
                    "price" => 109.94,
                    "weight" => 5.9,
                    "quantity" => 26,
                    "stars" => null,
                    "available" => 1,
                    "category" => "Boîtier"
                ],
                2 => [
                    "title" => "AEROCOOL CYLON 500W",
                    "subtitle" => "Alimentation 500W ATX12V v2.4 - 80PLUS avec rétroéclairage ARGB",
                    "pictures" => "/uploads/products/LD0005654994-2-61193a2076c79.jpg, /uploads/products/LD0005654999-2-61193a2079c42.jpg, /uploads/products/LD0005655004-2-61193a207a6ad.jpg, /uploads/products/LD0005655009-2-61193a207b23c.jpg, /uploads/products/LD0005655014-2-61193a207bd13.jpg",
                    "description" => "L'alimentation Aerocool Cylon 500W certifiée 80PLUS offre un design soigné et élégant pour votre PC grâce à son rétroéclairage RGB adressable. Elle délivre 500 Watts avec un rendement jusqu'à 85% et le rétroéclairage ARGB dispose de 13 effets commandables via un bouton.",
                    "price" => 69.95,
                    "weight" => null,
                    "quantity" => 39,
                    "stars" => null,
                    "available" => 1,
                    "category" => "Alimentation"
                ],
                3 => [
                    "title" => "SEAGATE BARRACUDA 2 TO (ST2000DM008)",
                    "subtitle" => "Disque dur 3.5\" 2 To 7200 RPM 256 Mo Serial ATA 6 Gb/s (bulk)",
                    "pictures" => "/uploads/products/LD0005494681-2-61193cbaed27f.jpg, /uploads/products/LD0005494686-2-61193cbaf05e8.jpg, /uploads/products/LD0005494691-2-61193cbaf115d.jpg, /uploads/products/LD0005494696-2-61193cbaf1c15.jpg, /uploads/products/LD0005494701-2-61193cbaf282e.jpg",
                    "description" => "Optez pour une grande capacité de stockage avec le disque dur Seagate BarraCuda 2 To. Cette gamme domine le marché en proposant les meilleures capacités pour les ordinateurs de bureau et périphériques mobiles. Ces disques conviennent parfaitement aux mises à niveau et à tous les budgets.",
                    "price" => 59.95,
                    "weight" => 0.49,
                    "quantity" => 63,
                    "stars" => null,
                    "available" => 1,
                    "category" => "Disque Dur"
                ],
                4 => [
                    "title" => "SAMSUNG SSD 870 QVO 1 TO",
                    "subtitle" => "SSD 1 To Cache 1 Go 2.5\" 6.8 mm QLC Serial ATA 6Gb/s",
                    "pictures" => "/uploads/products/LD0005694752-1-61193d1aedf8b.jpg, /uploads/products/LD0005694753-1-61193d1af0e50.jpg, /uploads/products/LD0005694754-1-61193d1af19c0.jpg, /uploads/products/LD0005694755-1-61193d1af242e.jpg, /uploads/products/LD0005694756-1-61193d1af3041.jpg",
                    "description" => "Grande fiabilité, capacité de stockage de 1 à 8 To, vitesses supérieures, le disque SSD 870 QVO signé Samsung affirme son potentiel une fois installé dans votre ordinateur ! Porté par la technologie V-NAND et le contrôleur MKX basé sur l'algorithme ECC, ce modèle se montre fiable et performant.",
                    "price" => 129.95,
                    "weight" => 0.05,
                    "quantity" => 19,
                    "stars" => null,
                    "available" => 1,
                    "category" => "Disque Dur"
                ],
                5 => [
                    "title" => "CORSAIR FORCE MP510 4 TO",
                    "subtitle" => "Disque SSD NVMe 1.3 PCIe 3.0 4x 4 To NAND 3D TLC M.2 2280",
                    "pictures" => "/uploads/products/LD0005612835-2-0005707260-61193d7bd60de.jpg, /uploads/products/LD0005612840-2-0005707261-61193d7bd9410.jpg, /uploads/products/LD0005612845-2-0005707262-61193d7bda42e.jpg, /uploads/products/LD0005612850-2-0005707263-61193d7bdaef9.jpg, /uploads/products/LD0005612855-2-0005707264-61193d7bdbaf7.jpg",
                    "description" => "Si vous souhaitez aller plus vite, le SSD M.2 PCIe 3.0 x4 NVMe 1.3 Corsair Force MP510 est le disque qu'il vous faut. Ultra-rapide et fiable, il boostera significativement les performances des ordinateurs et PC portables compatibles avec la technologie NVMe 1.3.",
                    "price" => 849.95,
                    "weight" => null,
                    "quantity" => 45,
                    "stars" => null,
                    "available" => 1,
                    "category" => "Disque Dur"
                ],
                6 => [
                    "title" => "ASUS ROG CLAYMORE II",
                    "subtitle" => "Clavier gaming avec ou sans fil - USB/RF 2.4 GHz - interrupteurs optiques rouges (switches ASUS ROG RX Red) - rétroéclairage RGB Aura Sync - pavé numérique amovible - repose-poignets magnétique - AZERTY, Français",
                    "pictures" => "/uploads/products/LD0005828776-1-61193e0fb5fe0.jpg, /uploads/products/LD0005828777-1-61193e0fb9498.jpg, /uploads/products/LD0005828778-1-61193e0fb9fbd.jpg, /uploads/products/LD0005828779-1-61193e0fbaabb.jpg, /uploads/products/LD0005828780-1-61193e0fbb5ed.jpg",
                    "description" => "Ne laissez aucune chance à vos adversaires avec le ASUS ROG Claymore II. Ce clavier filaire ou sans fil est doté de commutateurs mécaniques optiques rouges ROG RX qui offrent une sensation fluide et linéaire pour vous donner une réponse quasi instantanée au moment où vous appuyez sur la touche.",
                    "price" => 279.95,
                    "weight" => 1.16,
                    "quantity" => 30,
                    "stars" => null,
                    "available" => 1,
                    "category" => "Clavier"
                ],
                7 => [
                    "title" => "RAZER HUNTSMAN V2 ANALOG",
                    "subtitle" => "Clavier gaming - interrupteurs optiques analogiques Razer - rétro-éclairage RGB Chroma - repose-poignets magnétique en similicuir moelleux - AZERTY, Français",
                    "pictures" => "/uploads/products/LD0005830616-1-61193e4e783ae.jpg, /uploads/products/LD0005830617-1-61193e4e7b251.jpg, /uploads/products/LD0005830618-1-61193e4e7bc9a.jpg, /uploads/products/LD0005830624-1-61193e4e7c811.jpg, /uploads/products/LD0005830625-1-61193e4e7d57d.jpg",
                    "description" => "Prenez l'ascendant sur tous vos adversaires grâce au Razer Huntsman v2 Analog. Ce clavier pour gamer est équipé des switchs optiques analogiques Razer qui vous donnent autant de précision granulaire que des sticks analogiques. Avec eux, l'activation se fait à la vitesse de la lumière.",
                    "price" => 279.95,
                    "weight" => null,
                    "quantity" => 7,
                    "stars" => null,
                    "available" => 1,
                    "category" => "Clavier"
                ],
                8 => [
                    "title" => "RAZER NAGA PRO",
                    "subtitle" => "Souris avec ou sans fil pour gamer - droitier - capteur optique 20000 dpi - jusqu'à 20 boutons programmables - rétroéclairage RGB Chroma 16.8 millions de couleurs - panneau latéral interchangeable et boutons amovibles",
                    "pictures" => "/uploads/products/LD0005713477-1-61193f7f951b1.jpg, /uploads/products/LD0005713479-1-61193f7f9805d.jpg, /uploads/products/LD0005713480-1-61193f7f98a94.jpg, /uploads/products/LD0005713483-1-61193f7f996b7.jpg",
                    "description" => "Quel que soit le jeu auquel vous jouez, la souris Razer Naga Pro apporte toute l'ergonomie et l'esthétique attendue d'un gamer ! Elle vous permet de configurer votre souris pour tout, que ce soit pour utiliser des armes ou créer des personnalisations, afin que vous écrasiez toujours la concurrence.",
                    "price" => 169.96,
                    "weight" => null,
                    "quantity" => 53,
                    "stars" => null,
                    "available" => 1,
                    "category" => "Souris"
                ],
                9 => [
                    "title" => "RAZER BASILISK ULTIMATE",
                    "subtitle" => "Souris avec ou sans fil pour gamer - droitier - technologie Razer HyperSpeed - capteur optique 20000 dpi - 11 boutons programmables - rétro-éclairage Chroma RGB - Dock de chargement",
                    "pictures" => "/uploads/products/LD0005732216-1-61194005f0c9e.jpg, /uploads/products/LD0005732217-1-61194005f3d57.jpg, /uploads/products/LD0005732218-1-6119400600606.jpg, /uploads/products/LD0005732219-1-61194006015cb.jpg, /uploads/products/LD0005732220-1-6119400601fb4.jpg",
                    "description" => "Avec la Razer Basilisk Ultimate, vous disposez d'une souris de jeu sans fil haute performance. Disposant de technologies avancées comme la technologie sans fil Razer HyperSpeed ou encore les switches optiques Razer, la Basilisk Ultimate vous aide à frapper avec une rapidité mortelle.",
                    "price" => 159.95,
                    "weight" => 0.11,
                    "quantity" => 26,
                    "stars" => null,
                    "available" => 1,
                    "category" => "Souris"
                ],
                10 => [
                    "title" => "LOGITECH G903 LIGHTSPEED HERO WIRELESS GAMING MOUSE",
                    "subtitle" => "Souris avec ou sans fil pour gamer - ambidextre - capteur optique 25000 dpi - 11 boutons programmables - poids ajustable - compatible Powerplay - technologie Lightspeed - rétro-éclairage RGB Lightsync",
                    "pictures" => "/uploads/products/LD0005374632-2-6119409c2a88e.jpg, /uploads/products/LD0005374637-2-6119409c2d9f9.jpg, /uploads/products/LD0005374642-2-6119409c2e4d8.jpg, /uploads/products/LD0005374647-2-6119409c2efef.jpg, /uploads/products/LD0005374652-2-6119409c2f9ff.jpg",
                    "description" => "Extrêmement efficace, la Logitech G903 Lightspeed Hero Wireless Gaming Mouse offre une réactivité exceptionnelle pour les tirs de précision en compétition. Équipée du capteur optique Hero de 25000 dpi, la souris G903 transmet chaque mouvement, et ce, avec une précision et une réactivité optimales.",
                    "price" => 139.96,
                    "weight" => 0.11,
                    "quantity" => 59,
                    "stars" => null,
                    "available" => 1,
                    "category" => "Souris"
                ]
            ];
            foreach($products as $element) {
                $product = new Product();
                $product->setTitle($element["title"]);
                $product->setSubtitle($element["subtitle"]);
                $product->setPictures($element["pictures"]);
                $product->setDescription($element["description"]);
                $product->setPrice($element["price"]);
                $product->setWeight($element["weight"]);
                $product->setQuantity($element["quantity"]);
                $product->setStars($element["stars"]);
                $product->setAvailable($element["available"]);
                $product->setCategory(($this->getReference($element["category"])) ? $this->getReference($element["category"]) : null);
                $manager->persist($product);
            };
            return $manager->flush();
        }
    };
?>
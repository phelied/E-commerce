<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Service;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICE */
    /* ----------------------------------------------------------------------------------------- */
    class Average {
        public function __construct() {}
        public function setAverage($average, $product, $entityManager) {
            $product->setStars($average[1]);
            $entityManager->persist($product);
            return $entityManager->flush();
        }
    };
?>
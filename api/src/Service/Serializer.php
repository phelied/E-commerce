<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Service;
    /* ----------------------------------------------------------------------------------------- */
    /* DEFAULTS */
    /* ----------------------------------------------------------------------------------------- */
    use DateTimeImmutable;
    /* ----------------------------------------------------------------------------------------- */
    /* SERIALIZER */
    /* ----------------------------------------------------------------------------------------- */
    use Symfony\Component\Serializer\Encoder\JsonEncoder;
    use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
    use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
    use Symfony\Component\Serializer\Serializer;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICE */
    /* ----------------------------------------------------------------------------------------- */
    class ObjectSerializer {
        public function __construct() {}
        public function serialize($element = null, $elements = null) {
            $dateCallback = function($innerObject, $outerObject, string $attributeName, string $format = null, array $context = []) {
                return $innerObject instanceof DateTimeImmutable ? $innerObject->format(DateTimeImmutable::ISO8601) : "";
            };
            $picturesCallback = function($innerObject, $outerObject, string $attributeName, string $format = null, array $context = []) {
                return explode(", ", $innerObject);
            };
            $defaultContext = [
                AbstractNormalizer::CALLBACKS => [ "birthdate" => $dateCallback, "emailVerifiedAt" => $dateCallback, "date" => $dateCallback, "startDate" => $dateCallback, "endDate" => $dateCallback, "pictures" => $picturesCallback ],
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function($object, $format, $context) { return $object; }
            ];
            $encoders = [ new JsonEncoder() ];
            $normalizers = [ new ObjectNormalizer(null, null, null, null, null, null, $defaultContext) ];
            $serializer = new Serializer($normalizers, $encoders);
            return ($element !== null) ? $serializer->serialize($element, "json") : (($elements !== null) ? $serializer->serialize($elements, "json") : null);
        }
    };
?>
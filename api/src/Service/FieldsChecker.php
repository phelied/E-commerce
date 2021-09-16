<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Service;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICE */
    /* ----------------------------------------------------------------------------------------- */
    class FieldsChecker {
        public function __construct() {}
        public function check($requiredFields, $request) {
            foreach($requiredFields as $field) {
                if(is_null($request->get($field)) || empty($request->get($field)) || $request->get($field) === "" || strlen($request->get($field) === 0)) {
                    return false;
                } else {
                    continue;
                };
            };
            return true;
        }
    };
?>
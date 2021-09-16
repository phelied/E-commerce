<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Service;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICE */
    /* ----------------------------------------------------------------------------------------- */
    class Mailer {
        public function __construct() {}
        public function send($callback, $sender, $receiver, $mailer) {
            try {
                $message = (new \Swift_Message("Vous avez reçu une notification !"))->setFrom($sender)->setTo($receiver)->setBody($callback, "text/html");
                return $mailer->send($message);
            } catch(Exception $error) {
                return $error->getMessage();
            };
        }
    };
?>
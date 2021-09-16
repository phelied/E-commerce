<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Service;
    /* ----------------------------------------------------------------------------------------- */
    /* DEFAULTS */
    /* ----------------------------------------------------------------------------------------- */
    use Symfony\Component\HttpFoundation\Request;
    use Doctrine\ORM\EntityManagerInterface;
    
    class Security {
        private $request;
        private $user;
        private $token_validity = 30; // min
        public function __construct(Request $request, $repository) {
            $this->user = $repository->findOneBy([ "id" => $request->get("user_id") ]);
            $this->request = $request;
        }
        public function check($role){
            if($this->request->get("token") && $this->request->get("user_id")){
                if(!$this->checkToken($this->request->get("token"))){
                    return "Mauvais TOKEN de connexion.";
                } else if($role === 'admin' && !$this->checkAdmin()){
                    return "Vous n'avez pas les droits.";
                }
            }else{
                return "Absence d'ID ou de TOKEN.";
            }
        }
        private function checkToken($token) {
           return ($this->user->getToken() === trim($token));
        }
        private function checkAdmin() {
            return (in_array("ROLE_ADMIN", $this->user->getRoles()));
        }
    };
?>
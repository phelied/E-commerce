<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Service;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICE */
    /* ----------------------------------------------------------------------------------------- */
    class Filter {
        private $available;
        private $prices;
        private $stars;
        private $comments;
        private $elements;
        public function __construct(object $filters) {
            if(isset($filters)){
                if(isset($filters->available))
                    $this->available = $filters->available;
                if(isset($filters->prices))
                    $this->prices = explode('-', $filters->prices);
                if(isset($filters->stars))
                    $this->stars = $filters->stars;
                if(isset($filters->comments))
                    $this->comments = explode('-', $filters->comments);
            }
        }
        public function exec($elements) {
            $this->elements = $elements;
            foreach ($this->elements as $key => $element) {
                if($this->available !== 'off' && !$element->available)
                    unset($this->elements[$key]);
                if($this->prices[0] !== 'all' ){
                    if(isset($this->prices[0]) && $element->price < $this->prices[0])
                        unset($this->elements[$key]);
                    if(isset($this->prices[1]) && $element->price > $this->prices[1])
                        unset($this->elements[$key]);
                }
                if($this->stars !== 'all' && $element->stars !== null){
                    $this->stars = intval($this->stars);
                    switch ($this->stars) {
                        case 5:
                            if(floatval($element->stars) < 5)
                                unset($this->elements[$key]);
                            break;
                        case 4:
                            if(floatval($element->stars) < 4)
                                unset($this->elements[$key]);
                            break;
                        case 3:
                        default:
                            if(floatval($element->stars) < 3)
                                unset($this->elements[$key]);
                            break;
                    }
                }
                // if($this->comments[0] !== 'all'){
                //     $comments = $element->comments;
                //     if(isset($this->comments[0]) && count($comments) < $this->comments[0])
                //         unset($this->elements[$key]);
                //     if(isset($this->comments[1]) && count($comments) > $this->comments[1])
                //         unset($this->elements[$key]);
                // }
            }
            return $this->elements;
        }
    }
?>
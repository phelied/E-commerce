<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Service;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Service\ObjectSerializer;
    /* ----------------------------------------------------------------------------------------- */
    /* SERVICE */
    /* ----------------------------------------------------------------------------------------- */
    class Paginate {
        public function __construct() {}
        public function setPaginationData($count, $perPage, $currentPage, $pages, $firstElement, $elements, $route) {
            $serializer = new ObjectSerializer();
            $this->count = $count;
            $this->perPage = $perPage;
            $this->currentPage = $currentPage;
            $this->pages = $pages;
            $this->firstElement = $firstElement;
            $this->elements = $elements;
            $this->route = $route;
            return [
                "page" => $this->currentPage,
                "count" => $this->count,
                "pages" => $this->pages,
                "previous" => ($this->currentPage == 1) ? null : (($this->currentPage > 1 && $this->currentPage <= $this->pages) ? $this->route . $currentPage - 1 : null),
                "next" => ($this->currentPage >= 1) ? (($this->currentPage >= 1 && $this->currentPage < $this->pages) ? $this->route . $this->currentPage + 1 : null) : null,
                "elements" => $serializer->serialize(null, $elements)
            ];
        }
    };
?>
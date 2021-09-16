<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Entity;
    /* ----------------------------------------------------------------------------------------- */
    /* DEFAULTS */
    /* ----------------------------------------------------------------------------------------- */
    use Doctrine\ORM\Mapping as ORM;
    /* ----------------------------------------------------------------------------------------- */
    /* REPOSITORIES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Repository\DiscountRepository;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITY */
    /* ----------------------------------------------------------------------------------------- */
    /**
     * @ORM\Entity(repositoryClass=DiscountRepository::class)
     */
    class Discount {
        /* ----------------------------------------------------------------------------------------- */
        /* PROPERTIES */
        /* ----------------------------------------------------------------------------------------- */
        /**
         * @ORM\Id
         * @ORM\GeneratedValue
         * @ORM\Column(type="integer")
         */
        private $id;
        /**
         * @ORM\Column(type="string", length=255)
         */
        private $code;
        /**
         * @ORM\Column(type="integer")
         */
        private $percent;
        /**
         * @ORM\OneToOne(targetEntity=Product::class, inversedBy="discount", cascade={"persist", "remove"})
         */
        private $product;
        /**
         * @ORM\OneToOne(targetEntity=Category::class, inversedBy="discount", cascade={"persist", "remove"})
         */
        private $category;
        /**
         * @ORM\Column(type="boolean")
         */
        private $global;
        /**
         * @ORM\Column(type="datetime_immutable")
         */
        private $start_date;
        /**
         * @ORM\Column(type="datetime_immutable")
         */
        private $end_date;
        /* ----------------------------------------------------------------------------------------- */
        /* GETTERS */
        /* ----------------------------------------------------------------------------------------- */
        public function getId(): ?int {
            return $this->id;
        }
        public function getCode(): ?string {
            return $this->code;
        }
        public function getPercent(): ?int {
            return $this->percent;
        }
        public function getProduct(): ?Product {
            return $this->product;
        }
        public function getCategory(): ?Category {
            return $this->category;
        }
        public function getGlobal(): ?bool {
            return $this->global;
        }
        public function getStartDate(): ?\DateTimeImmutable {
            return $this->start_date;
        }
        public function getEndDate(): ?\DateTimeImmutable {
            return $this->end_date;
        }
        /* ----------------------------------------------------------------------------------------- */
        /* SETTERS */
        /* ----------------------------------------------------------------------------------------- */
        public function setCode(string $code): self {
            $this->code = $code;
            return $this;
        }
        public function setPercent(int $percent): self {
            $this->percent = $percent;
            return $this;
        }
        public function setProduct(?Product $product): self {
            $this->product = $product;
            return $this;
        }
        public function setCategory(?Category $category): self {
            $this->category = $category;
            return $this;
        }
        public function setGlobal(bool $global): self {
            $this->global = $global;
            return $this;
        }
        public function setStartDate(\DateTimeImmutable $start_date): self {
            $this->start_date = $start_date;
            return $this;
        }
        public function setEndDate(\DateTimeImmutable $end_date): self {
            $this->end_date = $end_date;
            return $this;
        }
    };
?>
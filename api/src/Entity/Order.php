<?php
    /* ----------------------------------------------------------------------------------------- */
    /* NAMESPACE */
    /* ----------------------------------------------------------------------------------------- */
    namespace App\Entity;
    /* ----------------------------------------------------------------------------------------- */
    /* DEFAULTS */
    /* ----------------------------------------------------------------------------------------- */
    use Doctrine\ORM\Mapping as ORM;
    use Doctrine\Common\Collections\ArrayCollection;
    use Doctrine\Common\Collections\Collection;
    /* ----------------------------------------------------------------------------------------- */
    /* REPOSITORIES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Repository\OrderRepository;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITY */
    /* ----------------------------------------------------------------------------------------- */
    /**
     * @ORM\Entity(repositoryClass=OrderRepository::class)
     * @ORM\Table(name="`order`")
     */
    class Order {
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
         * @ORM\Column(type="float")
         */
        private $fee;
        /**
         * @ORM\Column(type="float")
         */
        private $total;
        /**
         * @ORM\Column(type="boolean")
         */
        private $payment;
        /**
         * @ORM\Column(type="string", length=255)
         */
        private $state;
        /**
         * @ORM\ManyToOne(targetEntity=User::class, inversedBy="orders")
         * @ORM\JoinColumn(nullable=false)
         */
        private $user;
        /**
         * @ORM\Column(type="json")
         */
        private $items = [];
        /* ----------------------------------------------------------------------------------------- */
        /* CONSTRUCT */
        /* ----------------------------------------------------------------------------------------- */
        public function __construct() {
            $this->products = new ArrayCollection();
        }
        /* ----------------------------------------------------------------------------------------- */
        /* GETTERS */
        /* ----------------------------------------------------------------------------------------- */
        public function getId(): ?int {
            return $this->id;
        }
        public function getFee(): ?float {
            return $this->fee;
        }
        public function getTotal(): ?float {
            return $this->total;
        }
        public function getPayment(): ?bool {
            return $this->payment;
        }
        public function getState(): ?string {
            return $this->state;
        }
        public function getUser(): ?User {
            return $this->user;
        }
        public function getItems(): ?array {
            return $this->items;
        }
        /* ----------------------------------------------------------------------------------------- */
        /* SETTERS */
        /* ----------------------------------------------------------------------------------------- */
        public function setTotal(float $total): self {
            $this->total = $total;
            return $this;
        }
        public function setPayment(bool $payment): self {
            $this->payment = $payment;
            return $this;
        }
        public function setState(string $state): self {
            $this->state = $state;
            return $this;
        }
        public function setFee(float $fee): self {
            $this->fee = $fee;
            return $this;
        }
        public function setUser(?User $user): self {
            $this->user = $user;
            return $this;
        }
        public function setItems(array $items): self {
            $this->items = $items;
            return $this;
        }
    };
?>
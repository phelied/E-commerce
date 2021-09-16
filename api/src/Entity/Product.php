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
    use App\Repository\ProductRepository;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITY */
    /* ----------------------------------------------------------------------------------------- */
    /**
     * @ORM\Entity(repositoryClass=ProductRepository::class)
     */
    class Product {
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
        private $title;
        /**
         * @ORM\Column(type="string", length=255, nullable=true)
         */
        private $subtitle;
        /**
         * @ORM\Column(type="text")
         */
        private $pictures;
        /**
         * @ORM\Column(type="text")
         */
        private $description;
        /**
         * @ORM\Column(type="float")
         */
        private $price;
        /**
         * @ORM\Column(type="float", nullable=true)
         */
        private $weight;
        /**
         * @ORM\Column(type="integer")
         */
        private $quantity;
        /**
         * @ORM\Column(type="float", nullable=true)
         */
        private $stars;
        /**
         * @ORM\Column(type="boolean")
         */
        private $available;
        /**
         * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="products")
         * @ORM\JoinColumn(nullable=true)
         */
        private $category;
        /**
         * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="product", orphanRemoval=true)
         */
        private $comments;
        /**
         * @ORM\OneToOne(targetEntity=Discount::class, mappedBy="product", cascade={"persist", "remove"})
         */
        private $discount;
        /* ----------------------------------------------------------------------------------------- */
        /* CONSTRUCT */
        /* ----------------------------------------------------------------------------------------- */
        public function __construct() {
            $this->comments = new ArrayCollection();
            $this->orders = new ArrayCollection();
        }
        /* ----------------------------------------------------------------------------------------- */
        /* GETTERS */
        /* ----------------------------------------------------------------------------------------- */
        public function getId(): ?int {
            return $this->id;
        }
        public function getTitle(): ?string {
            return $this->title;
        }
        public function getSubtitle(): ?string {
            return $this->subtitle;
        }
        public function getPictures(): ?string {
            return $this->pictures;
        }
        public function getDescription(): ?string {
            return $this->description;
        }
        public function getPrice(): ?float {
            return $this->price;
        }
        public function getWeight(): ?float {
            return $this->weight;
        }
        public function getQuantity(): ?int {
            return $this->quantity;
        }
        public function getStars(): ?float {
            return $this->stars;
        }
        public function getAvailable(): ?bool {
            return $this->available;
        }
        public function getCategory(): ?Category {
            return $this->category;
        }
        /**
         * @return Collection|Comment[]
         */
        public function getComments(): Collection {
            return $this->comments;
        }
        public function getDiscount(): ?Discount {
            return $this->discount;
        }
        /* ----------------------------------------------------------------------------------------- */
        /* SETTERS */
        /* ----------------------------------------------------------------------------------------- */
        public function setTitle(string $title): self {
            $this->title = $title;
            return $this;
        }
        public function setSubtitle(?string $subtitle): self {
            $this->subtitle = $subtitle;
            return $this;
        }
        public function setPictures(string $pictures): self {
            $this->pictures = $pictures;
            return $this;
        }
        public function setDescription(string $description): self {
            $this->description = $description;
            return $this;
        }
        public function setPrice(float $price): self {
            $this->price = $price;
            return $this;
        }
        public function setWeight(?float $weight): self {
            $this->weight = $weight;
            return $this;
        }
        public function setQuantity(int $quantity): self {
            $this->quantity = $quantity;
            return $this;
        }
        public function setStars(?float $stars): self {
            $this->stars = $stars;
            return $this;
        }
        public function setAvailable(bool $available): self {
            $this->available = $available;
            return $this;
        }
        public function setCategory(?Category $category): self {
            $this->category = $category;
            return $this;
        }
        public function addComment(Comment $comment): self {
            if(!$this->comments->contains($comment)) {
                $this->comments[] = $comment;
                $comment->setProduct($this);
            };
            return $this;
        }
        public function removeComment(Comment $comment): self {
            if($this->comments->removeElement($comment)) {
                // set the owning side to null (unless already changed)
                if($comment->getProduct() === $this) {
                    $comment->setProduct(null);
                };
            };
            return $this;
        }
        public function setDiscount(?Discount $discount): self {
            // unset the owning side of the relation if necessary
            if($discount === null && $this->discount !== null) {
                $this->discount->setProduct(null);
            };
            // set the owning side of the relation if necessary
            if ($discount !== null && $discount->getProduct() !== $this) {
                $discount->setProduct($this);
            };
            $this->discount = $discount;
            return $this;
        }
    };
?>
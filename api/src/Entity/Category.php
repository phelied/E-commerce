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
    use App\Repository\CategoryRepository;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITY */
    /* ----------------------------------------------------------------------------------------- */
    /**
     * @ORM\Entity(repositoryClass=CategoryRepository::class)
     */
    class Category {
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
         * @ORM\Column(type="string", length=255, unique=true)
         */
        private $name;
        /**
         * @ORM\OneToMany(targetEntity=Product::class, mappedBy="category")
         */
        private $products;
        /**
         * @ORM\OneToOne(targetEntity=Discount::class, mappedBy="category", cascade={"persist", "remove"})
         */
        private $discount;
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
        /**
         * @return Collection|Product[]
         */
        public function getName(): ?string {
            return $this->name;
        }
        public function getProducts(): Collection {
            return $this->products;
        }
        public function getDiscount(): ?Discount {
            return $this->discount;
        }
        /* ----------------------------------------------------------------------------------------- */
        /* SETTERS */
        /* ----------------------------------------------------------------------------------------- */
        public function setName(string $name): self {
            $this->name = $name;
            return $this;
        }
        public function addProduct(Product $product): self {
            if(!$this->products->contains($product)) {
                $this->products[] = $product;
                $product->setCategory($this);
            };
            return $this;
        }
        public function removeProduct(Product $product): self {
            if($this->products->removeElement($product)) {
                // set the owning side to null (unless already changed)
                if($product->getCategory() === $this) {
                    $product->setCategory(null);
                };
            };
            return $this;
        }
        public function setDiscount(?Discount $discount): self {
            // unset the owning side of the relation if necessary
            if($discount === null && $this->discount !== null) {
                $this->discount->setCategory(null);
            };
            // set the owning side of the relation if necessary
            if($discount !== null && $discount->getCategory() !== $this) {
                $discount->setCategory($this);
            };
            $this->discount = $discount;
            return $this;
        }
    };
?>
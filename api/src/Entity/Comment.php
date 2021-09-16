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
    use App\Repository\CommentRepository;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITY */
    /* ----------------------------------------------------------------------------------------- */
    /**
     * @ORM\Entity(repositoryClass=CommentRepository::class)
     */
    class Comment {
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
         * @ORM\Column(type="text")
         */
        private $content;
        /**
         * @ORM\Column(type="datetime_immutable")
         */
        private $date;
        /**
         * @ORM\Column(type="float", nullable=true)
         */
        private $stars;
        /**
         * @ORM\ManyToOne(targetEntity=User::class, inversedBy="comments")
         */
        private $user;
        /**
         * @ORM\ManyToOne(targetEntity=Product::class, inversedBy="comments")
         * @ORM\JoinColumn(onDelete="CASCADE", nullable=false)
         */
        private $product;
        /* ----------------------------------------------------------------------------------------- */
        /* GETTERS */
        /* ----------------------------------------------------------------------------------------- */
        public function getId(): ?int {
            return $this->id;
        }
        public function getTitle(): ?string {
            return $this->title;
        }
        public function getContent(): ?string {
            return $this->content;
        }
        public function getDate(): ?\DateTimeImmutable {
            return $this->date;
        }
        public function getStars(): ?float {
            return $this->stars;
        }
        public function getUser(): ?User {
            return $this->user;
        }
        public function getProduct(): ?Product {
            return $this->product;
        }
        /* ----------------------------------------------------------------------------------------- */
        /* SETTERS */
        /* ----------------------------------------------------------------------------------------- */
        public function setTitle(string $title): self {
            $this->title = $title;
            return $this;
        }
        public function setContent(string $content): self {
            $this->content = $content;
            return $this;
        }
        public function setDate(\DateTimeImmutable $date): self {
            $this->date = $date;
            return $this;
        }
        public function setStars(?float $stars): self {
            $this->stars = $stars;
            return $this;
        }
        public function setUser(?User $user): self {
            $this->user = $user;
            return $this;
        }
        public function setProduct(?Product $product): self {
            $this->product = $product;
            return $this;
        }
    };
?>
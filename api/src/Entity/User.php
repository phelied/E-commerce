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
    use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
    use Symfony\Component\Security\Core\User\UserInterface;
    use DateTimeImmutable;
    /* ----------------------------------------------------------------------------------------- */
    /* REPOSITORIES */
    /* ----------------------------------------------------------------------------------------- */
    use App\Repository\UserRepository;
    /* ----------------------------------------------------------------------------------------- */
    /* ENTITY */
    /* ----------------------------------------------------------------------------------------- */
    /**
     * @ORM\Entity(repositoryClass=UserRepository::class)
     */
    class User implements UserInterface, PasswordAuthenticatedUserInterface {
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
        private $lastname;
        /**
         * @ORM\Column(type="string", length=255)
         */
        private $firstname;
        /**
         * @ORM\Column(type="string", length=255, unique=true)
         */
        private $email;
        /**
         * @var string The hashed password
         * @ORM\Column(type="string")
         */
        private $password;
        /**
         * @ORM\Column(type="string", length=255, unique=true)
         */
        private $phone;
        /**
         * @ORM\Column(type="datetime_immutable", nullable=true)
         */
        private $birthdate;
        /**
         * @ORM\Column(type="string", length=255, nullable=true)
         */
        private $picture;
        /**
         * @ORM\Column(type="string", length=255)
         */
        private $country;
        /**
         * @ORM\Column(type="string", length=255)
         */
        private $city;
        /**
         * @ORM\Column(type="string", length=255)
         */
        private $address;
        /**
         * @ORM\Column(type="string", length=255)
         */
        private $postal_code;
        /**
         * @ORM\Column(type="datetime_immutable", nullable=true)
         */
        private $email_verified_at;
        /**
         * @ORM\Column(type="string", length=255, nullable=true)
         */
        private $credit_card_number;
        /**
         * @ORM\Column(type="string", length=255, nullable=true)
         */
        private $credit_card_validity;
        /**
         * @ORM\Column(type="json")
         */
        private $roles = [];
        /**
         * @ORM\Column(type="boolean")
         */
        private $active;
        /**
         * @ORM\Column(type="string", length=255, unique=true, nullable=true)
         */
        private $token;
        /**
         * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="user")
         */
        private $comments;
        /**
         * @ORM\OneToMany(targetEntity=Order::class, mappedBy="user", orphanRemoval=true)
         */
        private $orders;
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
        public function getLastname(): ?string {
            return $this->lastname;
        }
        public function getFirstname(): ?string {
            return $this->firstname;
        }
        public function getEmail(): ?string {
            return $this->email;
        }
        public function getPassword(): ?string {
            return $this->password;
        }
        public function getPhone(): ?string {
            return $this->phone;
        }
        public function getBirthdate(): ?\DateTimeImmutable {
            return $this->birthdate;
        }
        public function getPicture(): ?string {
            return $this->picture;
        }
        public function getCountry(): ?string {
            return $this->country;
        }
        public function getCity(): ?string {
            return $this->city;
        }
        public function getAddress(): ?string {
            return $this->address;
        }
        public function getPostalCode(): ?string {
            return $this->postal_code;
        }
        public function getEmailVerifiedAt(): ?\DateTimeImmutable {
            return $this->email_verified_at;
        }
        public function getCreditCardNumber(): ?string {
            return $this->credit_card_number;
        }
        public function getCreditCardValidity(): ?string {
            return $this->credit_card_validity;
        }
        public function getRoles(): array {
            $roles = $this->roles;
            $roles[] = "ROLE_USER";
            return array_unique($roles);
        }
        public function getActive(): ?bool {
            return $this->active;
        }
        public function getToken(): ?string {
            return $this->token;
        }
        public function getUserIdentifier(): string {
            return (string) $this->email;
        }
        public function getSalt(): ?string {
            return null;
        }
        public function getUsername(): ?string {
            return null;
        }
        /**
         * @return Collection|Comment[]
         */
        public function getComments(): Collection {
            return $this->comments;
        }
        /**
         * @return Collection|Order[]
         */
        public function getOrders(): Collection {
            return $this->orders;
        }
        /* ----------------------------------------------------------------------------------------- */
        /* SETTERS */
        /* ----------------------------------------------------------------------------------------- */
        public function setLastname(string $lastname): self {
            $this->lastname = $lastname;
            return $this;
        }
        public function setFirstname(string $firstname): self {
            $this->firstname = $firstname;
            return $this;
        }
        public function setEmail(string $email): self {
            $this->email = $email;
            return $this;
        }
        public function setPassword(string $password): self {
            $this->password = $password;
            return $this;
        }
        public function setPhone(string $phone): self {
            $this->phone = $phone;
            return $this;
        }
        public function setBirthdate(?\DateTimeImmutable $birthdate): self {
            $this->birthdate = $birthdate;
            return $this;
        }
        public function setPicture(?string $picture): self {
            $this->picture = $picture;
            return $this;
        }
        public function setCountry(string $country): self {
            $this->country = $country;
            return $this;
        }
        public function setCity(string $city): self {
            $this->city = $city;
            return $this;
        }
        public function setAddress(string $address): self {
            $this->address = $address;
            return $this;
        }
        public function setPostalCode(string $postal_code): self {
            $this->postal_code = $postal_code;
            return $this;
        }
        public function setEmailVerifiedAt(?\DateTimeImmutable $email_verified_at): self {
            $this->email_verified_at = $email_verified_at;
            return $this;
        }
        public function setCreditCardNumber(?string $credit_card_number): self {
            $this->credit_card_number = $credit_card_number;
            return $this;
        }
        public function setCreditCardValidity(?string $credit_card_validity): self {
            $this->credit_card_validity = $credit_card_validity;
            return $this;
        }
        public function setRoles(array $roles): self {
            $this->roles = $roles;
            return $this;
        }
        public function setActive(bool $active): self {
            $this->active = $active;
            return $this;
        }
        public function setToken(?string $token): self {
            $this->token = $token;
            return $this;
        }
        public function eraseCredentials() {
            // If you store any temporary, sensitive data on the user, clear it here
            // $this->plainPassword = null;
        }
        public function addComment(Comment $comment): self {
            if(!$this->comments->contains($comment)) {
                $this->comments[] = $comment;
                $comment->setUser($this);
            };
            return $this;
        }
        public function removeComment(Comment $comment): self {
            if($this->comments->removeElement($comment)) {
                // set the owning side to null (unless already changed)
                if($comment->getUser() === $this) {
                    $comment->setUser(null);
                };
            };
            return $this;
        }
        public function addOrder(Order $order): self {
            if(!$this->orders->contains($order)) {
                $this->orders[] = $order;
                $order->setUser($this);
            };
            return $this;
        }
        public function removeOrder(Order $order): self {
            if($this->orders->removeElement($order)) {
                // set the owning side to null (unless already changed)
                if($order->getUser() === $this) {
                    $order->setUser(null);
                };
            };
            return $this;
        }
    };
?>
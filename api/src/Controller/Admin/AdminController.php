<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\User;
use App\Entity\Category;
use App\Entity\Comment;
use App\Entity\Delivery;
use App\Entity\Discount;
use App\Entity\Order;
use App\Entity\Product;

class AdminController extends AbstractDashboardController
{
    /**
     * @Route("/admin", name="admin")
     */
    public function index(): Response
    {
        return parent::index();
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Api');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linktoDashboard("Dashboard", "fa fa-home");
        yield MenuItem::linkToCrud("Utilisateurs", "fas fa-list", User::class);
        yield MenuItem::linkToCrud("Catégories", "fas fa-list", Category::class);
        yield MenuItem::linkToCrud("Avis", "fas fa-list", Comment::class);
        yield MenuItem::linkToCrud("Transporteurs", "fas fa-list", Delivery::class);
        yield MenuItem::linkToCrud("Promotions", "fas fa-list", Discount::class);
        yield MenuItem::linkToCrud("Commandes", "fas fa-list", Order::class);
        yield MenuItem::linkToCrud("Produits", "fas fa-list", Product::class);
    }
}
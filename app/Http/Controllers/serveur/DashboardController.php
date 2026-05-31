<?php

namespace App\Http\Controllers\serveur;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use App\Models\Plat;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Affiche le dashboard avec toutes les catégories et tous les plats
     */
    public function index()
    {
        $categories = Categorie::all();
        $plats = Plat::with('categorie')->get();

        return Inertia::render('Dashboard', [
            'categories' => $categories,
            'plats'      => $plats,
            'commande'   => session('commande'),
        ]);
    }

    /**
     * Affiche les plats d'une catégorie spécifique dans le dashboard
     */
    public function show(Categorie $categorie)
    {
        $categories = Categorie::all();
        $plats = Plat::where('categorie_id', $categorie->id)->get();

        return Inertia::render('Dashboard', [
            'categories'        => $categories,
            'plats'             => $plats,
            'categorieActive'   => $categorie,
            'commande'          => session('commande'),
        ]);
    }
}
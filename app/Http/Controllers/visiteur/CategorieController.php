<?php

namespace App\Http\Controllers\visiteur;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Inertia\Inertia;

class CategorieController extends Controller
{
    /**
     * Affiche la vue Menu avec toutes les catégories
     */
    public function index()
    {
        $categories = Categorie::withCount('plats')->get();

        return Inertia::render('Menu', [
            'categories' => $categories,
        ]);
    }

    /**
     * Affiche les plats d'une catégorie donnée
     */
    public function plats(Categorie $categorie)
    {
        $categorie->load([
            'plats' => function ($query) {
                $query->with('composants')
                      ->withCount('commandes');
            }
        ]);

        return Inertia::render('Plats', [
            'categorie' => $categorie,
        ]);
    }
}
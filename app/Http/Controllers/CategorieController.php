<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;
class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categorie::with('plats')->get();

        return Inertia::render('visiteur/Menu', [
            'categories' => $categories,
        ]);
    }

    public function plats(Categorie $categorie){
        $plats = $categorie->plats;
        $comandes = $plats->flatMap->commandes;
        return Inertia::render('visiteur/Plats', [
            'plats' => $plats,
            'categorie' => $categorie,
            'commandes' => $comandes
        ]);
    }
}

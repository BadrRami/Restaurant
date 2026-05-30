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
        $categories = Categorie::all();
        return Inertia('visiteur/Menu', [
            'categories' => $categories
        ]);
    }

    public function plats(Categorie $categorie){
        $plats = $categorie->plats;
        return Inertia('Categories/Plats', [
            'plats' => $plats,
            'categorie' => $categorie
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorie;
class DashboardController extends Controller
{
    public function index(){
        $user = auth()->user();
        $categories = Categorie::all();
        return inertia("Dashboard", [
            "user" => $user,
            "categories" => $categories
        ]);
    }
    public function show(Categorie $categorie)
    {
        $user = auth()->user();
        $categories = Categorie::all();
        $plats = $categorie->plats;

        return inertia('Dashboard', [
            'user' => $user,
            'categories' => $categories,
            'plats' => $plats,
        ]);
    }
}

<?php

use App\Http\Controllers\visiteur\CategorieController;
use App\Http\Controllers\serveur\DashboardController;
use App\Http\Controllers\serveur\CommandeController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Routes Visiteurs (pas d'authentification requise)
|--------------------------------------------------------------------------
*/

Route::get('/menu', [CategorieController::class, 'index'])->name('menu');
Route::get('/plats/{categorie}', [CategorieController::class, 'plats'])->name('plats_categorie');

/*
|--------------------------------------------------------------------------
| Routes Serveur (protégées par middleware auth)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/categorie/{categorie}', [DashboardController::class, 'show'])->name('dashboard.categorie.show');

    // Commandes CRUD (resource)
    Route::resource('seveur/commande', CommandeController::class)->names('serveur.commande');

    // Routes supplémentaires pour CommandeController
    Route::get('/serveur/commande/creer', [CommandeController::class, 'creer'])
        ->name('serveur.commande.creer');

    Route::get('/serveur/commande/terminer/{commande?}', [CommandeController::class, 'terminer'])
        ->name('commande.terminer');

    Route::post('/serveur/plat/add', [CommandeController::class, 'add_plat'])
        ->name('serveur.commande.add_plat');

    Route::get('/serveur/commande/{commande}/{etat}', [CommandeController::class, 'changerEtat'])
        ->name('serveur.commande.changer_etat');
});
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');
 
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});
 
// Déconnexion (accessible aux utilisateurs connectés)
Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

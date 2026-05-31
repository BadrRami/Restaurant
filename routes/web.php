<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\Login;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CommandesController;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });
Route::get('/menu', [CategorieController::class, 'index'])->name('menu');
Route::get('/plats/{categorie}', [CategorieController::class, 'plats'])->name('menu.categorie');
Route::get('/login', [Login::class, 'index'])->name('login');
Route::post('/login', [Login::class, 'authenticate'])->name('login.authenticate');
Route::post('/logout', [Login::class, 'logout'])->name('logout');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/dashboard/{categorie}', [DashboardController::class, 'show'])->name('dashboard.categorie');

Route::post('/serveur/commande', [CommandesController::class, 'creer'])->name('serveur.commande.creer');
Route::post('/serveur/plat/add', [CommandesController::class, 'add_plat'])->name('serveur.commande.add_plat');
Route::get('serveur/commande/terminer/{commande} ', [CommandesController::class, 'terminer'])->name('serveur.commande.terminer');
// require __DIR__.'/auth.php';

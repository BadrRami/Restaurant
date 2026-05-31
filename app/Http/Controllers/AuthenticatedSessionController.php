<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Affiche la page de login
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Authentifie l'utilisateur et redirige selon son rôle
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = Auth::user();

        // Redirection selon le rôle
        if ($user->role === 'admin') {
            return redirect()->intended(route('admin.dashboard'));
        }

        // Serveur (ou tout autre rôle authentifié)
        return redirect()->intended(route('dashboard'));
    }

    /**
     * Déconnecte l'utilisateur et vide la session
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Supprimer la commande en session avant déconnexion
        $request->session()->forget('commande');

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
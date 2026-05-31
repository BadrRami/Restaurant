<?php

namespace App\Http\Controllers\serveur;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\Plat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CommandeController extends Controller
{
    /**
     * Affiche la liste des commandes du serveur connecté (triées par date DESC)
     */
    public function index()
    {
        $serveur = Auth::user()->serveur;

        $commandes = Commande::where('serveur_id', $serveur->id)
            ->with([
                'plats' => function ($q) {
                    $q->select('plats.id', 'plats.intitulé')
                      ->withPivot('nombre');
                }
            ])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($commande) {
                return [
                    'id'         => $commande->id,
                    'etat'       => $commande->etat,
                    'total'      => $commande->total(),
                    'plats'      => $commande->plats->map(fn($p) => [
                        'intitulé' => $p->intitulé,
                        'nombre'   => $p->pivot->nombre,
                    ]),
                    'created_at' => $commande->created_at,
                ];
            });

        return Inertia::render('serveur/commande/Index', [
            'commandes' => $commandes,
            'commande'  => session('commande'),
        ]);
    }

    /**
     * Crée une nouvelle commande "en cours" et la stocke en session
     */
    public function creer()
    {
        $serveur = Auth::user()->serveur;

        $commande = Commande::create([
            'serveur_id' => auth()->id(),
            'etat'       => 'en cours',
            'paye'       => false,
        ]);

        Session::put('commande', $commande);

        return redirect()->route('dashboard');
    }

    /**
     * Ajoute un plat à la commande en session
     */
    public function add_plat(Request $request)
{
    $commandeId = session('commande_id');

    if (!$commandeId) {
        return response()->json(['message' => 'Aucune commande en cours'], 400);
    }

    $commande = Commande::find($commandeId);

    if (!$commande) {
        return response()->json(['message' => 'Commande introuvable'], 404);
    }

    $existe = $commande->plats()
        ->where('plat_id', $request->plat_id)
        ->exists();

    if (!$existe) {
        $commande->plats()->attach($request->plat_id, [
            'nombre' => $request->nombre
        ]);
    } else {
        $commande->plats()->updateExistingPivot(
            $request->plat_id,
            ['nombre' => $request->nombre]
        );
    }

    return response()->json(['message' => 'OK']);
}

    /**
     * Termine la commande : supprime si vide, sinon change l'état à "terminé"
     */
    public function terminer(Commande $commande = null)
    {
        if ($commande == null && Session::has('commande')) {
            $commande = Session::get('commande');
            Session::forget('commande');
        }

        if (!$commande) {
            return redirect()->route('dashboard');
        }

        // Recharger depuis la BDD
        $commande = Commande::find($commande->id);

        if ($commande->plats()->count() === 0) {
            $commande->delete();
        } else {
            $commande->update(['etat' => 'terminé']);
        }

        return redirect()->route('dashboard');
    }

    /**
     * Affiche le formulaire d'édition de la commande en session
     */
    public function edit(Commande $commande)
    {
        $commande->load(['plats' => function ($q) {
            $q->withPivot('nombre');
        }]);

        return Inertia::render('serveur/commande/Edit', [
            'commande' => [
                'id'    => $commande->id,
                'etat'  => $commande->etat,
                'total' => $commande->total(),
                'plats' => $commande->plats->map(fn($p) => [
                    'id'       => $p->id,
                    'intitulé' => $p->intitulé,
                    'prix'     => $p->prix,
                    'nombre'   => $p->pivot->nombre,
                ]),
            ],
            'commandeSession' => session('commande'),
        ]);
    }

    /**
     * Met à jour la commande : suppression de plats ou mise à jour des quantités
     */
    public function update(Request $request, Commande $commande)
    {
        $action = $request->input('action'); // 'supprimer' ou 'mettre_a_jour'

        if ($action === 'supprimer') {
            $platsASupprimer = $request->input('plats_a_supprimer', []);
            if (!empty($platsASupprimer)) {
                $commande->plats()->detach($platsASupprimer);
            }
        } elseif ($action === 'mettre_a_jour') {
            $quantites = $request->input('quantites', []); // [plat_id => nombre]
            foreach ($quantites as $platId => $nombre) {
                $commande->plats()->updateExistingPivot($platId, ['nombre' => max(1, (int)$nombre)]);
            }
        }

        // Mettre à jour la session
        if (Session::has('commande')) {
            $sessionCommande = Session::get('commande');
            if ($sessionCommande->id === $commande->id) {
                Session::put('commande', $commande->fresh());
            }
        }

        return redirect()->route('serveur.commande.edit', $commande->id);
    }

    /**
     * Change l'état d'une commande (servi / emporté)
     */
    public function changerEtat(Commande $commande, string $etat)
    {
        $etatsValides = ['en_cours', 'terminé', 'servi', 'emporté'];

        if (in_array($etat, $etatsValides)) {
            $commande->update(['etat' => $etat]);
        }

        return redirect()->route('serveur.commande.index');
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\commandes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Commande;
use Inertia\Inertia;
use App\Models\Plat;
class CommandesController extends Controller
{
    public function index(){
        $commandes = Commande::with('plats')->get();
        return inertia("Index", [
            "commandes" => $commandes
        ]);
    }
    public function creer()
    {
        $nouvelleCommande = [
            'user_id' => auth()->id(),
            'etat' => 'en cours',
            'paye' => false,
        ];

        session()->put('commande', $nouvelleCommande);

        return back();
    }
    public function add_plat(Request $request)
    {
        $commande = session('commande');

        if (!$commande) {
            return response()->json(['message' => 'Aucune commande en cours'], 400);
        }

        if (!isset($commande['plats'])) {
            $commande['plats'] = [];
        }

        $platId = $request->input('plat_id');
        $nombre = $request->input('nombre', 1);

        // vérifier si plat existe déjà
        foreach ($commande['plats'] as &$plat) {
            if ($plat['plat_id'] == $platId) {
                $plat['nombre'] += $nombre;
                session()->put('commande', $commande);
                return back();
            }
        }

        // sinon ajouter nouveau plat
        $commande['plats'][] = [
            'plat_id' => $platId,
            'nombre' => $nombre
        ];

        session()->put('commande', $commande);

        return back();
    }
    public function terminer (commandes $commande=null){
        if($commande == null && session()->has('commande')){
            $commande = session()->get('commande');
            session()->forget("commande");
        }elseif ($commande) {
            if (empty($commande->plats) || count($commande->plats) == 0) {
                $commande->delete();
            } else {
                $commande->etat = "terminé";
                $commande->save();
            }
         }
        return back();
    }
    public function show()
{
    $commande = session()->get('commande');

    if (!$commande || empty($commande['plats'])) {
        return inertia("Edit", [
            "commande" => $commande,
            "plats" => [],
            "total" => 0
        ]);
    }

    $ids = collect($commande['plats'])->pluck('plat_id');

    $plats = Plat::whereIn('id', $ids)->get();

    $total = 0;

    foreach ($commande['plats'] as $item) {
        $plat = $plats->firstWhere('id', $item['plat_id']);
        if ($plat) {
            $total += $plat->prix * $item['nombre'];
        }
    }

    return inertia("Edit", [
        "commande" => $commande,
        "plats" => $plats,
        "total" => $total
    ]);
}

public function update_plats(Request $request)
{
    $commande = session('commande');

    if (!$commande || empty($commande['plats'])) {
        return back();
    }

    $quantites = $request->input('quantites', []);

    foreach ($commande['plats'] as &$item) {
        if (isset($quantites[$item['plat_id']])) {
            $item['nombre'] = $quantites[$item['plat_id']];
        }
    }

    session()->put('commande', $commande);

    return back();
}


public function delete_plats(Request $request)
{
    $commande = session('commande');

    if (!$commande || empty($commande['plats'])) {
        return back();
    }

    $ids = $request->input('ids', []);

    $commande['plats'] = array_filter($commande['plats'], function ($item) use ($ids) {
        return !in_array($item['plat_id'], $ids);
    });

    session()->put('commande', $commande);

    return back();
}
}

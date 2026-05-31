<?php

namespace App\Http\Controllers;

use App\Models\commandes;
use Illuminate\Http\Request;

class CommandesController extends Controller
{
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
    public function terminer (Commande $commande=null){
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
}

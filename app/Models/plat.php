<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plat extends Model
{
      public function categorie(){
        return $this->belongsTo(Categorie::class);
    }

      public function composants(){
        return $this->belongsToMany(Composant::class )
        ->withPivot("quantite", "unite");
    }

      public function commandes(){
        return $this->belongsToMany(Commande::class)
        ->withPivot("nombre");
    }
    public function getCompositions(){
      return implode(", ", $this->composants->pluck("libelle")->toArray());
    }
    public function getNombreCommandes(){
      return $this->commandes->sum(function($commande){
        return $commande->pivot->nombre;
      });
    }
}

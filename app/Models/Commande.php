<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{

   public function plats(){
        return $this->belongsToMany(Plat::class )
        ->withPivot("nombre");
    }

    public function serveur(){
        return $this->belongsTo(Serveur::class );
    }

    protected  function montantTotal ():Attribute{
        return Attribute::make(
            get:function(){
                return $this->plats->sum(function($plt){
                            return $plt->prix * $plt->pivot->nombre;
                    }     
            );
            }
        );
    
    } //montant_total
}

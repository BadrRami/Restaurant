<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = ['serveur_id', 'etat', 'payé'];

    /**
     * Relation : une commande appartient à un serveur
     */
    public function serveur()
    {
        return $this->belongsTo(Serveur::class);
    }

    /**
     * Relation : une commande contient plusieurs plats (many-to-many)
     */
    public function plats()
    {
        return $this->belongsToMany(Plat::class, 'commande_plat', 'commande_id', 'plat_id')
                    ->withPivot('nombre');
    }

    /**
     * Calcule le total à payer pour cette commande
     */
    public function total(): float
    {
        return $this->plats->sum(function ($plat) {
            return $plat->prix * $plat->pivot->nombre;
        });
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Serveur extends Model
{
    protected $guarded = [];
  public function user(){
        return $this->belongsTo(User::class);
    }
    public function commandes(){
        return $this->hasMany(Commande::class );
    }
}

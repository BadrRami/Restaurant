<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('composant_plat', function (Blueprint $table) {
            $table->id();
               $table->foreignId('composant_id')->constrained()->onDelete('cascade');
            $table->foreignId('plat_id')->constrained()->onDelete('cascade');
            $table->integer('quantite');
            $table->string('unite', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_composant_plat');
    }
};

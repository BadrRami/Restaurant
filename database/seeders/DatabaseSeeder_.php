<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Serveur;
use App\Models\Categorie;
use App\Models\Plat;
use App\Models\Composant;
use App\Models\Commande;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Créer un admin
        User::create([
            'name' => 'Admin',
            'role' => 'admin',
            'email' => 'admin@restaurant.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Créer des serveurs avec leurs utilisateurs
        $serveurs = [
            ['name' => 'Ahmed', 'email' => 'ahmed@restaurant.com'],
            ['name' => 'Fatima', 'email' => 'fatima@restaurant.com'],
            ['name' => 'Karim', 'email' => 'karim@restaurant.com'],
            ['name' => 'Sara', 'email' => 'sara@restaurant.com'],
        ];

        foreach ($serveurs as $serveurData) {
            $user = User::create([
                'name' => $serveurData['name'],
                'role' => 'serveur',
                'email' => $serveurData['email'],
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]);
            
            Serveur::create([
                'user_id' => $user->id,
                'date_embauche' => now()->subMonths(rand(1, 36)),
            ]);
        }

        // Créer des catégories
        $categories = [
            ['titre' => 'Entrées'],
            ['titre' => 'Plats Principaux'],
            ['titre' => 'Desserts'],
            ['titre' => 'Boissons'],
            ['titre' => 'Salades'],
            ['titre' => 'Pizzas'],
        ];

        foreach ($categories as $catData) {
            Categorie::create($catData);
        }

        // Créer des plats
        $platsData = [
            ['categorie' => 'Entrées', 'intitule' => 'Harira', 'description' => 'Soupe traditionnelle marocaine', 'prix' => 25],
            ['categorie' => 'Entrées', 'intitule' => 'Briouates', 'description' => 'Feuilletés au fromage', 'prix' => 30],
            ['categorie' => 'Plats Principaux', 'intitule' => 'Tajine', 'description' => 'Tajine de poulet aux olives', 'prix' => 85],
            ['categorie' => 'Plats Principaux', 'intitule' => 'Couscous', 'description' => 'Couscous traditionnel', 'prix' => 90],
            ['categorie' => 'Plats Principaux', 'intitule' => 'Pastilla', 'description' => 'Pastilla au poulet', 'prix' => 95],
            ['categorie' => 'Pizzas', 'intitule' => 'Pizza Margherita', 'description' => 'Sauce tomate, mozzarella', 'prix' => 65],
            ['categorie' => 'Pizzas', 'intitule' => 'Pizza 4 Fromages', 'description' => '4 fromages fondants', 'prix' => 75],
            ['categorie' => 'Salades', 'intitule' => 'Salade Marocaine', 'description' => 'Tomates, oignons, concombre', 'prix' => 35],
            ['categorie' => 'Salades', 'intitule' => 'Salade César', 'description' => 'Poulet, parmesan, croûtons', 'prix' => 55],
            ['categorie' => 'Desserts', 'intitule' => 'Tiramisu', 'description' => 'Dessert italien', 'prix' => 40],
            ['categorie' => 'Desserts', 'intitule' => 'Corne de Gazelle', 'description' => 'Pâtisserie marocaine', 'prix' => 25],
            ['categorie' => 'Boissons', 'intitule' => 'Jus d\'orange', 'description' => 'Jus frais', 'prix' => 20],
            ['categorie' => 'Boissons', 'intitule' => 'Café', 'description' => 'Café expresso', 'prix' => 15],
            ['categorie' => 'Boissons', 'intitule' => 'Thé à la menthe', 'description' => 'Thé marocain', 'prix' => 18],
        ];

        foreach ($platsData as $platData) {
            $categorie = Categorie::where('titre', $platData['categorie'])->first();
            Plat::create([
                'categorie_id' => $categorie->id,
                'intitule' => $platData['intitule'],
                'description' => $platData['description'],
                'prix' => $platData['prix'],
            ]);
        }

        // Créer des composants
        $composantsData = ['Viande', 'Poulet', 'Fromage', 'Tomates', 'Oignons', 'Ail', 'Huile d\'olive', 'Farine', 'Œufs', 'Sucre', 'Lait'];
        foreach ($composantsData as $composant) {
            Composant::create(['libelle' => $composant]);
        }

        // Associer les composants aux plats
        $plats = Plat::all();
        $composants = Composant::all();
        
        foreach ($plats as $plat) {
            $nbComposants = rand(2, 5);
            $composantsAssocies = $composants->random($nbComposants);
            
            foreach ($composantsAssocies as $composant) {
                $plat->composants()->attach($composant->id, [
                    'quantite' => rand(1, 10),
                    'unite' => rand(1, 3) == 1 ? 'Kg' : (rand(1, 2) == 1 ? 'g' : 'ml'),
                ]);
            }
        }

        // Créer des commandes
        $serveursList = Serveur::all();
        $platsList = Plat::all();
        
        for ($i = 1; $i <= 50; $i++) {
            $commande = Commande::create([
                'serveur_id' => $serveursList->random()->id,
                'numero_table' => rand(1, 10),
                'etat' => $this->getRandomEtat(),
                'paye' => rand(0, 1),
                'created_at' => now()->subDays(rand(0, 30)),
            ]);
            
            // Ajouter des plats à la commande
            $nbPlats = rand(1, 8);
            $platsCommande = $platsList->random($nbPlats);
            
            foreach ($platsCommande as $plat) {
                $commande->plats()->attach($plat->id, [
                    'nombre' => rand(1, 3),
                ]);
            }
        }
    }

    private function getRandomEtat()
    {
        $rand = rand(1, 10);
        if ($rand <= 4) return 'en cours';
        if ($rand <= 6) return 'terminé';
        if ($rand <= 8) return 'servi';
        return 'emporté';
    }
}
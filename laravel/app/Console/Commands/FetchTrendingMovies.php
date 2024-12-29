<?php
// app/Console/Commands/FetchTrendingMovies.php

namespace App\Console\Commands;

use App\Models\Film;
use Illuminate\Console\Command;
use App\Services\TMDbService; // Votre service pour interagir avec l'API TMDb

class FetchTrendingMovies extends Command
{
    // Définir le nom et la description de la commande
    protected $signature = 'fetch:trending-movies';
    protected $description = 'Fetch trending movies from TMDb API and store them in the database';

    // Déclarer la variable pour stocker le service injecté
    protected $tmdbService;

    /**
     * Créer une nouvelle instance de la commande.
     *
     * @param TMDbService $tmdbService
     * @return void
     */
    public function __construct(TMDbService $tmdbService)
    {
        // Appeler le constructeur parent
        parent::__construct();

        // Injecter le service TMDbService dans la commande
        $this->tmdbService = $tmdbService;
    }

    /**
     * Exécuter la commande.
     *
     * @return void
     */
    public function handle()
    {
        // Utiliser le service pour récupérer les films tendance
        $films = $this->tmdbService->getTrendingMovies();

        // Insérer ou mettre à jour les films dans la base de données
        // dd($films);
        // Film::first()->delete();
        foreach($films as $film) {
            // Utiliser updateOrCreate pour mettre à jour ou créer un film
            Film::updateOrCreate(
                ['film_id' => $film['id']], // Identifiant unique pour vérifier l'existence du film
                [
                    'name' => $film['name'] ?? '',
                    'title' => $film['title'] ?? '',
                    'overview' => $film['overview'] ?? '',
                    'poster_path' => $film['poster_path'] ?? '',
                    'release_date' => $film['release_date'] ?? null,
                    'popularity' => $film['popularity'] ?? null,
                    'vote_average' => $film['vote_average'] ?? null,
                    'vote_count' => $film['vote_count'] ?? null,
                    'media_type' => $film['media_type'] ?? '',
                    'original_language' => $film['original_language'] ?? null,
                ]
            );
        }

        // Afficher un message indiquant que le processus a réussi
        $this->info('Les films tendance ont été créés et mis à jour avec succès !');
    }
}

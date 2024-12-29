<?php
// app/Services/TMDbService.php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TMDbService
{


    public function getTrendingMovies()
    {
        $url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
        $token = env('TMDB_API_KEY');

        // Faire la requête GET avec l'authentification Bearer et obtenir la réponse
        $response = Http::withHeaders([
            'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjJkNjNjZGRjMDY2ZDk5ZWQzZTgwNmQzMjY3MThjYSIsInN1YiI6IjYyNGVhNTRhYjc2Y2JiMDA2ODIzODc4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zuuBq1c63XpADl8SQ_c62hezeus7VibE1w5Da5UdYyo',
            'accept' => 'application/json',
        ])->get($url);

        if ($response->successful()) {
            return $response->json()['results'];
        }

        return [];
    }
}

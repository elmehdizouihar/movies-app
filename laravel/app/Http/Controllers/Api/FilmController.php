<?php

namespace App\Http\Controllers\Api;

use App\Models\Film;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateFilm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FilmController extends Controller
{
        // Liste des films avec pagination et recherche
        public function index(Request $request)
        {
            // Récupérer le terme de recherche depuis la requête
            $searchTerm = $request->get('search', '');  // 'search' est le nom du paramètre envoyé par le frontend

            // Récupérer le paramètre 'page' depuis la requête, ou utiliser 1 par défaut
            $page = $request->get('page', 1);

            // Effectuer la recherche et la pagination
            $films = Film::query()
                ->when($searchTerm, function ($query, $searchTerm) {
                    return $query->where('name', 'like', '%' . $searchTerm . '%')
                                ->orWhere('title', 'like', '%' . $searchTerm . '%');
                })
                ->paginate(15, ['*'], 'page', $page);  // Pagination avec 10 films par page et le paramètre 'page'

            // Retourner la réponse en format JSON
            return response()->json($films);
        }

        public function fil(Request $request)
        {
            $query = Film::query();
    
            if ($request->has('search')) {
                $query->where('title', 'like', '%' . $request->search . '%');
            }
    
            return response()->json($query->paginate(10));  // Pagination avec 10 films par page
        }
    
        // Détails d'un filme
        public function show($id)
        {
            $film = Film::findOrFail($id);
            return response()->json($film);
        }

}

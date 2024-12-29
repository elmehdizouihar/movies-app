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

        //Update un filme
        public function update(UpdateFilm $request, $id)
        {
            try {
                // Récupérer les données validées
                $validatedData = $request->validated();
                // Essaye de récupérer le film avec l'ID donné
                $filme = Film::findOrFail($id);
                // dd($request);
                // Mise à jour des champs
                $filme->name = $request->name;
                $filme->title = $request->title;
                $filme->overview = $request->overview;
                $filme->release_date = $request->release_date;
                $filme->media_type = $request->media_type;
                $filme->original_language = $request->original_language;
                $filme->popularity = $request->popularity;
                $filme->vote_average = $request->vote_average;
                $filme->vote_count = $request->vote_count;
                $filme->save();
        
                // Retourne la réponse JSON en cas de succès
                return response()->json([
                    'success' => true,
                    'message' => "Le film a été mis à jour avec succès",
                    'filme' => $filme
                ], 200);
        
            } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
                // Gère le cas où l'ID ne correspond à aucun film
                return response()->json([
                    'success' => false,
                    'message' => "Film introuvable avec l'ID spécifié"
                ], 404);
        
            } catch (\Exception $e) {
                // Gère d'autres erreurs potentielles
                return response()->json([
                    'success' => false,
                    'message' => "Une erreur s'est produite lors de la mise à jour du film",
                    'error' => $e->getMessage()
                ], 500);
            }
        }

        // Edit un film
        public function edit($id)
        {
            $film = Film::findOrFail($id);
            return response()->json($film);
        }

}

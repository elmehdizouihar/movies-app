import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Remplacer useHistory par useNavigate


const FilmDetails = () => {
  const [film, setFilm] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // Remplacer useHistory par useNavigate

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate("/");
    }
    const fetchFilm = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/films/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
        });
        setFilm(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du film', error);
      }
    };

    fetchFilm();
  }, [id]);

  if (!film) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          {/* Titre du film */}
          <h1 className="card-title">{film.name ? film.name : film.title}</h1>

          {/* Affichage de l'aperçu (overview) */}
          <p className="card-text">
            <strong>Aperçu :</strong> {film.overview ? film.overview : "Aucune description disponible."}
          </p>

          {/* Détails du film */}
          <div className="row">
            <div className="col-md-6">
              {/* Date de sortie */}
              <div className="mb-3">
                <strong>Date de sortie :</strong> {film.release_date}
              </div>
              {/* Type de média */}
              <div className="mb-3">
                <strong>Type de média :</strong> {film.media_type}
              </div>
              {/* Langue originale */}
              <div className="mb-3">
                <strong>Langue originale :</strong> {film.original_language}
              </div>
            </div>

            <div className="col-md-6">
              {/* Popularité */}
              <div className="mb-3">
                <strong>Popularité :</strong> {film.popularity}
              </div>
              {/* Note moyenne */}
              <div className="mb-3">
                <strong>Note moyenne :</strong> {film.vote_average}
              </div>
              {/* Nombre de votes */}
              <div className="mb-3">
                <strong>Nombre de votes :</strong> {film.vote_count}
              </div>
            </div>
          </div>

          {/* Affichage du lien vers l'image */}
          <div className="mt-3">
            {film.poster_path && (
              <p>
                <a href={`https://image.tmdb.org/t/p/w500${film.poster_path}`} target="_blank" rel="noopener noreferrer">
                  Cliquez ici pour voir l'image
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;

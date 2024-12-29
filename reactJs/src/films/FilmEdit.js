import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditFilm = () => {
  const { id } = useParams(); // Récupère l'id du film à partir de l'URL
  const [film, setFilm] = useState({
    name: '',
    title: '',
    overview: '',
    release_date: '',
    media_type: 'movie',
    original_language: 'en',
    popularity: '',
    vote_average: '',
    vote_count: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fonction pour récupérer les données du film
  const fetchFilm = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/films/${id}/edit`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      // Convertir la virgule en point pour 'vote_average' si nécessaire
      const fetchedFilm = response.data;
      if (fetchedFilm.vote_average) {
        fetchedFilm.vote_average = fetchedFilm.vote_average.toString().replace(',', '.');
      }

      // Mettre à jour l'état avec les données récupérées du backend
      setFilm(fetchedFilm);
    } catch (error) {
      console.error('Erreur lors de la récupération du film:', error);
    } finally {
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour récupérer le film lors du chargement du composant
  useEffect(() => {
    fetchFilm();
  }, [id]);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value)
    console.log(name)
    // Si le champ est 'vote_average', remplacer la virgule par un point
    let newValue = value;
    if (name === 'vote_average') {
      newValue = value.replace(',', '.');  // Remplacer la virgule par un point
    }

    setFilm((prevFilm) => ({
      ...prevFilm,
      [name]: newValue,
    }));
  };

  // Validation du formulaire
  const validateForm = () => {
    const errors = {};
    if (!film.title) {
      errors.title = "Le titre est obligatoire";
    }
    if (film.popularity < 0) {
      errors.popularity = "La popularité doit être supérieure ou égale à 0";
    }
    if (film.vote_average !== '') {
      const voteAverage = parseFloat(film.vote_average);
      if (isNaN(voteAverage) || voteAverage < 0 || voteAverage > 10 || !Number.isFinite(voteAverage)) {
        errors.vote_average = "La note moyenne doit être entre 0 et 10";
      }
    }
    if (film.vote_count < 0) {
      errors.vote_count = "Le nombre de votes doit être supérieur ou égal à 0";
    }
    return errors;
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    try {
      // Récupérer le cookie CSRF avant d'envoyer la requête PUT
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

      // Envoyer les données au backend (requête PUT pour mettre à jour le film)
      const response = await axios.put(`http://localhost:8000/api/films/${id}`, film, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        withCredentials: true,  // Permet d'envoyer les cookies avec la requête
      });

      // Vérifier si la réponse du backend contient 'success' === true
      if (response.data.success) {
        // Si la mise à jour a réussi, rediriger vers la liste des films
        navigate('/films');
      } else {
        // Gérer le cas où 'success' est false ou la mise à jour échoue
        console.error('Échec de la mise à jour du film:', response.data.message);
        setLoading(false);
      }

    } catch (error) {
      // Gérer les erreurs générales (erreurs réseau, erreurs de serveur, etc.)
      console.error('Erreur lors de l\'envoi des données:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {/* Panel / Card pour le titre */}
      <div className="card">
        <div className="card-header bg-light">
          <h2>Modifier les informations du film</h2>
        </div>
        <div className="card-body">
          {loading && <p className="text-center">Chargement...</p>}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={film.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nom du film"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="title" className="form-label">Titre</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={film.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                {errors.title && <div className="text-danger">{errors.title}</div>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="release_date" className="form-label">Date de sortie</label>
                <input
                  type="date"
                  id="release_date"
                  name="release_date"
                  value={film.release_date}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="media_type" className="form-label">Type de média</label>
                <select
                  id="media_type"
                  name="media_type"
                  value={film.media_type}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="movie">Tv</option>
                  <option value="tv">Movie</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="original_language" className="form-label">Langue originale</label>
                <select
                  id="original_language"
                  name="original_language"
                  value={film.original_language}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="en">en</option>
                  <option value="ko">ko</option>
                  <option value="es">es</option>
                  <option value="zh">zh</option>
                  <option value="ja">ja</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="popularity" className="form-label">Popularité</label>
                <input
                  type="number"
                  id="popularity"
                  name="popularity"
                  value={film.popularity}
                  onChange={handleChange}
                  className="form-control"
                  min="0"
                />
                {errors.popularity && <div className="text-danger">{errors.popularity}</div>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="vote_average" className="form-label">Note moyenne</label>
                <input
                  type="text"
                  id="vote_average"
                  name="vote_average"
                  value={film.vote_average ? film.vote_average.toString().replace(',', '.') : ''}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.vote_average && <div className="text-danger">{errors.vote_average}</div>}
              </div>

              <div className="col-md-6">
                <label htmlFor="vote_count" className="form-label">Nombre de votes</label>
                <input
                  type="number"
                  id="vote_count"
                  name="vote_count"
                  value={film.vote_count}
                  onChange={handleChange}
                  className="form-control"
                  min="0"
                />
                {errors.vote_count && <div className="text-danger">{errors.vote_count}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="overview" className="form-label">Description</label>
              <textarea
                id="overview"
                name="overview"
                value={film.overview}
                onChange={handleChange}
                className="form-control"
                rows="4"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {loading ? 'Mise à jour...' : 'Mettre à jour le film'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFilm;

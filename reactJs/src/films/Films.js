import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Films = () => {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const navigate = useNavigate();

  useEffect((e) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate("/");  // Rediriger si l'utilisateur n'est pas authentifié
    }

    const fetchFilms = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/films?search=${searchTerm}&page=${page}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
        });
        // Si c'est la première page, réinitialisez les films, sinon ajoutez-les
        console.log("response.data.last_page")
        console.log(response.data.last_page)
        setLastPage(response.data.last_page)
        if (page === 1) {
          setFilms(response.data.data);
        } else {
          setFilms(prevFilms => [...prevFilms, ...response.data.data]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des films', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
  }, [page, searchTerm]); // `page` et `searchTerm` comme dépendances

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setFilms([]); // Réinitialiser la liste des films lors d'une nouvelle recherche
    setPage(1);  // Réinitialiser la page à 1
  };



  const handleScroll = (e) => {
    console.log("window.innerHeight + document.documentElement.scrollTop")
    console.log(window.innerHeight + document.documentElement.scrollTop)
    console.log("document.documentElement.offsetHeigh")
    console.log(document.documentElement.offsetHeight)
    console.log("lastPage")
    console.log(lastPage)
    console.log("page")
    console.log(page)
    if ((window.innerHeight + document.documentElement.scrollTop + 20 >= document.documentElement.offsetHeight) && !loading && lastPage > page) {
      console.log("application")
      setPage(prevPage => prevPage + 1); // Charger la page suivante
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]); // Ajouter `loading` comme dépendance pour empêcher les appels parallèles

  //Show un film
  const handleFilmShow = (id) => {
    navigate(`/films/${id}`);
  };

  //Edit un film
  const handleFilmEdit = (id) => {
    navigate(`/films/${id}/edit`);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-12 text-center"><h1>Liste des films</h1></div>
        <div className="col-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
            placeholder="Rechercher un film par son nom ou titre"
          />
        </div>
      </div>

      {loading && <p className="text-center">Chargement...</p>}

      {!loading && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Date de sortie</th>
              <th scope="col">Type de média</th>
              <th scope="col">Langue originale</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {films.map(film => (
              <tr key={film.id}  >
                <td>{film.name ? film.name : film.title}</td>
                <td>{film.release_date}</td>
                <td>{film.media_type}</td>
                <td>{film.original_language}</td>
                <td className="text-center">
                <FontAwesomeIcon icon={faEye} onClick={() => handleFilmShow(film.id)} className="text-warning mx-2" style={{ cursor: 'pointer' }} />
                <FontAwesomeIcon icon={faEdit} onClick={() => handleFilmEdit(film.id)} className="text-success" style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Films;

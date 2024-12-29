import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate


const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      navigate("/films");
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Récupérer le cookie CSRF avant d'envoyer la requête POST
    axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true })
      .then(() => {
        axios.post('http://localhost:8000/api/login', {
          email,
          password
        }, {
          withCredentials: true // Permet d'envoyer les cookies avec la requête
        })
          .then(response => {
            localStorage.setItem('auth_token', response.data.token)
            navigate("/films")
          })
          .catch(error => console.error('Erreur:', error));
      })
      .catch(error => console.error('Erreur CSRF:', error));
  }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Se connecter</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Login;

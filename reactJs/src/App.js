import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import de Routes au lieu de Switch
import Login from './auth/Login';

const App = () => {

  return (
    <Router>
      <Routes>
        {/* Route pour la page de connexion */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { useNavigate } from 'react-router';
import './index.css'


const NotFound = () => {

  const navigate = useNavigate();

  const handleGoHome = () => navigate('/', { replace: true });

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-number">404</div>
        <h1 className="not-found-title">¡Pokémon no encontrado!</h1>
        <p className="not-found-message">
          El pokémon que buscas ha escapado. Parece que se te ha perdido en la hierba alta.
        </p>
        <div className="pokemon-image-404">
          <div className="pokemon-silhouette">?</div>
        </div>
        <button onClick={handleGoHome} className="home-button">
          Volver al Laboratorio Pokémon
        </button>
      </div>
    </div>
  );
};

export default NotFound;
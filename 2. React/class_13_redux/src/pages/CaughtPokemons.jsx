import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// import { usePokemon } from '../context/PokemonContext';
import './Caught.css';
import { selectCaughtPokemons } from '../redux/selector/selector';
import { releasePokemon } from '../redux/reducer/pokemonSlice';

const CaughtPokemons = () => {
  // const { caughtPokemons, releasePokemon } = usePokemon();
  const caughtPokemons = useSelector(selectCaughtPokemons);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handlePokemonClick = (pokemonId) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  const handleReleasePokemon = (pokemonId, event) => {
    event.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres liberar a este Pokémon?')) {
      // releasePokemon(pokemonId);
      dispatch(releasePokemon(pokemonId));
    }
  };

  const getCaughtDate = (caughtDate) => {
    const date = new Date(caughtDate);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (caughtPokemons.length === 0) {
    return (
      <div className="caught-pokemons">
        <div className="caught-header">
          <button onClick={handleBack} className="back-button">
            ← Volver a la lista
          </button>
          <h2>Mis Pokémones Atrapados</h2>
        </div>
        
        <div className="empty-caught">
          <div className="empty-pokeball">
            <div className="empty-pokeball-top"></div>
            <div className="empty-pokeball-center"></div>
            <div className="empty-pokeball-bottom"></div>
          </div>
          <h3>¡Aún no has atrapado ningún Pokémon!</h3>
          <p>Ve a la lista principal y comienza tu aventura Pokémon</p>
          <button onClick={handleBack} className="cta-button">
            Explorar Pokémones
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="caught-pokemons">
      <div className="caught-header">
        <button onClick={handleBack} className="back-button">
          ← Volver a la lista
        </button>
        <h2>Mis Pokémones Atrapados</h2>
        <div className="caught-stats">
          <span className="total-count">Total: {caughtPokemons.length}</span>
        </div>
      </div>

      <div className="caught-grid">
        {caughtPokemons.map((pokemon) => (
          <div 
            key={pokemon.id} 
            className="caught-pokemon-card"
            onClick={() => handlePokemonClick(pokemon.id)}
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="caught-pokemon-image"
            />
            
            <div className="caught-pokemon-info">
              <h3 className="caught-pokemon-name">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h3>
              <p className="caught-pokemon-id">#{pokemon.id}</p>
              
              <div className="caught-pokemon-types">
                {pokemon.types.map((typeInfo) => (
                  <span key={typeInfo.type.name} className={`type ${typeInfo.type.name}`}>
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
              
              <div className="caught-date">
                <span className="caught-date-label">Atrapado:</span>
                <span className="caught-date-value">
                  {getCaughtDate(pokemon.caughtDate)}
                </span>
              </div>
            </div>

            <button
              className="release-button"
              onClick={(e) => handleReleasePokemon(pokemon.id, e)}
              title="Liberar Pokémon"
            >
              <span className="release-icon">✕</span>
              Liberar
            </button>
          </div>
        ))}
      </div>

      <div className="caught-summary">
        <div className="summary-card">
          <h4>Resumen de Capturas</h4>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Total Atrapados:</span>
              <span className="stat-value">{caughtPokemons.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Primera Captura:</span>
              <span className="stat-value">
                {getCaughtDate(caughtPokemons[caughtPokemons.length - 1]?.caughtDate)}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Última Captura:</span>
              <span className="stat-value">
                {getCaughtDate(caughtPokemons[0]?.caughtDate)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaughtPokemons;
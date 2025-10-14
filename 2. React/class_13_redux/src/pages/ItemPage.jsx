import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonById } from '../api/pokemon'
import './index.css'
// import { usePokemon } from '../context/PokemonContext';
import { selectCaughtPokemons } from '../redux/selector/selector';
import { releasePokemon, catchPokemon } from '../redux/reducer/pokemonSlice';

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { catchPokemon, caughtPokemons, releasePokemon } = usePokemon();
  const caughtPokemons = useSelector(selectCaughtPokemons);
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);
        const response = await getPokemonById(id);
        setPokemon(response.data);
        setLoading(false);
      } catch (err) {
        setError('Pokémon no encontrado');
        setLoading(false);
        console.error('Error:', err);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  const handleBack = () => navigate('/');

  const handleCatchRelease = () => {
    if (isCaught) {
      // releasePokemon(pokemon.id);
      dispatch(releasePokemon(pokemon.id));
    } else {
      // catchPokemon(pokemon);
      dispatch(catchPokemon(pokemon));
    }
  };

  const isCaught = caughtPokemons?.some(p => p.id === parseInt(id))

  if (loading) {
    return <div className="loading">Cargando información del Pokémon...</div>;
  }

  if (error || !pokemon) {
    return (
      <div className="error-container">
        <div className="error">{error || 'Pokémon no encontrado'}</div>
        <button onClick={handleBack} className="back-button">
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
     <div className="pokemon-detail">
      <button onClick={handleBack} className="back-button">
        ← Volver a la lista
      </button>
      
      <div className="pokemon-detail-card">
        <div className="pokemon-header">
          <div className="pokemon-title-section">
            <h1 className="pokemon-detail-name">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <p className="pokemon-detail-id">#{pokemon.id}</p>
          </div>
          
          <button 
            className={`catch-button-detail ${isCaught ? 'caught' : ''}`}
            onClick={handleCatchRelease}
          >
            <div className="pokeball-detail">
              <div className="pokeball-detail-top"></div>
              <div className="pokeball-detail-center"></div>
              <div className="pokeball-detail-bottom"></div>
            </div>
            <span>{isCaught ? 'Liberar' : 'Atrapar'}</span>
          </button>
        </div>

        {/* Resto del contenido igual... */}
        <div className="pokemon-content">
          <div className="pokemon-images">
            <img
              src={pokemon.sprites.front_default}
              alt={`${pokemon.name} front`}
              className="pokemon-detail-image"
            />
            <img
              src={pokemon.sprites.back_default}
              alt={`${pokemon.name} back`}
              className="pokemon-detail-image"
            />
            {pokemon.sprites.other['official-artwork'].front_default && (
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={`${pokemon.name} official art`}
                className="pokemon-detail-image official-art"
              />
            )}
          </div>

          <div className="pokemon-info">
            <div className="info-section">
              <h3>Tipos</h3>
              <div className="pokemon-types">
                {pokemon.types.map((typeInfo) => (
                  <span key={typeInfo.type.name} className={`type ${typeInfo.type.name}`}>
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3>Estadísticas</h3>
              <div className="stats">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="stat">
                    <span className="stat-name">
                      {stat.stat.name.replace('-', ' ')}:
                    </span>
                    <span className="stat-value">{stat.base_stat}</span>
                    <div className="stat-bar">
                      <div 
                        className="stat-bar-fill"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3>Habilidades</h3>
              <div className="abilities">
                {pokemon.abilities.map((ability) => (
                  <span key={ability.ability.name} className="ability">
                    {ability.ability.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3>Características</h3>
              <div className="characteristics">
                <div className="characteristic">
                  <span>Altura:</span>
                  <span>{(pokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div className="characteristic">
                  <span>Peso:</span>
                  <span>{(pokemon.weight / 10).toFixed(1)} kg</span>
                </div>
                <div className="characteristic">
                  <span>Experiencia base:</span>
                  <span>{pokemon.base_experience || 'N/A'}</span>
                </div>
                <div className="characteristic">
                  <span>Estado:</span>
                  <span className={isCaught ? 'caught-status' : 'free-status'}>
                    {isCaught ? '¡Atrapado!' : 'Salvaje'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ItemPage;
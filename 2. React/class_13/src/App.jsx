import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getPokemonList, getData } from './api/pokemon';
import './assets/pokemon.css';
import './assets/App.css';
import { usePokemon } from './context/PokemonContext';


function App() {
  // const [pokemons, setPokemons] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [paginate, setPaginate] = useState(0);
  const [previousPag, setPreviousPag] = useState(false);
  const navigate = useNavigate();

  const {
    pokemons,
    caughtPokemons,
    currentPage,
    loading,
    error,
    setPokemons,
    setCurrentPage,
    catchPokemon,
    setError,
    setLoading
  } = usePokemon();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        // Obtener los primeros 10 pokémones
        const response = await getPokemonList(100, 100 * currentPage);
        const pokemonData = response.data.results;

        setPreviousPag(!response.data.previous)

        // Obtener información detallada de cada pokémon
        const pokemonDetails = await Promise.all(
          pokemonData.map(async (pokemon) => {
            const detailResponse = await getData(pokemon.url);
            return detailResponse.data;
          })
        );

        setPokemons(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los pokémones');
        setLoading(false);
        console.error('Error:', err);
      }
    };

    fetchPokemons();
  }, [currentPage]);

  const onAddPag = () => setCurrentPage(currentPage + 1);

  const onRmvPag = () => setCurrentPage(currentPage - 1);

  const handlePokemon = (pokemonId) => (e) => navigate(`/pokemon/${pokemonId}`);

  const handleCatchPokemon = (pokemon, event) => {
    event.stopPropagation(); // Evitar que se active el click de la tarjeta
    catchPokemon(pokemon);

    // Efecto visual
    const button = event.target;
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);
  };

  const isPokemonCaught = (pokemonId) => {
    return caughtPokemons.some(p => p.id === pokemonId);
  };

  if (error && pokemons.length === 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <React.Fragment>
      <div className="pokemon-list ">
        <button onClick={onRmvPag} className="me-2" disabled={previousPag}>Previous</button>
        <button onClick={onAddPag}>Next</button>
        <h2>Lista de Pokémones</h2>
        <div className="pokemon-grid">
          {
            loading
              ? <h2>Cargando....</h2>
              : pokemons.map((pokemon) => {
                const caught = isPokemonCaught(pokemon.id);
                return (
                  <div
                    key={pokemon.id}
                    className="pokemon-card pointer"
                    onClick={handlePokemon(pokemon.id)}
                  >
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="pokemon-image"
                    />
                    <div className="pokemon-card-header">
                      <h3 className="pokemon-name">
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                      </h3>
                      <button
                        className={`catch-button ${caught ? 'caught' : ''}`}
                        onClick={(e) => handleCatchPokemon(pokemon, e)}
                        disabled={caught}
                        title={caught ? '¡Ya atrapado!' : 'Atrapar Pokémon'}
                      >
                        <div className="pokeball-mini">
                          <div className="pokeball-mini-top"></div>
                          <div className="pokeball-mini-center"></div>
                          <div className="pokeball-mini-bottom"></div>
                        </div>
                      </button>
                    </div>

                    <p className="pokemon-id">#{pokemon.id}</p>
                    <div className="pokemon-types">
                      {pokemon.types.map((typeInfo) => (
                        <span key={typeInfo.type.name} className={`type ${typeInfo.type.name}`}>
                          {typeInfo.type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              }
              )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default App

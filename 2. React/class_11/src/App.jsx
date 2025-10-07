import React, { useState, useEffect } from 'react';
import { getPokemonList, getData } from './api/pokemon';
import './assets/pokemon.css';
import './assets/App.css';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginate, setPaginate] = useState(0);
  const [previousPag, setPreviousPag] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        // Obtener los primeros 10 pokémones
        const response = await getPokemonList(100,100 * paginate);
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
  }, [paginate]);

  const onAddPag = () => setPaginate(prevState => prevState + 1);

  const onRmvPag = () => setPaginate(prevState => prevState - 1);

  return (
    <React.Fragment>
      <div className="pokemon-list ">
        <button onClick={onRmvPag} className="me-2" disabled={previousPag}>-1</button>
        <button onClick={onAddPag}>+1</button>
      <h2>Lista de Pokémones</h2>
      <div className="pokemon-grid">
        {
        loading 
        ? <h2>Cargando....</h2>
        : pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <h3 className="pokemon-name">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h3>
            <p className="pokemon-id">#{pokemon.id}</p>
            <div className="pokemon-types">
              {pokemon.types.map((typeInfo) => (
                <span key={typeInfo.type.name} className={`type ${typeInfo.type.name}`}>
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </React.Fragment>
  )
}

export default App

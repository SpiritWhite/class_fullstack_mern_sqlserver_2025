import React, { useReducer } from 'react';
import { pokemonReducer } from '../reducer/pokemonReducer';
import { initialState, PokemonContext } from './PokemonContext';
import { ACTION_TYPES } from '../actions/pokemonActions';


export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  // Actions
  const setCurrentPage = (page) => {
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_PAGE,
      payload: page
    });
  };

  const catchPokemon = (pokemon) => {
    dispatch({
      type: ACTION_TYPES.CATCH_POKEMON,
      payload: pokemon
    });
  };

  const releasePokemon = (pokemonId) => {
    dispatch({
      type: ACTION_TYPES.RELEASE_POKEMON,
      payload: pokemonId
    });
  };

  const setPokemons = (pokemons) => {
    dispatch({
      type: ACTION_TYPES.SET_POKEMONS,
      payload: pokemons
    });
  };

  const setLoading = (loading) => {
    dispatch({
      type: ACTION_TYPES.SET_LOADING,
      payload: loading
    });
  };

  const setError = (error) => {
    dispatch({
      type: ACTION_TYPES.SET_ERROR,
      payload: error
    });
  };

  // Context values
  const value = {
    // State
    pokemons: state.pokemons,
    currentPage: state.currentPage,
    caughtPokemons: state.caughtPokemons,
    loading: state.loading,
    error: state.error,
    // Actions
    setCurrentPage,
    catchPokemon,
    releasePokemon,
    setPokemons,
    setLoading,
    setError
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};
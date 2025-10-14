import React, { createContext, useContext } from 'react';


// Estado inicial

export const initialState = {
  pokemons: [],
  currentPage: 0,
  caughtPokemons: [],
  loading: false,
  error: null
};


// Creat contexto

export const PokemonContext = createContext();


// Hook personalizado

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context)
    throw new Error('usePokemon debe ser usado dentro de PokemonProvider');
  return context;
};
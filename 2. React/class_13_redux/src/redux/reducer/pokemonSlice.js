import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pokemons: [],
  caughtPokemons: [],
  currentPage: 0,
  loading: false,
  error: null
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    // Pokémones
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    // Captura de pokémones
    catchPokemon: (state, action) => {
      const pokemonToCatch = action.payload;
      const isAlreadyCaught = state.caughtPokemons.find(p => p.id === pokemonToCatch.id);

      if (!isAlreadyCaught) {
        state.caughtPokemons = [
          ...state.caughtPokemons,
          {
            ...pokemonToCatch,
            caughtDate: new Date().toISOString()
          }
        ];
      }
    },
    
    releasePokemon: (state, action) => {
      const pokemonId = action.payload;
      state.caughtPokemons = state.caughtPokemons.filter(p => p.id !== pokemonId);
    },
    
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

// Exportar acciones
export const { 
  setPokemons, 
  setLoading, 
  setError, 
  catchPokemon, 
  releasePokemon, 
  setCurrentPage 
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
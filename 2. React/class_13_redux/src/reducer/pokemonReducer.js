import { ACTION_TYPES } from '../actions/pokemonActions';

// Reducer
export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        loading: false,
        error: null
      };

    case ACTION_TYPES.CATCH_POKEMON: {
      const pokemonToCatch = action.payload;
      const isAlready = state.caughtPokemons.find(p => p.id === pokemonToCatch.id);

      if (isAlready)
        return state;

      return {
        ...state,
        caughtPokemons: [
          ...state.caughtPokemons,
          {
            ...pokemonToCatch,
            caughtDate: new Date().toISOString()
          }
        ]
      };
     }

    case ACTION_TYPES.RELEASE_POKEMON: 
     return {
      ...state,
      caughtPokemons: state.caughtPokemons.filter(p => p.id !== action.payload)
     };

    case ACTION_TYPES.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
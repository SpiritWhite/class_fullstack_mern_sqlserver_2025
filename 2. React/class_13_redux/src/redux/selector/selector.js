// import { useDispatch, useSelector } from 'react-redux';


// export const useAppDispatch = useDispatch;
// export const useAppSelector = useSelector; 


// Selectores
export const selectPokemons = (state) => state.pokemonReducer.pokemons;
export const selectCaughtPokemons = (state) => state.pokemonReducer.caughtPokemons;
export const selectCurrentPage = (state) => state.pokemonReducer.currentPage;
export const selectLoading = (state) => state.pokemonReducer.loading;
export const selectError = (state) => state.pokemonReducer.error;

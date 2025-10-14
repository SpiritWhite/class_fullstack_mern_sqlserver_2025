import { combineReducers } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';


const reducers = combineReducers({
  pokemonReducer
});


export default reducers;
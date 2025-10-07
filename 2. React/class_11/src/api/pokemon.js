import axios from "axios";
import { instance } from "./axios"


export const getPokemonList = (limit = 10, offset = 0) => instance.get('pokemon', {
  params: { limit, offset }
});


export const getData = (url) => axios.get(url);
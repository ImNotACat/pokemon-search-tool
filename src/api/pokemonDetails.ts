import axios from 'axios';
import type { PokemonDetail } from './pokemon';


export const fetchPokemonDetail = async (url: string): Promise<PokemonDetail> => {
  const res = await axios.get(url);
  return res.data;
};

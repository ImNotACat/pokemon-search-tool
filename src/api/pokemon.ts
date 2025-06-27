import axios from 'axios';

export interface Pokemon {
  name: string;
  url: string;
}

export const fetchPokemonList = async (): Promise<Pokemon[]> => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  return response.data.results;
};

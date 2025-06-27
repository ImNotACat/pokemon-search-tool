import axios from 'axios';

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
}

export const fetchPokemonDetail = async (url: string): Promise<PokemonDetail> => {
  const res = await axios.get(url);
  return res.data;
};

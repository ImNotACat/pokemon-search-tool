import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// Interface for a basic Pokemon item from the list endpoint
export interface PokemonListItem {
  name: string;
  url: string;
}

// Interface for detailed Pokemon data 
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string; 
    other?: { 
      dream_world?: {
        front_default?: string | null;
        front_female?: string | null;
      };
      home?: {
        front_default?: string | null;
        front_female?: string | null;
        front_shiny?: string | null;
        front_shiny_female?: string | null;
      };
      'official-artwork'?: { 
        front_default?: string | null;
        front_shiny?: string | null;
      };
    }
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: { 
      name: string;
      url: string;
    };
  }[]
  abilities: {
    slot: number;
    ability: { 
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }[];
  base_experience: number
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const ALL_POKEMON_LIMIT = 10000; 

// Function to fetch the entire list of Pokemon names and URLs
export const fetchAllPokemonList = async (): Promise<PokemonListItem[]> => {
  try {
    const response = await axios.get<PokemonListResponse>(
      `${POKEMON_API_BASE_URL}?limit=${ALL_POKEMON_LIMIT}`
    );
    console.log("Total Pokemon found: ", response.data.results.length)
    return response.data.results;
  } catch (error) {
    console.error('Error fetching all Pokemon list:', error);
    throw new Error('Failed to fetch all Pokemon list');
  }
};

// React Query Hook to get the full list of Pokemon names/URLs
export const useAllPokemonList = () => {
  return useQuery<PokemonListItem[], Error>({
    queryKey: ['allPokemonList'], 
    queryFn: fetchAllPokemonList,
    staleTime: 1000 * 60 * 60, 
  });
};

// Function to fetch details for a single Pokemon
export const fetchPokemonDetail = async (url: string): Promise<PokemonDetail> => {
  const { data } = await axios.get<PokemonDetail>(url);
  return data;
};

// React Query Hook to get details for a single Pokemon
export const usePokemonDetail = (pokemonUrl: string) => {
  return useQuery<PokemonDetail, Error>({
    queryKey: ['pokemonDetail', pokemonUrl], 
    queryFn: () => fetchPokemonDetail(pokemonUrl),
    enabled: !!pokemonUrl, 
    staleTime: 1000 * 60 * 5, 
  });
};
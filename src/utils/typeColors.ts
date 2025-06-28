// src/utils/typeColors.ts

// Define a type for our color map entries (optional, but good for clarity)
type PokemonTypeColors = {
    [key: string]: string; // Maps type name (string) to a color string (e.g., hex code)
  };
  
  // A common mapping of Pokemon types to distinct colors
  // These are often chosen to be visually distinct and representative of the type
  export const typeColors: PokemonTypeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC', // Often a dark purple or blue
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  
  // You can also create a function to get the color, providing a fallback
  export const getTypeColor = (typeName: string): string => {
    return typeColors[typeName.toLowerCase()] || '#68A090'; // Default fallback color if type not found (e.g., a neutral gray/green)
  };
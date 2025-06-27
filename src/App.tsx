import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from './api/pokemon';
import type { Pokemon } from './api/pokemon';
import { useState } from 'react';
import PokemonCard from './components/pokemonCard';
import './App.css'; // add basic styling

const App = () => {
  const { data, isLoading, isError } = useQuery<Pokemon[]>({
    queryKey: ['pokemonList'],
    queryFn: fetchPokemonList,
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data?.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading && <p>Loading Pokémon...</p>}
      {isError && <p>Failed to load Pokémon list.</p>}

      <div className="card-grid">
        {filteredData?.map((pokemon) => (
          <PokemonCard key={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
};

export default App;

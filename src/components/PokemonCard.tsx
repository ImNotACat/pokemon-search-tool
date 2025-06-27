import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../api/pokemonDetails';
import type { PokemonDetail } from '../api/pokemonDetails';

interface Props {
  url: string;
}

const PokemonCard: React.FC<Props> = ({ url }) => {
  const { data, isLoading, isError } = useQuery<PokemonDetail>({
    queryKey: ['pokemonDetail', url],
    queryFn: () => fetchPokemonDetail(url),
  });

  if (isLoading) return <div className="card">Loading...</div>;
  if (isError || !data) return <div className="card">Error loading Pokémon</div>;

  return (
    <div className="card">
      <img src={data.sprites.front_default} alt={data.name} />
      <h2>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
      <p>Type: {data.types.map(t => t.type.name).join(', ')}</p>
      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
    </div>
  );
};

export default PokemonCard;

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchPokemonList } from './api/pokemon';
import type { Pokemon } from './api/pokemon';
import PokemonCard from './components/PokemonCard';
import { SimpleGrid, Spinner, Text, Flex, Box } from '@chakra-ui/react';
import Header from './components/Header';

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
    <Flex
      direction="column"
      height="100vh"
      bg="#213448"
      color="white"
      px={4}
      py={6}
    >
      <Box flexShrink={0}>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </Box>

      <Box
        flex="1"
        overflowY="auto"
        mt={4}
        pr={1}
      >
        {isLoading && <Spinner />}
        {isError && <Text color="red.500">Failed to load Pokémon list.</Text>}

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="4">
          {filteredData?.map((pokemon) => (
            <PokemonCard key={pokemon.name} url={pokemon.url} />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};


export default App;

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useAllPokemonList } from './api/pokemon';
import PokemonCard from './components/PokemonCard';
import { SimpleGrid, Spinner, Text, Flex, Box } from '@chakra-ui/react';
import Header from './components/Header';
import PokemonDetailModal from './components/PokemonDetailModal';

const queryClient = new QueryClient();

function AppContent() {
  const { data: allPokemonListItems, isLoading, isError, error } = useAllPokemonList();
  const [searchTerm, setSearchTerm] = useState('');
  const [displayLimit, setDisplayLimit] = useState(20);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState<string | null>(null);
  
  // Use useMemo to memoize the filtered and sliced list for performance
  const displayedPokemon = useMemo(() => {
    if (!allPokemonListItems) return [];
    let filteredData = allPokemonListItems;

    if(searchTerm){
      filteredData = filteredData?.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );    
    }

    return filteredData.slice(0, displayLimit);
  }, [allPokemonListItems, searchTerm, displayLimit])

  // Handle infinite scroll
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return; 
    }

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
      if (scrollTop + clientHeight >= scrollHeight - 100) { 
        if (displayLimit < (allPokemonListItems?.length || 0)) {
          if (displayLimit < displayedPokemon.length) return;
          setDisplayLimit(prevLimit => prevLimit + 20);
        }
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [displayLimit, allPokemonListItems, displayedPokemon.length]);

  // handling modal
  const handleCardClick = (pokemonUrl: string) => {
    setSelectedPokemonUrl(pokemonUrl);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPokemonUrl(null); // Clear selected Pokemon when modal closes
  };

  // loading/error handling
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>
        Loading all Pokemon list...
      </div>
    );
  }
  if (isError) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        Error loading Pokemon list: {error?.message}.
      </div>
    );
  }
  if (!allPokemonListItems || allPokemonListItems.length === 0) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>No Pokemon data available.</div>;
  }

  const hasMoreToLoad = displayLimit < (displayedPokemon?.length || 0);

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
        ref={scrollContainerRef}
        flex="1"
        overflowY="auto"
        mt={4}
        pr={1}
      >
        {isLoading && <Spinner />}
        {isError && <Text color="red.500">Failed to load Pokémon list.</Text>}

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} gap="4">
          {displayedPokemon?.map((pokemon) => (
            <PokemonCard 
              key={pokemon.name} 
              url={pokemon.url} 
              onClick={handleCardClick}
              />
          ))}
        </SimpleGrid>

        {hasMoreToLoad && (
          <Flex justify="center" align="center" py={4}>
            <Spinner size="md" />
            <Text ml={2}>Loading more Pokemon...</Text>
          </Flex>
        )}
        {displayedPokemon.length === 0 && searchTerm && (
          <Flex justify="center" align="center" py={4}>
            <Text>No Pokémon found matching "{searchTerm}".</Text>
          </Flex>
        )}
      </Box>
      <PokemonDetailModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        pokemonUrl={selectedPokemonUrl}
      />
    </Flex>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;

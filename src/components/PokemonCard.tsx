import { Box, Image, Text, Badge, Stack, Spinner, Center } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../api/pokemonDetails';
import type { PokemonDetail } from '../api/pokemon';
import React from 'react';
import { getTypeColor } from '../utils/typeColors';

interface Props {
  url: string;
  onClick: (pokemonUrl: string) => void;
}

const PokemonCard: React.FC<Props> = ({ url, onClick }) => {
  const { data, isLoading, isError } = useQuery<PokemonDetail>({
    queryKey: ['pokemonDetail', url],
    queryFn: () => fetchPokemonDetail(url),
    enabled: !!url
  });


  const imageUrl = data?.sprites.other?.['official-artwork']?.front_default || data?.sprites.front_default;
  

  if (isLoading)
    return (
      <Center height="100%" minHeight="150px">
        <Spinner />
      </Center>
    );

  if (isError || !data)
    return (
      <Box p={4} borderWidth={1} borderRadius="md" height="100%" minHeight="150px">
        Oh no! Error loading Pokémon.
      </Box>
    );

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      p={4} 
      bg="#547792" 
      _hover={{ bg: "#94B4C1" }} 
      boxShadow="sm"
      onClick={() => onClick(url)} 
    >
      <Center>
        <Image src={imageUrl} alt={data.name} boxSize="96px" />
      </Center>
      <Stack mt={4} textAlign="center">
        <Text fontWeight="bold" fontSize="lg" textTransform="capitalize">
          {data.name}
        </Text>
        <Stack direction="row" justify="center">
          {data.types.map((t) => (
            <Badge
              key={t.type.name}
              bg={getTypeColor(t.type.name)}
              color="white" 
              px={2} 
              py={1} 
              borderRadius="md" 
              textTransform="capitalize" 
            >
              {t.type.name}
          </Badge>
          ))}
        </Stack>
        <Text fontSize="sm">Height: {data.height / 10} m</Text>
        <Text fontSize="sm">Weight: {data.weight / 10} kg</Text>
      </Stack>
    </Box>
  );
};

export default PokemonCard;

import { Box, Image, Text, Badge, Stack, Spinner, Center } from '@chakra-ui/react';
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

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  if (isError || !data)
    return (
      <Box p={4} borderWidth={1} borderRadius="md">
        Error loading Pokémon.
      </Box>
    );

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="#547792" _hover={{ bg: "#94B4C1" }} boxShadow="sm">
      <Center>
        <Image src={data.sprites.front_default} alt={data.name} boxSize="96px" />
      </Center>
      <Stack mt={4} textAlign="center">
        <Text fontWeight="bold" fontSize="lg" textTransform="capitalize">
          {data.name}
        </Text>
        <Stack direction="row" justify="center">
          {data.types.map((t) => (
            <Badge key={t.type.name} colorScheme="green">
              {t.type.name}
            </Badge>
          ))}
        </Stack>
        <Text fontSize="sm">Height: {data.height}</Text>
        <Text fontSize="sm">Weight: {data.weight}</Text>
      </Stack>
    </Box>
  );
};

export default PokemonCard;

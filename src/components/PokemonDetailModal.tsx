// src/components/PokemonDetailModal.tsx
import React from 'react';
import {
  CloseButton,
  Center,
  Spinner,
  Text,
  Image,
  Flex,
  Box,
  Badge,
  Stack,
} from '@chakra-ui/react';
import { usePokemonDetail } from '../api/pokemon'; // Adjust path if pokemonDetail is in a different file

interface PokemonDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemonUrl: string | null; // Nullable as no Pokemon might be selected
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({ onClose, pokemonUrl }) => {
  // Use the same usePokemonDetail hook as the card, but now triggered by modal open
  const { data: pokemon, isLoading, isError } = usePokemonDetail(pokemonUrl || ''); // Pass empty string if null to disable query

  if (!pokemonUrl) {
    return null; 
  }

  if (!pokemon) {
    return null; 
  }

  return (
    < > 
          {isLoading && (
            <Center minHeight="200px">
              <Spinner size="xl" />
            </Center>
          )}
          {isError && (
            <Center minHeight="200px">
              <Text color="red.400">Failed to load Pokémon details.</Text>
            </Center>
          )}
          {pokemon && !isLoading && !isError && (
            <Flex direction={{ base: 'column', md: 'row' }} alignItems="center" gap={6}>
                <CloseButton
                  colorPalette="cyan"
                  variant="outline"
                  onClick={onClose}
                  aria-label="Close modal"
                />

                <Box flexShrink={0} textAlign="center">

                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  boxSize="150px"
                  mb={2}
                />
                <Text fontSize="lg" fontWeight="bold" textTransform="capitalize">
                  {pokemon.name}
                </Text>
                <Flex justify="center" wrap="wrap" mt={2}>
                  {pokemon.types.map((t) => (
                    <Badge key={t.type.name} colorScheme="teal" mr={1} mb={1}>
                      {t.type.name}
                    </Badge>
                  ))}
                </Flex>
              </Box>

              <Box flex="1">
                <Stack p={4} >
                  <Text fontSize="md">ID: {pokemon.id}</Text>
                  <Text fontSize="md">Height: {pokemon.height / 10} m</Text> 
                  <Text fontSize="md">Weight: {pokemon.weight / 10} kg</Text> 
                  <Text fontSize="lg" fontWeight="bold" mt={4}>Base Stats</Text>
                </Stack>
              </Box>
            </Flex>
          )}
      </>
  );
};

export default PokemonDetailModal;
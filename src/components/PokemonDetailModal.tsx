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
import { usePokemonDetail } from '../api/pokemon';
import { getTypeColor } from '../utils/typeColors';

interface PokemonDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemonUrl: string | null; 
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({ isOpen, onClose, pokemonUrl }) => {
  const { data: pokemon, isLoading, isError } = usePokemonDetail(pokemonUrl || ''); 
  const imageUrl = pokemon?.sprites.other?.['official-artwork']?.front_default || pokemon?.sprites.front_default;

  if (!isOpen) {
    return null;
  }
  
  if (!pokemonUrl || !pokemon) {
    return (
          <Box 
            position="fixed" 
            top="0"
            left="0"
            width="100vw" 
            height="100vh" 
            bg="rgba(0, 0, 0, 0.7)" 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            zIndex="tooltip" 
            onClick={onClose} 
          >
            <Box
              bg="#213448" 
              color="white"
              borderRadius="md"
              maxW={{ base: "90%", md: "70%" }} 
              width="full" 
              p={6} 
              position="relative" 
              onClick={(e) => e.stopPropagation()} 
            >
              <CloseButton position="absolute" right="4" top="4" onClick={onClose} />
              <Text fontSize="xl" fontWeight="bold" mb={4}>No Pokémon Selected</Text>
              <Text>Please select a Pokémon to view its details.</Text>
            </Box>
          </Box>
        );
  }

  return (
      <Box 
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        bg="rgba(0, 0, 0, 0.7)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="tooltip" 
        onClick={onClose} 
      >
        <Box 
          bg="#213448"
          color="white"
          borderRadius="md"
          maxW={{ base: "90%", sm: "70%",  md: "60%", lg: "50%" }} 
          width="full" 
          p={6} 
          position="relative" 
          onClick={(e) => e.stopPropagation()}
          borderWidth="1px"         // Sets the width of the border (e.g., "1px", "2px", etc.)
          borderColor="#547792"    // Sets the color of the border (e.g., "gray.700", "white", a hex code)
          borderStyle="solid"
        >
          <CloseButton 
            position="absolute" 
            right="4" 
            top="4" 
            onClick={onClose} 
            aria-label="Close modal" 
            colorPalette="cyan"
            variant="outline"
            />

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
              <Flex direction="column" alignItems="center" gap={6} flexWrap="wrap">
                  <Box flexShrink={0} textAlign="center">
                    <Image
                      src={imageUrl}
                      alt={pokemon.name}
                      boxSize="200px"
                      mb={2}
                    />
                    <Text fontSize="4xl" fontWeight="bold" textTransform="capitalize">
                      {pokemon.name}
                    </Text>
                    <Stack direction="row" justify="center" mt={4}>
                      {pokemon.types.map((t) => (
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
                </Box>
                <Flex direction="row" gap={12}>
                  <Box >
                    <Stack p={4}>
                      <Text fontSize="md">ID: {pokemon.id}</Text>
                        <Text fontSize="md">Height: {pokemon.height / 10} m</Text> 
                        <Text fontSize="md">Weight: {pokemon.weight / 10} kg</Text> 
                        <Text fontSize="md">Base Experience: {pokemon.base_experience}</Text>
                        <Text fontSize="lg" fontWeight="bold" mt={4}>Abilities</Text>
                        {pokemon.abilities.map((abilityData) => { 
                          return (
                            <Text key={abilityData.ability.url} fontSize="md" textTransform="capitalize">
                              {abilityData.is_hidden ? `(Hidden) ` : ''}{abilityData.ability.name}
                            </Text>
                          );
                        })}
                    </Stack>
                  </Box>
                  <Box >
                    <Stack p={4}>
                      <Text fontSize="lg" fontWeight="bold" mt={4}>Base Stats</Text>
                      {pokemon.stats.map((stat) => {
                        return (
                          <Text>{stat.stat.name}: {stat.base_stat}</Text>
                        )
                      })}
                    </Stack>
                  </Box>
                </Flex>
              </Flex>
            )}
      </Box>
    </Box>
  );
};

export default PokemonDetailModal;
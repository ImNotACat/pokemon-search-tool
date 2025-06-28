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

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({ isOpen, onClose, pokemonUrl }) => {
  // Use the same usePokemonDetail hook as the card, but now triggered by modal open
  const { data: pokemon, isLoading, isError } = usePokemonDetail(pokemonUrl || ''); // Pass empty string if null to disable query

  if (!isOpen) {
    return null;
  }
  
  if (!pokemonUrl || !pokemon) {
    return (
          <Box // This will be our custom modal container
            position="fixed" // Make it fixed to the viewport
            top="0"
            left="0"
            width="100vw" // Full viewport width
            height="100vh" // Full viewport height
            bg="rgba(0, 0, 0, 0.7)" // Semi-transparent black background for overlay
            display="flex" // Use flexbox for centering
            alignItems="center" // Center vertically
            justifyContent="center" // Center horizontally
            zIndex="tooltip" // Chakra UI's zIndex token for tooltips (very high) or a large number like 9999
            onClick={onClose} // Close modal if clicking on the overlay
          >
            <Box
              bg="#213448" // Modal content background
              color="white"
              borderRadius="md"
              maxW={{ base: "90%", md: "70%" }} // Max width for the modal (approx 70% of screen)
              width="full" // Take full available width up to maxW
              p={6} // Padding inside modal content
              position="relative" // For positioning CloseButton
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
            >
              <CloseButton position="absolute" right="4" top="4" onClick={onClose} />
              <Text fontSize="xl" fontWeight="bold" mb={4}>No Pokémon Selected</Text>
              <Text>Please select a Pokémon to view its details.</Text>
              {/* You could add a button here as well, if needed */}
            </Box>
          </Box>
        );
  }

  return (
      <Box // This will be our custom modal container
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        bg="rgba(0, 0, 0, 0.7)" // Semi-transparent black overlay
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="tooltip" // Ensures it's on top of everything
        onClick={onClose} // Allows closing by clicking on the overlay
      >
        <Box // This is the actual modal content box
          bg="#213448"
          color="white"
          borderRadius="md"
          maxW={{ base: "90%", md: "70%" }} // Adjust as needed, 'md' breakpoint for ~70%
          width="full" // Take full width up to maxW
          p={6} // Inner padding
          position="relative" // Allows CloseButton to be absolutely positioned
          onClick={(e) => e.stopPropagation()} // Important: Stop propagation so clicks inside don't close the modal
        >
          {/* Close Button positioned absolutely within the modal content box */}
          <CloseButton 
            position="absolute" 
            right="4" 
            top="4" 
            onClick={onClose} 
            aria-label="Close modal" 
            colorPalette="cyan"
            variant="outline"
            />

          {/* Modal Header content */}
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            {isLoading ? (
              'Loading...'
            ) : isError ? (
              'Error'
            ) : (
              `${pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}`
            )}
          </Text>
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
      </Box>
    </Box>
  );
};

export default PokemonDetailModal;
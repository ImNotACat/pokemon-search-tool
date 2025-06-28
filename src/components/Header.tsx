import { Heading, Input } from "@chakra-ui/react";

type HeaderProps = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
  };

  const Header = ({ searchTerm, setSearchTerm }: HeaderProps) => {
    return (
      <>
        <Heading as="h1" size="xl" mb={4} textAlign="center">
          Pokédex Search Tool
        </Heading>
        <Input
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={6}
        />
      </>
    );
  };
  
  export default Header;
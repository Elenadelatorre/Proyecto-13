import React from 'react';
import { Box, Heading, Text, Stack, Button } from '@chakra-ui/react';

const Anuncios = ({ anuncio, onButtonClick }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      p={6}
      bg="white"
      transition="all 0.3s ease-in-out"
      _hover={{ 
        boxShadow: 'lg',
        transform: 'scale(1.05)', 
        bg: 'gray.100'
      }}
    >
      <Stack spacing={3}>
        <Heading as="h3" size="lg" color="var(--rtc-color-4)">{anuncio.titulo}</Heading>
        <Text color="gray.600">{anuncio.descripcion}</Text>
        <Button 
          colorScheme="yellow" 
          bg="var(--rtc-color-2)" 
          variant="solid" 
          onClick={() => onButtonClick(anuncio.botonTexto)}
        >
          {anuncio.botonTexto}
        </Button>
      </Stack>
    </Box>
  );
};

export default Anuncios;

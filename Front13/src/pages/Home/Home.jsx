import React from 'react';
import { Box, Heading, Text, Stack, Button, SimpleGrid, Image } from '@chakra-ui/react';

const anuncios = [
  {
    id: 1,
    titulo: 'Alquiler de Motos Deportivas',
    descripcion: 'Encuentra la mejor selección de motos deportivas para alquilar.',
    ruta: '/motos-deportivas',
    botonTexto: 'Ver Motos Deportivas'
  },
  {
    id: 2,
    titulo: 'Alquiler de Motos Trail',
    descripcion: 'Las mejores motos para tus aventuras en todo tipo de terrenos.',
    ruta: '/motos-trail',
    botonTexto: 'Ver Motos Trail'
  }
];

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        position="relative"
        height="600px"
        backgroundImage="url('https://images.unsplash.com/photo-1558980664-2cd663cf8dde?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        
        backgroundSize="cover"
        backgroundPosition="center"
        color="white"
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.4)" // Fondo oscuro semitransparente
        zIndex={1}
      />
        <Box zIndex={2} position="relative">
        <Heading
          as="h1"
          mb={4}
          fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
          fontWeight="bold"
          color="white"
          textShadow="4px 4px 6px rgba(0, 0, 0, 0.7)"
          letterSpacing="wider"
        >
          ¡Tu Próxima Aventura Comienza Aquí!
        </Heading>
        <Text
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          mt={2}
          color="white"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)"
          maxW="lg"
          mx="auto"
        >
          Encuentra tu Moto Ideal
        </Text>
      </Box>
      </Box>

      {/* Anuncios Section */}
      <Box p={5}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={8}>
          {anuncios.map(anuncio => (
            <Box
              key={anuncio.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              p={6}
              bg="var(--rtc-color-0)"
            >
              <Stack spacing={3}>
                <Heading as="h3" size="lg" color="var(--rtc-color-1)">{anuncio.titulo}</Heading>
                <Text color="var(--rtc-color-4)">{anuncio.descripcion}</Text>
                <Button colorScheme="yellow" bg="var(--rtc-color-2)" onClick={() => window.location.href = anuncio.ruta}>
                  {anuncio.botonTexto}
                </Button>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Home;

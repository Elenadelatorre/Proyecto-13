import React from 'react';
import { Box, Heading, Text, Link, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      p={{ base: '10vh 0', sm: '5vh 0' }}
      textAlign="center"
    >
      <Heading as="h1" fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }} mb={4}>
        404 - Página no encontrada
      </Heading>
      <Text fontSize={{ base: 'lg', sm: 'xl' }} mb={4}>
        Lo sentimos, la página que buscas no existe.
      </Text>
      <Text fontSize={{ base: 'md', sm: 'lg' }} mb={4}>
        Puedes volver a la página principal utilizando el siguiente enlace:
      </Text>
      <Link
        as={RouterLink}
        to="/"
        color="blue.500"
        fontWeight="bold"
        _hover={{ color: 'blue.700' }}
        fontSize={{ base: 'lg', sm: 'xl' }}
      >
        Ir a la página principal
      </Link>
    </Box>
  );
};

export default NotFound;

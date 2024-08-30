import React from 'react';
import { Box, Flex, Heading, Text, Link, Stack, Divider } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      bgGradient="linear(to-r, var(--rtc-color-2), #83a9ec)"
      color="var(--rtc-color-0)" // Blanco
      py={{ base: '20px', md: '30px' }} // Padding top y bottom responsivo
      textAlign="center"
    >
      <Box maxW="1200px" mx="auto" px={{ base: '10px', md: '20px' }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          wrap="wrap"
          gap="20px"
        >
          <Box flex="1" mb={{ base: '20px', md: '0' }}>
            <Heading as="h4" size="md" color="var(--rtc-color-4)" mb="15px">
              Información de Contacto
            </Heading>
            <Text color="var(--rtc-color-4)" mb="10px">
              Dirección: Calle Principal, Ciudad
            </Text>
            <Text color="var(--rtc-color-4)" mb="10px">
              Teléfono: +123456789
            </Text>
            <Text color="var(--rtc-color-4)" mb="10px">
              Email: info@example.com
            </Text>
          </Box>
          <Box flex="1" mb={{ base: '20px', md: '0' }}>
            <Heading as="h4" size="md" color="var(--rtc-color-4)" mb="15px">
              Enlaces Rápidos
            </Heading>
            <Stack spacing="10px" align="center">
              <Link href="/" color="var(--rtc-color-0)" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                Home
              </Link>
              <Link href="/motos" color="var(--rtc-color-0)" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                Alquiler de motos
              </Link>
              <Link href="/suscripcion" color="var(--rtc-color-0)" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                Suscripción
              </Link>
            </Stack>
          </Box>
          <Box flex="1" mb={{ base: '20px', md: '0' }}>
            <Heading as="h4" size="md" color="var(--rtc-color-4)" mb="15px">
              Síguenos
            </Heading>
            <Stack direction="row" spacing="10px" justify="center">
              <Link href="https://facebook.com" color="var(--rtc-color-0)" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                Facebook
              </Link>
              <Link href="https://twitter.com" color="var(--rtc-color-0)" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                Twitter
              </Link>
              <Link href="https://instagram.com" color="var(--rtc-color-0)" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                Instagram
              </Link>
            </Stack>
          </Box>
        </Flex>
      </Box>
      <Divider borderColor="var(--rtc-color-4)" my="20px" />
      <Text color="var(--rtc-color-0)">
        &copy; 2024 Elena de la Torre. Todos los derechos reservados.
      </Text>
    </Box>
  );
};

export default Footer;

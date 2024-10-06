import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Stack,
  Divider
} from '@chakra-ui/react';
import { ThemeContext } from '../../Providers/ThemeProvider';

const Footer = () => {
  const { light } = useContext(ThemeContext);
  return (
    <Box
      as='footer'
      position='relative'
      bottom='0'
      width='100%'
      backgroundColor={light ? 'gray.500' : 'gray.700'}
      color='gray.300'
      py={{ base: '40px', md: '50px' }}
    >
      <Box maxW='1200px' mx='auto' px={{ base: '20px', md: '40px' }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='center'
          wrap='wrap'
          mb='20px'
        >
          <Box mb={{ base: '20px', md: '0' }}>
            <Heading as='h4' size='md' color='white' mb='10px'>
              Contacto
            </Heading>
            <Text mb='5px'>Calle Principal, Ciudad</Text>
            <Text mb='5px'>Teléfono: +123456789</Text>
            <Text>Email: info@example.com</Text>
          </Box>

          <Box mb={{ base: '20px', md: '0' }}>
            <Heading as='h4' size='md' color='white' mb='10px'>
              Enlaces Rápidos
            </Heading>
            <Stack spacing='5px'>
              <Link
                href='/'
                _hover={{ textDecoration: 'none', color: 'white' }}
              >
                Home
              </Link>
              <Link
                href='/motos'
                _hover={{ textDecoration: 'none', color: 'white' }}
              >
                Alquiler de Motos
              </Link>
              <Link
                href='/suscripcion'
                _hover={{ textDecoration: 'none', color: 'white' }}
              >
                Suscripción
              </Link>
            </Stack>
          </Box>

          <Box>
            <Heading as='h4' size='md' color='white' mb='10px'>
              Síguenos
            </Heading>
            <Stack direction='row' spacing='10px'>
              <Link
                href='https://facebook.com'
                _hover={{ textDecoration: 'none', color: 'white' }}
              >
                Facebook
              </Link>
              <Link
                href='https://twitter.com'
                _hover={{ textDecoration: 'none', color: 'white' }}
              >
                Twitter
              </Link>
              <Link
                href='https://instagram.com'
                _hover={{ textDecoration: 'none', color: 'white' }}
              >
                Instagram
              </Link>
            </Stack>
          </Box>
        </Flex>
        <Divider borderColor='gray.800' my='20px' />
        <Text
          textAlign='center'
          fontSize='sm'
          color={light ? 'gray.800' : 'gray.500'}
        >
          &copy; 2024 Elena de la Torre. Todos los derechos reservados.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;

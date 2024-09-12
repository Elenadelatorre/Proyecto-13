import React from 'react';
import { Flex, Link, Box, Button, useBreakpointValue } from '@chakra-ui/react';
import NavLink from './NavLink';
import ChangeTheme from '../ChangeTheme/ChangeTheme';

const DesktopMenu = ({ isAuthenticated, showNavLinks, buttonSize, logout, navigate }) => (
  <>
    <Flex
      alignItems='center'
      display={{ base: 'none', md: 'flex' }}
      mr={{ base: 0, md: 4 }}
    >
      <Link href='/'>
        <Box
          as='img'
          src='./assets/moto.png'
          alt='Logo'
          height='60px'
          mr={10}
        />
      </Link>
    </Flex>

    <Flex
      as='ul'
      display={{ base: 'none', md: 'flex' }}
      justifyContent={isAuthenticated ? 'space-between' : 'center'}
      gap={isAuthenticated ? 0 : 6}  // Ajusta el espaciado según si está autenticado
      alignItems='center'
      height='100%'
      margin='0'
      padding='0'
      listStyleType='none'
      flex='1'
    >
      {showNavLinks && (
        <>
          <NavLink
            href='/motos'
            ml={{ base: 0, md: 4 }}
            p={2}
            borderRadius='md'
            bg='gray.100'
            color='gray.800'
          >
            Alquiler de Motos
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink
                href='/myMotos'
                ml={{ base: 0, md: 4 }}
                p={2}
                borderRadius='md'
                bg='gray.100'
                color='gray.800'
              >
                Mis reservas y reseñas
              </NavLink>
              <NavLink
                href='/AddMoto'
                ml={{ base: 0, md: 4 }}
                p={2}
                borderRadius='md'
                bg='gray.100'
                color='gray.800'
              >
                Añadir moto
              </NavLink>
            </>
          )}
          <NavLink
            href='/suscripcion'
            ml={{ base: 0, md: 4 }}
            p={2}
            borderRadius='md'
            bg='gray.100'
            color='gray.800'
          >
            Ofertas Exclusivas
          </NavLink>
        </>
      )}
    </Flex>

    <Flex
      alignItems='center'
      flexDirection={{ base: 'row', md: 'row' }}
      justifyContent='flex-end'
    >
      {useBreakpointValue({ base: false, md: true }) && (
        <>
          {isAuthenticated ? (
            <Button
              colorScheme='red'
              onClick={logout}
              size={buttonSize}
              mt={{ base: 2, md: 0 }}
              ml={{ base: 0, md: 4 }}
            >
              Cerrar Sesión
            </Button>
          ) : (
            location.pathname !== '/login' && (
              <Button
                colorScheme='yellow'
                color='var(--rtc-color-4)'
                onClick={() => navigate('/login')}
                size={buttonSize}
                mt={{ base: 2, md: 0 }}
                ml={{ base: 0, md: 4 }}
              >
                Iniciar Sesión
              </Button>
            )
          )}

          <Box
            ml={{ base: 0, md: 10 }}
            display={{ base: 'none', md: 'flex' }}
          >
            <ChangeTheme />
          </Box>
        </>
      )}
    </Flex>
  </>
);

export default DesktopMenu;

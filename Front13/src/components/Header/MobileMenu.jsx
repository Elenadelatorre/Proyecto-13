import React from 'react';
import { Box, IconButton, Flex, Button  } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import NavLink from './NavLink';
import ChangeTheme from '../ChangeTheme/ChangeTheme';

const MobileMenu = ({
  isOpen,
  onOpen,
  onClose,
  isAuthenticated,
  navigate,
  logout
}) => (
  <>
    <IconButton
      aria-label='Open Menu'
      icon={<HamburgerIcon />}
      display={{ base: 'flex', md: 'none' }}
      onClick={onOpen}
      ml={4}
      position='absolute'
      left={2}
    />

    <Flex
      display={{ base: 'flex', md: 'none' }}
      flexDirection='column'
      alignItems='center'
      p={4}
      bg='white'
      boxShadow='md'
      borderRadius='md'
    >
      <Box as='img' src='./assets/moto.png' alt='Logo' height='70px' mb={4} />
      <NavLink href='/' onClick={onClose} inDrawer={true}>
        Inicio
      </NavLink>
      <NavLink href='/motos' onClick={onClose} inDrawer={true}>
        Alquiler de Motos
      </NavLink>
      {isAuthenticated && (
        <>
          <NavLink href='/myMotos' onClick={onClose} inDrawer={true}>
            Mis reservas y reseñas
          </NavLink>
          <NavLink href='/AddMoto' onClick={onClose} inDrawer={true}>
            Añadir moto
          </NavLink>
        </>
      )}
      <NavLink href='/suscripcion' onClick={onClose} inDrawer={true}>
        Ofertas Exclusivas
      </NavLink>
      <Box mt={4}>
        {isAuthenticated ? (
          <Button
            colorScheme='red'
            onClick={() => {
              logout();
              onClose();
            }}
            size='sm'
            width='full'
          >
            Cerrar Sesión
          </Button>
        ) : (
          location.pathname !== '/login' && (
            <Button
              colorScheme='yellow'
              color='var(--rtc-color-4)'
              onClick={() => {
                navigate('/login');
                onClose();
              }}
              size='sm'
              width='full'
            >
              Iniciar Sesión
            </Button>
          )
        )}
      </Box>
      <Box mt={4} ml='auto'>
        <ChangeTheme />
      </Box>
    </Flex>
  </>
);

export default MobileMenu;

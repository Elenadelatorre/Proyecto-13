import React from 'react';
import { Box, IconButton, Flex, Button, useDisclosure } from '@chakra-ui/react';
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
      zIndex='modal'
    />
    <Box
      as='img'
      src='./assets/moto.png'
      alt='Logo'
      height='70px'
      ml={200}
      display={{ base: 'flex', md: 'none' }}
      onClick={onOpen}
    />
    
    {/* Overlay */}
    {isOpen && (
      <Box
        position='fixed'
        top='0'
        left='0'
        right='0'
        bottom='0'
        bg='rgba(0, 0, 0, 0.5)' // Fondo semi-transparente
        zIndex='overlay'
        onClick={onClose} // Cierra el menú cuando se hace clic en el overlay
      />
    )}

    <Flex
      direction='column'
      align='center'
      p={4}
      bg='white'
      boxShadow='md'
      borderRadius='md'
      position='fixed' // Cambiado de 'absolute' a 'fixed'
      top='0'
      left='0'
      right='0'
      zIndex='modal'
      display={isOpen ? 'flex' : 'none'}
      opacity={isOpen ? 1 : 0}
      transition='opacity 0.3s ease'
      height='100vh' // Asegura que el menú ocupe toda la altura de la pantalla
    >
      <Flex direction='column' align='center' flex='1'>
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
      </Flex>

      <Flex direction='row' justify='flex-end' width='100%' mt={4}>
        <ChangeTheme />
      </Flex>
    </Flex>
  </>
);

export default MobileMenu;

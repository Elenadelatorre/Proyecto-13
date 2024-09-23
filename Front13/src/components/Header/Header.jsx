import React, { useContext, useEffect } from 'react';
import { Box, Flex, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, Divider, Button } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavLink from './NavLink';
import ChangeTheme from '../ChangeTheme/ChangeTheme';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import { ThemeContext } from '../../Providers/ThemeProvider';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { light } = useContext(ThemeContext);

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const showNavLinks = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      navigate('/');
    }
  }, [isAuthenticated, location, navigate]);

  return (
    <Box
      as='header'
      height={{ base: '12vh', md: '10vh' }}
      position='relative'
      boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
      backgroundColor={light? 'var(--rtc-color-6)': 'var(--rtc-color-1)'}
      px={{ base: 2, md: 4 }}
      display='flex'
      alignItems='center'
    >
      <Flex
        as='nav'
        justifyContent='space-between'
        alignItems='center'
        height='100%'
        mx='auto'
        p={{ base: 2, md: 4 }}
        flex='1'
      >
        <MobileMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

        <DesktopMenu 
          isAuthenticated={isAuthenticated} 
          showNavLinks={showNavLinks} 
          buttonSize={buttonSize} 
          logout={logout} 
          navigate={navigate} 
        />
      </Flex>

      <Drawer isOpen={isOpen} onClose={onClose} placement='right'>
        <DrawerOverlay />
        <DrawerContent
          bg='white'
          borderRadius='md'
          boxShadow='lg'
          p={4}
          maxW='80%'
          display='flex'
          flexDirection='column'
        >
          <DrawerCloseButton
            _focus={{ boxShadow: 'outline' }}
            _hover={{ bg: 'gray.200' }}
          />
          <DrawerHeader
            borderBottomWidth='1px'
            pb={4}
            mb={4}
            fontSize='xl'
            fontWeight='bold'
          >
            Menú
          </DrawerHeader>
          <DrawerBody p={0}>
            <Flex
              as='ul'
              flexDirection='column'
              listStyleType='none'
              padding='0'
              margin='0'
            >
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
              <Divider my={4} />
              {isAuthenticated ? (
                <Button
                  colorScheme='red'
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  size={buttonSize}
                  width='full'
                  mb={2}
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
                    size={buttonSize}
                    width='full'
                  >
                    Iniciar Sesión
                  </Button>
                )
              )}
              <Box
                mt={4}
                ml='auto'
                display={{ base: 'flex', md: 'none' }}
                p='4px'
              >
                <ChangeTheme />
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;

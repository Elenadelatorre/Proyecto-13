import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  useBreakpointValue,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Divider,
  Link,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importa el contexto de autenticación
import NavLink from '../Header/NavLink';
import ChangeTheme from '../ChangeTheme/ChangeTheme';

const Header = () => {
  const { isAuthenticated, logout } = useAuth(); // Obtén el estado de autenticación y logout
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const linkSpacing = useBreakpointValue({ base: 2, md: 4 });
  const showNavLinks = useBreakpointValue({ base: false, md: true });

  // Redirigir o actualizar cuando cambia el estado de autenticación
  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      // Si ya está autenticado, redirigir a la página de inicio si está en /login
      navigate('/');
    }
  }, [isAuthenticated, location, navigate]); // Este efecto escucha los cambios en el estado de autenticación

  return (
    <Box
      as='header'
      height={{ base: '12vh', md: '10vh' }}
      position='relative'
      boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
      backgroundColor='var(--rtc-color-1)'
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
        <IconButton
          aria-label='Open Menu'
          icon={<HamburgerIcon />}
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          ml={4}
          position='absolute'
          left={2}
        />

        {/* Logo visible on small screens */}
        <Flex display={{ base: 'flex', md: 'none' }} alignItems='center' justifyContent='center' flex='1'>
          <Link href='/'>
            <Box as='img' src='./assets/moto.png' alt='Logo' height='70px' />
          </Link>
        </Flex>

        {/* Logo visible on large screens */}
        <Flex alignItems='center' display={{ base: 'none', md: 'flex' }} mr={{ base: 0, md: 4 }}>
          <Link href='/'>
            <Box as='img' src='./assets/moto.png' alt='Logo' height='60px' mr={10} />
          </Link>
        </Flex>

        {/* Navigation Links */}
        <Flex as='ul' display={{ base: 'none', md: 'flex' }} justifyContent='space-between' alignItems='center' height='100%' margin='0' padding='0' listStyleType='none' flex='1'>
          {showNavLinks && (
            <>
              <NavLink href='/' ml={{ base: 0, md: linkSpacing }}>Inicio</NavLink>
              <NavLink href='/motos' ml={{ base: 0, md: linkSpacing }} p={2} borderRadius='md' bg='gray.100' color='gray.800'>Alquiler de Motos</NavLink>
              {isAuthenticated && (
                <>
                  <NavLink href='/myMotos' ml={{ base: 0, md: linkSpacing }} p={2} borderRadius='md' bg='gray.100' color='gray.800'>Mis reservas y reseñas</NavLink>
                  <NavLink href='/AddMoto' ml={{ base: 0, md: linkSpacing }} p={2} borderRadius='md' bg='gray.100' color='gray.800'>Añadir moto</NavLink>
                </>
              )}
              <NavLink href='/suscripcion' ml={{ base: 0, md: linkSpacing }} p={2} borderRadius='md' bg='gray.100' color='gray.800'>Ofertas Exclusivas</NavLink>
            </>
          )}
        </Flex>

        {/* Action Buttons */}
        <Flex alignItems='center' flexDirection={{ base: 'row', md: 'row' }} justifyContent='flex-end'>
          {useBreakpointValue({ base: false, md: true }) && (
            <>
              {isAuthenticated ? (
                <Button colorScheme='red' onClick={logout} size={buttonSize} mt={{ base: 2, md: 0 }} ml={{ base: 0, md: 4 }}>Cerrar Sesión</Button>
              ) : (
                location.pathname !== '/login' && (
                  <Button colorScheme='yellow' color='var(--rtc-color-4)' onClick={() => navigate('/login')} size={buttonSize} mt={{ base: 2, md: 0 }} ml={{ base: 0, md: 4 }}>Iniciar Sesión</Button>
                )
              )}
              {/* ChangeTheme is only visible on mobile when the drawer is open */}
              <Box ml={{ base: 0, md: 10 }} display={{ base: 'none', md: 'flex' }}>
                <ChangeTheme />
              </Box>
            </>
          )}
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} onClose={onClose} placement='right'>
        <DrawerOverlay />
        <DrawerContent bg='white' borderRadius='md' boxShadow='lg' p={4} maxW='80%' display='flex' flexDirection='column'>
          <DrawerCloseButton _focus={{ boxShadow: 'outline' }} _hover={{ bg: 'gray.200' }} />
          <DrawerHeader borderBottomWidth='1px' pb={4} mb={4} fontSize='xl' fontWeight='bold'>Menú</DrawerHeader>
          <DrawerBody p={0}>
            <Flex as='ul' flexDirection='column' listStyleType='none' padding='0' margin='0'>
              <NavLink href='/' onClick={onClose} inDrawer={true}>Inicio</NavLink>
              <NavLink href='/motos' onClick={onClose} inDrawer={true}>Alquiler de Motos</NavLink>
              {isAuthenticated && (
                <>
                  <NavLink href='/myMotos' onClick={onClose} inDrawer={true}>Mis reservas y reseñas</NavLink>
                  <NavLink href='/AddMoto' onClick={onClose} inDrawer={true}>Añadir moto</NavLink>
                </>
              )}
              <NavLink href='/suscripcion' onClick={onClose} inDrawer={true}>Ofertas Exclusivas</NavLink>
              <Divider my={4} />
              {isAuthenticated ? (
                <Button colorScheme='red' onClick={() => { logout(); onClose(); }} size={buttonSize} width='full' mb={2}>Cerrar Sesión</Button>
              ) : (
                location.pathname !== '/login' && (
                  <Button colorScheme='yellow' color='var(--rtc-color-4)' onClick={() => { navigate('/login'); onClose(); }} size={buttonSize} width='full'>Iniciar Sesión</Button>
                )
              )}
              <Box mt={4} ml='auto' display={{ base: 'flex', md: 'none' }} p='4px'>
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

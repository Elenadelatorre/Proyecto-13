import { Box, Flex, Button } from '@chakra-ui/react';
import NavLink from '../Header/NavLink';
import ChangeTheme from '../ChangeTheme/ChangeTheme';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      as='header'
      height='10svh'
      position='relative'
      boxShadow='0px 7px 26px -22px rgba(0, 0, 0, 0.75)'
      backgroundColor='var(--rtc-color-1)'
    >
      <Flex
        as='nav'
        justifyContent='space-around'
        alignItems='center'
        height='100%'
        px={4}
        maxW='container.lg'
        mx='auto'
      >
        <Flex
          as='ul'
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          height='100%'
          margin='0'
          padding='0'
          listStyleType='none'
          flex='1'
        >
          <NavLink href='/'>Inicio</NavLink>
          <NavLink href='/motos'>Alquiler de Motos</NavLink>
          <NavLink href='/reviews'>Reseñas</NavLink>
          <NavLink href='/suscripcion'>Ofertas Exclusivas</NavLink>
          <NavLink href='/AddMoto'>Añadir moto</NavLink>
        </Flex>
        <ChangeTheme />
        {isAuthenticated ? (
          <Button colorScheme='red' onClick={logout} ml={10}>
            Cerrar Sesión
          </Button>
        ) : (
          location.pathname !== '/login' && (
            <Button
              colorScheme='yellow'
              color='var(--rtc-color-4)'
              onClick={() => navigate('/login')}
              ml={10}
            >
              Iniciar Sesión
            </Button>
          )
        )}
      </Flex>
    </Box>
  );
};

export default Header;

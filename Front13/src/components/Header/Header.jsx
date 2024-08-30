import { Box, Flex } from '@chakra-ui/react';
import NavLink from '../Header/NavLink';
import ChangeTheme from '../ChangeTheme/ChangeTheme';

const Header = () => {
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
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/motos">Motos</NavLink>
          <NavLink href="/reviews">Reseñas</NavLink>
          <NavLink href="/suscripcion">Suscripción</NavLink>
          <NavLink href="/login">Login</NavLink>
        </Flex>
        <ChangeTheme />
      </Flex>
    </Box>
  );
};

export default Header;

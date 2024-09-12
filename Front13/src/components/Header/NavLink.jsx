import { Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const NavLink = ({ href, children, inDrawer = false }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      href={href}
      
      fontWeight="600"
      fontSize="20px"
      paddingBottom="5px"
      color={isActive ? (inDrawer ? 'gray.900' : 'var(--rtc-color-2)') : (inDrawer ? 'gray.700' : 'var(--rtc-color-0)')}
      borderBottom={isActive ? (inDrawer ? '3px solid gray.900' : '3px solid var(--rtc-color-2)') : 'none'}
      transition="color 0.3s ease, border-bottom 0.3s ease"
      _hover={{
        color: inDrawer ? 'gray.900' : 'var(--rtc-color-2)',
        textDecoration: 'none'  
      }}
      display="block"
      p={3} 
      borderRadius="md" 
      bg={inDrawer ? 'gray.100' : 'transparent'} 
    >
      {children}
    </Link>
  );
};

export default NavLink;
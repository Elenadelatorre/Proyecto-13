import { Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const NavLink = ({ href, children }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      href={href}
      fontWeight="600"
      fontSize="20px"
      paddingBottom="5px"
      color={isActive ? 'var(--rtc-color-2)' : 'var(--rtc-color-0)'}
      borderBottom={isActive ? '3px solid var(--rtc-color-2)' : 'none'}
      transition="color 0.3s ease, border-bottom 0.3s ease"
      _hover={{ color: 'var(--rtc-color-2)' }}
    >
      {children}
    </Link>
  );
};

export default NavLink;

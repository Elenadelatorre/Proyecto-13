import { Image } from '@chakra-ui/react';
import { useContext } from 'react';
import { ThemeContext } from '../../Providers/ThemeProvider';

// Componente para cambiar el tema:
const ChangeTheme = () => {
  // Utilizar el contexto creado en 'ThemeProvider':
  const { light, setLight } = useContext(ThemeContext);
  return (
    <Image
      className='theme-icon'
      src={light ? '/assets/energia-limpia.png' : '/assets/luna.png'}
      alt='cambiar de tema'
      w='35px'
      transition='all 0.5s'
      cursor='pointer'
      border={'1px solid'}
      borderRadius={'full'}
      borderColor={light ? 'var(--rtc-color-4)' : 'var(--rtc-color-0)'}
      backgroundColor={'var(--rtc-color-0)'}
      padding={'5px'}
      _hover={{ transform: 'scale(1.3)' }}
      onClick={() => setLight(!light)}
    />
  );
};

export default ChangeTheme;

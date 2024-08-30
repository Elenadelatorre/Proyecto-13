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
      src={light ? '/assets/moto.amarilla.png' : '/assets/motocicleta.png'}
      alt='cambiar de tema'
      w='90px'
      position='absolute'
      top='11px'
      right='20px'
      transition='all 0.5s '
      cursor='pointer'
      _hover={{ transform: 'scale(1.1)' }}
      onClick={() => setLight(!light)}
      
    />
  );
};

export default ChangeTheme;

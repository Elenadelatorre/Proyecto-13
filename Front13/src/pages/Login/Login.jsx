import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useToastMessage from '../../hooks/useToastMessage';
import { POST } from '../../utils/fetchData';

const Login = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const showToast = useToastMessage();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token, user } = await POST('/users/login', {
        email,
        contraseña
      });

      // Guarda el token y el usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Llama a la función de login del contexto
      login(token);

      showToast(
        'Inicio de sesión exitoso.',
        'Has iniciado sesión correctamente.',
        'success'
      );

      navigate('/');
    } catch (error) {
      setError(error.message);
      showToast('Error', error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      minH='100vh'
      p='5'
    >
      <Box
        p='8'
        borderRadius='md'
        boxShadow='md'
        maxW='container.sm'
        w='full'
        bg='white'
      >
        <Text
          fontSize='2xl'
          mb='4'
          textAlign='center'
          fontWeight='bold'
          color='var(--rtc-color-4)'
        >
          Iniciar Sesión
        </Text>
        <form onSubmit={handleLogin}>
          <Stack spacing='4'>
            <FormControl id='email' isRequired>
              <FormLabel color='var(--rtc-color-4)'>Email</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Correo electrónico'
                color='var(--rtc-color-4)'
                autoComplete='email'
              />
            </FormControl>
            <FormControl id='contraseña' isRequired>
              <FormLabel color='var(--rtc-color-4)'>Contraseña</FormLabel>
              <Input
                type='password'
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder='Contraseña'
                color='var(--rtc-color-4)'
                autoComplete='current-password'
              />
            </FormControl>
            {error && <Text color='red.500'>{error}</Text>}
            <Button
              colorScheme='yellow'
              bg='var(--rtc-color-2)'
              isLoading={loading}
              type='submit'
            >
              Iniciar Sesión
            </Button>
            <Text
              fontSize='sm'
              mt='4'
              textAlign='center'
              color='var(--rtc-color-4)'
            >
              ¿No tienes una cuenta?{' '}
              <Link color='blue.500' onClick={() => navigate('/register')}>
                Regístrate aquí
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;

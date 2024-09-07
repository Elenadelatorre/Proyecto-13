// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
  Link
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, contraseña: password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || 'Error al iniciar sesión');
      }

      const { token, user } = await response.json();

      // Guarda el token y el usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', user._id);

      // Llama a la función de login del contexto
      login(token);

      toast({
        title: 'Inicio de sesión exitoso.',
        description: 'Has iniciado sesión correctamente.',
        status: 'success',
        duration: 4000,
        isClosable: true
      });

      navigate('/');
    } catch (error) {
      setError(error.message);
      toast({
        title: 'Error.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
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
        <Stack spacing='4'>
          <FormControl id='email' isRequired>
            <FormLabel color='var(--rtc-color-4)'>Email</FormLabel>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Correo electrónico'
              color='var(--rtc-color-4)'
            />
          </FormControl>
          <FormControl id='password' isRequired>
            <FormLabel color='var(--rtc-color-4)'>Contraseña</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña'
              color='var(--rtc-color-4)'
            />
          </FormControl>
          {error && <Text color='red.500'>{error}</Text>}
          <Button
            colorScheme='yellow'
            bg='var(--rtc-color-2)'
            isLoading={loading}
            onClick={handleLogin}
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
      </Box>
    </Box>
  );
};

export default Login;

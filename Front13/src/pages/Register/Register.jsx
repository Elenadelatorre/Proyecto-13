// src/pages/Register/Register.jsx
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, useToast, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch('/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: name, email, contraseña: password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || 'Error al registrar el usuario');
      }

      const { message } = await response.json();

      toast({
        title: 'Registro exitoso.',
        description: message,
        status: 'success',
        duration: 4000,
        isClosable: true
      });

      navigate('/login'); // Redirige a la página de inicio de sesión después del registro
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
        <Text fontSize='2xl' mb='4' textAlign='center' fontWeight='bold' color='var(--rtc-color-4)'>
          Registro
        </Text>
        <Stack spacing='4'>
          <FormControl id='name' isRequired>
            <FormLabel color='var(--rtc-color-4)'>Nombre completo</FormLabel>
            <Input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Nombre completo'
              color='var(--rtc-color-4)'
            />
          </FormControl>
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
            colorScheme='yellow' bg='var(--rtc-color-2)'
            isLoading={loading}
            onClick={handleRegister}
          >
            Registrarse
          </Button>
          <Text fontSize='sm' mt='4' textAlign='center' color='var(--rtc-color-4)'>
            ¿Ya tienes una cuenta?{' '}
            <Link color='blue.500' onClick={() => navigate('/login')}>
              Inicia sesión aquí
            </Link>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;


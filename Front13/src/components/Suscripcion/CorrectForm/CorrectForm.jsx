import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const SuccessMessage = () => (
  <Box
    p='6'
    maxW='lg'
    mx='auto'
    textAlign='center'
    borderWidth='1px'
    borderRadius='md'
    boxShadow='md'
    bg='green.50'
  >
    <Text fontSize='2xl' fontWeight='bold' mb='4'>
      ¡Gracias por tu inscripción!
    </Text>
    <Text fontSize='lg'>
      En breve recibirás un correo de confirmación con los detalles de la suscripción.
    </Text>
  </Box>
);

export default SuccessMessage;

import React from 'react';
import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  VStack,
  Container
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons'; // Asegúrate de tener este paquete instalado

const Instrucciones = () => {
  return (
    <Box
      width='100%'
      bg='gray.50'
      p='8'
      borderRadius='md'
      boxShadow='md'
      mb='8'
      position='relative'
      overflow='hidden'
    >
      <Container maxW='container.xl' centerContent>
        <Text fontSize='2xl' fontWeight='bold' mb='4' textAlign='center'>
          ¡Gracias por tu interés en nuestras ofertas y promociones!
        </Text>
        <Text fontSize='lg' mb='6' textAlign='center'>
          Para completar tu suscripción, sigue estos pasos:
        </Text>
        <VStack align='start' spacing='4'>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckIcon} color='green.500' />
              Proporciona tu nombre completo para personalizar nuestras
              comunicaciones.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color='green.500' />
              Introduce una dirección de correo electrónico válida para recibir
              nuestras ofertas exclusivas y actualizaciones importantes.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color='green.500' />
              Ingresa tu número de teléfono (opcional) si deseas recibir
              notificaciones adicionales por SMS.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color='green.500' />
              Indica tu fecha de nacimiento para asegurarnos de que nuestras
              ofertas sean relevantes para ti.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color='green.500' />
              Selecciona tu marca de motos preferida para recibir promociones
              específicas relacionadas con tus intereses.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color='green.500' />
              Especifica tus preferencias de ofertas y la frecuencia con la que
              deseas recibir nuestras notificaciones.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color='green.500' />
              Acepta nuestros términos y condiciones para completar tu
              suscripción.
            </ListItem>
          </List>
          <Text fontSize='lg' fontWeight='bold' textAlign='center'>
            Haz clic en{' '}
            <span style={{ fontWeight: 'bold', color: '#3182CE' }}>
              "Suscribirse"
            </span>{' '}
            para finalizar tu inscripción.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Instrucciones;

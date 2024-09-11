import React from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';

const ReservasList = ({ reservas, onOpen, setNewReview }) => {
  return (
    <>
      {reservas.map((reserva) => (
        <Box
          key={reserva._id}
          borderWidth='1px'
          borderRadius='md'
          p={6}
          width='500px'
          shadow='md'
        >
          <Flex direction='row' align='center'>
            <Image
              src={reserva.moto.imagen}
              w='150px'
              
              objectFit='cover'
              borderRadius='md'
              alt='Moto'
            />
            <Box ml={4}>
              <Text fontSize='lg' fontWeight='bold'>
                {reserva.moto.marca} {reserva.moto.modelo}
              </Text>
              <Text>Fecha de inicio: {new Date(reserva.fechaInicio).toLocaleDateString()}</Text>
              <Text>Fecha de fin: {new Date(reserva.fechaFin).toLocaleDateString()}</Text>
              <Text>Precio total: {reserva.precioTotal} €</Text>
            </Box>
          </Flex>
          <Button
            mt={4}
            colorScheme='yellow'
            bg='var(--rtc-color-2)'
            onClick={() => {
              setNewReview((prev) => ({
                ...prev,
                motoId: reserva.moto._id
              }));
              onOpen();
            }}
          >
            Añadir Reseña
          </Button>
        </Box>
      ))}
    </>
  );
};

export default ReservasList;

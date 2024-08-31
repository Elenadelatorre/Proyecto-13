import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import AddMotoForm from '../../components/AddMoto/AddMotoForm';

const AddMotoPage = () => {
  return (
    <Box p='4' maxW='800px' mx='auto'>
      <Heading mb='6'>Agregar nueva moto para alquilar</Heading>
      <AddMotoForm />
    </Box>
  );
};

export default AddMotoPage;

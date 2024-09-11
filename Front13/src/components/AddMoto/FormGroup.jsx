import React from 'react';
import { VStack } from '@chakra-ui/react';

const FormGroup = ({ children }) => {
  return (
    <VStack spacing='4' align='stretch' mb='4'>
      {children}
    </VStack>
  );
};

export default FormGroup;

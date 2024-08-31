import React from 'react';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

const FormInput = ({ label, type, refInput, placeholder, error }) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        ref={refInput}
        placeholder={placeholder}
        borderColor={error ? 'red.500' : undefined}
        focusBorderColor={error ? 'red.500' : undefined}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormInput;

import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const FormField = ({ name, label, placeholder, type, isRequired, error }) => {
  const { register } = useFormContext();

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        placeholder={placeholder}
        {...register(name, { required: isRequired ? 'Este campo es obligatorio' : false })}
      />
      {error && <Text color='red.500'>{error.message}</Text>}
    </FormControl>
  );
};

export default FormField;

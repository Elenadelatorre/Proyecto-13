import React from 'react';
import { FormControl, FormLabel, Input, Select, Textarea, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const FormField = ({ name, label, type = 'text', placeholder = '', options = [], isRequired = false, readOnly = false }) => {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <FormControl isInvalid={!!errors[name]} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {type === 'select' ? (
        <Select placeholder={placeholder} {...register(name)} isReadOnly={readOnly}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : type === 'textarea' ? (
        <Textarea placeholder={placeholder} {...register(name)} isReadOnly={readOnly} />
      ) : (
        <Input type={type} placeholder={placeholder} {...register(name)} isReadOnly={readOnly} />
      )}
      {errors[name] && <Text color='red.500'>{errors[name].message}</Text>}
    </FormControl>
  );
};

export default FormField;

import React from 'react';
import {
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react';
import { motosBrands } from '../../../utils/motosBrands';

const MotosBrandSelect = React.forwardRef(({ error }, ref) => (
  <FormControl isInvalid={!!error}>
    <FormLabel htmlFor='moto-brand'>
      ¿Qué marca de motos te interesa más?
    </FormLabel>
    <Select
      id='moto-brand'
      ref={ref}
      placeholder='Selecciona una marca'
      color='gray.500'
      borderColor={error ? 'red.500' : 'inherit'}
      focusBorderColor={error ? 'red.500' : 'blue.500'}
    >
      {motosBrands.map((brand) => (
        <option key={brand} value={brand}>
          {brand}
        </option>
      ))}
    </Select>
    {error && <FormErrorMessage>{error}</FormErrorMessage>}
  </FormControl>
));

export default MotosBrandSelect;

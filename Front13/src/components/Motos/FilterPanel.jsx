import React from 'react';
import { Box, Select, Button } from '@chakra-ui/react';

const FilterPanel = ({
  uniqueTipos,
  uniqueMarcas,
  filterType,
  setFilterType,
  filterMarca,
  setFilterMarca,
  onlyAvailable,
  setOnlyAvailable,
  light
}) => {
  return (
    <Box
      w='300px'
      p='20px'
      borderWidth='1px'
      borderRadius='lg'
      boxShadow='sm'
      backgroundColor={light ? 'white' : 'gray.600'}
    >
      <Button
        colorScheme='green'
        mb='10px'
        onClick={() => setOnlyAvailable((prev) => !prev)}
      >
        {onlyAvailable ? 'Mostrar Todas las Motos' : 'Mostrar Disponibles'}
      </Button>
      <Select
        placeholder='Filtrar por tipo de moto'
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        w='100%'
        mb='10px'
        color={light ? 'var(--rtc-color-4)' : 'gray.500'}
      >
        {uniqueTipos.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </Select>
      <Select
        placeholder='Filtrar por marca de moto'
        value={filterMarca}
        onChange={(e) => setFilterMarca(e.target.value)}
        w='100%'
        mb='10px'
        color={light ? 'var(--rtc-color-4)' : 'gray.500'}
      >
        {uniqueMarcas.map((marca) => (
          <option key={marca} value={marca}>
            {marca}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default FilterPanel;

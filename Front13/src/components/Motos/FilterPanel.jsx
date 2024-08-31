import React from 'react';
import { Box, Select, Input, Button } from '@chakra-ui/react';

const FilterPanel = ({
  uniqueTipos,
  filterType,
  setFilterType,
  filterMarca,
  setFilterMarca,
  onlyAvailable,
  setOnlyAvailable,
  applyFiltersAndSort,
  light
}) => {
  return (
    <Box
      w='300px'
      p='20px'
      borderWidth='1px'
      borderRadius='lg'
      boxShadow='sm'
      backgroundColor={light ? 'white' : 'gray.800'}
    >
      <Button
        colorScheme='green'
        mb='10px'
        onClick={() => setOnlyAvailable(prev => !prev)}
      >
        {onlyAvailable ? 'Mostrar Todas las Motos' : 'Mostrar Disponibles'}
      </Button>
      <Select
        placeholder='Filtrar por tipo de moto'
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        w='100%'
        mb='10px'
      >
        {uniqueTipos.map(tipo => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </Select>
      <Input
        placeholder='Buscar por marca'
        value={filterMarca}
        onChange={(e) => setFilterMarca(e.target.value)}
        mb='10px'
      />
      <Button colorScheme='yellow' onClick={applyFiltersAndSort}>
        Aplicar Filtros
      </Button>
    </Box>
  );
};

export default FilterPanel;

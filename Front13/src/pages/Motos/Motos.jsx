import React, { useState, useEffect, useContext } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ThemeContext } from '../../Providers/ThemeProvider';
import Loading from '../../components/Loading/Loading';
import FilterPanel from '../../components/Motos/FilterPanel';
import MotoCard from '../../components/Motos/MotoCard';

const Motos = () => {
  const { light } = useContext(ThemeContext);
  const [motos, setMotos] = useState([]);
  const [filteredMotos, setFilteredMotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [filterMarca, setFilterMarca] = useState('');
  const [uniqueTipos, setUniqueTipos] = useState([]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/motos');
        const data = await response.json();

        // Ordenar las motos por nombre de la marca
        const sortedMotos = data.sort((a, b) => a.marca.localeCompare(b.marca));
        setMotos(sortedMotos);
        setFilteredMotos(sortedMotos);

        // Obtener tipos únicos y ordenados para el filtro
        const tipos = [...new Set(data.flatMap(moto => moto.tipo))].sort();
        setUniqueTipos(tipos);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMotos();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [onlyAvailable, filterType, filterMarca]);

  const applyFiltersAndSort = () => {
    let filtered = motos;

    if (onlyAvailable) {
      filtered = filtered.filter(moto => moto.estado === 'Disponible');
    }

    if (filterType) {
      filtered = filtered.filter(moto => moto.tipo.includes(filterType));
    }

    if (filterMarca) {
      filtered = filtered.filter(moto =>
        moto.marca.toLowerCase().includes(filterMarca.toLowerCase())
      );
    }

    setFilteredMotos(filtered);
  };

  if (error) return <Text color='red.500'>Error: {error.message}</Text>;

  return (
    <Box p='50px' pt='50px' minH='100vh'>
      <Loading isVisible={loading} message="Cargando motos..." />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        mb='20px'
        justify='flex-start'
        align='flex-start'
        gap='10px'
      >
        <FilterPanel
          uniqueTipos={uniqueTipos}
          filterType={filterType}
          setFilterType={setFilterType}
          filterMarca={filterMarca}
          setFilterMarca={setFilterMarca}
          onlyAvailable={onlyAvailable}
          setOnlyAvailable={setOnlyAvailable}
          applyFiltersAndSort={applyFiltersAndSort}
          light={light}
        />
        <Flex
          wrap='wrap'
          justify='center'
          align='center'
          gap='20px'
          flex='1'
          direction={{ base: 'column', md: 'row' }}
        >
          {filteredMotos.map(moto => (
            <MotoCard key={moto._id} moto={moto} light={light} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Motos;

import React, { useState, useEffect, useContext } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ThemeContext } from '../../Providers/ThemeProvider';
import Loading from '../../components/Loading/Loading';
import FilterPanel from '../../components/Motos/FilterPanel';
import MotoCard from '../../components/Motos/MotoCard';
import { GET } from '../../utils/fetchData';
import { motosBrands } from '../../utils/motosBrands';

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
    console.log('Soy el componente Motos.jsx y me renderizo');
    const fetchMotos = async () => {
      try {
        const data = await GET('/motos');

        // Ordenar las motos por nombre de la marca
        const sortedMotos = data.sort((a, b) => a.marca.localeCompare(b.marca));
        setMotos(sortedMotos);
        setFilteredMotos(sortedMotos);

        // Obtener tipos únicos y ordenados para el filtro
        const tipos = [...new Set(data.flatMap((moto) => moto.tipo))].sort();
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
      filtered = filtered.filter((moto) => moto.estado === 'Disponible');
    }

    if (filterType) {
      filtered = filtered.filter((moto) => moto.tipo.includes(filterType));
    }

    if (filterMarca && filterMarca !== 'Todas') {
      filtered = filtered.filter((moto) =>
        moto.marca.toLowerCase().includes(filterMarca.toLowerCase())
      );
    }

    setFilteredMotos(filtered);
  };

  if (error) return <Text color='red.500'>Error: {error.message}</Text>;

  return (
    <Box p='50px' pt='50px' minH='100vh'>
      <Loading isVisible={loading} message='Cargando motos...' />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        mb='20px'
        justify='flex-start'
        align='flex-start'
        gap='10px'
      >
        <FilterPanel
          uniqueTipos={uniqueTipos}
          uniqueMarcas={motosBrands}
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
          {filteredMotos.length > 0 ? (
          filteredMotos.map((moto) => (
            <MotoCard key={moto._id} moto={moto} light={light} />
          ))
        ) : (
          <Text fontSize='lg' color='gray.800' textAlign='center' mt='50px' >
            No hay motos disponibles con los filtros seleccionados.
          </Text>
        )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Motos;

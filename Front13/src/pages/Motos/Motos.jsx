import React, { useState, useEffect, useContext } from 'react';
import { Text, Flex, Image, Spinner } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeContext } from '../../Providers/ThemeProvider';

const Motos = () => {
  const { light } = useContext(ThemeContext);
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/motos')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMotos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Text color='red.500'>Error: {error.message}</Text>;

  return (
    <Flex
      wrap='wrap'
      justify='center'
      align='center'
      gap='20px'
      p='50px'
      pt='200px'
    >
      {motos.map((moto) => (
        <RouterLink key={moto._id} to={`/motos/${moto._id}`}>
          <Image
            w='100px'
            src={moto.imagen}
            alt={moto.name}
            cursor='pointer'
            filter={`drop-shadow(0px 0px 2px ${
              light
                ? 'var(--rtc-light-mode-bg-negative)'
                : 'var(--rtc-dark-mode-bg-negative)'
            })`}
            transition='all 0.5s'
            _hover={{
              transform: 'scale(1.1)',
              filter: `drop-shadow(0px 0px 8px)`
            }}
          />
        </RouterLink>
      ))}
    </Flex>
  );
};

export default Motos;

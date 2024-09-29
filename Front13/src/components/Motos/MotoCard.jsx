import React from 'react';
import { Box, Text, Image, Badge, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import RatingStars from './RatingStars';

const MotoCard = ({ moto, light }) => {
  return (
    <RouterLink key={moto._id} to={`/motos/${moto._id}`}>
      <Box
        w='300px'
        h='500px'
        p='11px'
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        boxShadow='md'
        transition='transform 0.2s, box-shadow 0.2s'
        _hover={{
          transform: 'scale(1.05)',
          boxShadow: 'lg'
        }}
        backgroundColor={light ? 'white' : 'gray.600'}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box flex='1'>
          <Text
            fontSize='xl'
            fontWeight='bold'
            mb='2'
            color={light ? 'var(--rtc-color-4)' : 'white'}
          >
            {moto.marca}
          </Text>
          <Image
            src={moto.imagen}
            alt={moto.marca}
            w='full'
            h='150px'
            objectFit='contain'
            mb='10px'
            borderRadius='md'
          />
          <Badge
            colorScheme={moto.estado === 'Disponible' ? 'green' : 'red'}
            fontSize='0.8em'
            p='2'
            borderRadius='md'
            mb='2'
          >
            {moto.estado}
          </Badge>
        </Box>
        <Box p='6'>
          <Text
            fontSize='lg'
            fontWeight='bold'
            color={light ? 'var(--rtc-color-4)' : 'white'}
            mb='2'
          >
            {moto.modelo}
          </Text>
          <Text fontSize='md' color={light ? 'gray.500' : 'white'} mb='2'>
            Tipo: {moto.tipo.join(', ')}
          </Text>
          <Text fontSize='md' color={light ? 'gray.500' : 'white'} mb='2'>
            Año: {moto.año}
          </Text>
          <Box display='flex' alignItems='center' mb='2'>
            <RatingStars rating={moto.averageRating} />
            <Text fontSize='md' color='gray.500' ml='2'>
              ({moto.reviewCount}{' '}
              {moto.reviewCount === 1 ? 'reseña' : 'reseñas'})
            </Text>
          </Box>
          <Text
            fontSize='xl'
            fontWeight='bold'
            color='red.500'
            bg={light ? 'none' : 'white'}
            borderRadius='md'
            
            textAlign='center'
            mt='4'
          >
            {new Intl.NumberFormat('es-ES', {
              style: 'currency',
              currency: 'EUR'
            }).format(moto.precio)}{' '}
            / día
          </Text>
        </Box>
      </Box>
    </RouterLink>
  );
};

export default MotoCard;

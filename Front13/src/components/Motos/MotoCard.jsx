import React from 'react';
import { Box, Text, Image, Badge, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import RatingStars from './RAtingStars';


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
        backgroundColor={light ? 'white' : 'gray.800'}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box flex='1'>
          <Text
            fontSize='xl'
            fontWeight='bold'
            mb='2'
            color='var(--rtc-color-4)'
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
            color='var(--rtc-color-4)'
            mb='2'
          >
            {moto.modelo}
          </Text>
          <Text fontSize='md' color='gray.500' mb='2'>
            Tipo: {moto.tipo.join(', ')}
          </Text>
          <Text fontSize='md' color='gray.500' mb='2'>
            Año: {moto.año}
          </Text>
          <Box display='flex' alignItems='center' mb='2'>
            <RatingStars rating={moto.averageRating} />
            <Text fontSize='md' color='gray.500' ml='2'>
              ({moto.reviewCount} {moto.reviewCount === 1 ? 'reseña' : 'reseñas'})
            </Text>
          </Box>
          <Text
            fontSize='xl'
            fontWeight='bold'
            color='red.500'
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

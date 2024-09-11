import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const ReviewsList = ({ reviews }) => {
  return (
    <>
      {Array.isArray(reviews) && reviews.length > 0 ? (
        reviews.map((review) => (
          <Box
            key={review._id}
            borderWidth='1px'
            borderRadius='md'
            p={6}
            width='500px'
            shadow='md'
            mb={4}
          >
            <Text fontSize='lg' fontWeight='bold'>
              Moto: {review.moto.marca} {review.moto.modelo}
            </Text>
            <Text>Comentario: {review.comentario}</Text>
            <Text>Calificación: {review.calificacion} estrellas</Text>
          </Box>
        ))
      ) : (
        <Text>No tienes reseñas.</Text>
      )}
    </>
  );
};

export default ReviewsList;

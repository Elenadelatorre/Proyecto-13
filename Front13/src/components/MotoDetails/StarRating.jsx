import { Box } from '@chakra-ui/react';
import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  return (
    <Box display='flex' alignItems='center'>
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar key={index} color={index < rating ? 'gold' : 'gray'} />
      ))}
    </Box>
  );
};

export default StarRating;

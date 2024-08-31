import React from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Flex>
      {[...Array(fullStars)].map((_, index) => (
        <Icon key={`full-${index}`} as={FaStar} color='yellow.400' />
      ))}
      {hasHalfStar && <Icon as={FaStarHalfAlt} color='yellow.400' />}
      {[...Array(emptyStars)].map((_, index) => (
        <Icon key={`empty-${index}`} as={FaRegStar} color='yellow.400' />
      ))}
    </Flex>
  );
};

export default RatingStars;

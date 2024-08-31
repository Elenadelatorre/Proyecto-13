import React from 'react';
import { Spinner, Box, Text } from '@chakra-ui/react';

const Loading = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="rgba(0, 0, 0, 0.5)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="9999"
    >
      <Box textAlign="center" color="white">
        <Spinner size="xl" thickness="4px" speed="0.65s" />
        {message && <Text mt={4}>{message}</Text>}
      </Box>
    </Box>
  );
};

export default Loading;

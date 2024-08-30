import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const MotoStatus = ({ estado }) => {
  const estadoColor = estado === 'Disponible' ? 'green.500' : 'red.500';

  return (
    <Box
      position='absolute'
      top='4'
      right='4'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        width='12px'
        height='12px'
        borderRadius='full'
        bg={estadoColor}
        mr='2'
      />
      <Text fontSize='sm' color='var(--rtc-color-4)'>
        {estado}
      </Text>
    </Box>
  );
};

export default MotoStatus;

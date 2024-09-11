import { VStack, Text, Image, Divider, Button, Box } from '@chakra-ui/react';
import StarRating from '../../components/MotoDetails/StarRating';

const MotoInfo = ({
  moto,
  isReserved,
  handleCancelReservation,
  openReserveModal,
  openContactModal
}) => (
  <VStack spacing='4' align='stretch'>
    <Text fontSize='3xl' fontWeight='bold' color='var(--rtc-color-4)'>
      {moto.marca}
    </Text>
    <Text fontSize='xl' fontWeight='bold' color='var(--rtc-color-4)'>
      {moto.modelo} ({moto.año})
    </Text>
    <Image
      src={moto.imagen || '/default-image.png'}
      alt={`${moto.marca} ${moto.modelo}`}
      boxSize={{ base: '300px', md: '500px' }}
      objectFit='contain'
      maxWidth='100%'
      maxHeight='100%'
      m='auto'
    />
    <Text
      fontSize='3xl'
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
    <Button
      size='lg'
      mt='4'
      colorScheme={isReserved ? 'red' : 'green'}
      onClick={isReserved ? handleCancelReservation : openReserveModal}
    >
      {isReserved ? 'Cancelar Reserva' : 'Reservar Moto'}
    </Button>
    <Text fontSize='lg' fontWeight='medium' color='var(--rtc-color-4)'>
      <strong>Descripción:</strong> {moto.descripcion}
    </Text>
    <Text fontSize='lg' color='var(--rtc-color-4)'>
      <strong>Kilómetros:</strong> {moto.km} km
    </Text>
    <Text fontSize='lg' color='var(--rtc-color-4)'>
      <strong>Tipo:</strong> {moto.tipo.join(', ')}
    </Text>
    <Divider />
    <Box>
      <Text fontSize='lg' fontWeight='medium' color='var(--rtc-color-4)'>
        <strong>Propietario:</strong>
      </Text>
      <Text fontSize='md' color='var(--rtc-color-4)'>
        Nombre: {moto.propietario?.nombre || 'No disponible'}
      </Text>
      <Text fontSize='md' color='var(--rtc-color-4)'>
        Email: {moto.propietario?.email || 'No disponible'}
      </Text>
      <Button
        size='sm'
        mt='2'
        colorScheme='yellow'
        bg='var(--rtc-color-2)'
        onClick={openContactModal}
      >
        Contactar
      </Button>
    </Box>

    <Divider />

    <Text fontSize='lg' fontWeight='medium' color='var(--rtc-color-4)'>
      <strong>Reseñas:</strong>
    </Text>

    {moto.reviews && moto.reviews.length > 0 ? (
      moto.reviews.map((review, index) => (
        <Box key={index} p='4' borderWidth='1px' borderRadius='md' mb='2'>
          <Text fontSize='md' color='var(--rtc-color-4)'>
            <strong>Comentario:</strong> {review.comentario}
          </Text>
          <Box display='flex' alignItems='center' mt='2'>
            <StarRating rating={review.calificacion} />
            <Text fontSize='md' color='var(--rtc-color-4)' ml='2'>
              {review.calificacion}
            </Text>
          </Box>
        </Box>
      ))
    ) : (
      <Text fontSize='md' color='var(--rtc-color-4)'>
        No hay reseñas disponibles.
      </Text>
    )}
  </VStack>
);

export default MotoInfo;

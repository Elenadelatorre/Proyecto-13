import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Image, Spinner, VStack, Divider, Button, useToast } from '@chakra-ui/react';
import useMoto from '../../hooks/useMoto';
import MotoStatus from '../../components/MotoDetails/MotoStatus';
import StarRating from '../../components/MotoDetails/StarRating';
import ContactModal from '../../components/MotoDetails/ContactModal';

const MotoDetails = () => {
  const { id } = useParams();
  const { moto, loading, error, setMoto } = useMoto(id);
  const toast = useToast();
  const [contactMessage, setContactMessage] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleSendMessage = () => {
    toast({
      title: 'Mensaje Enviado',
      description: 'Tu mensaje ha sido enviado exitosamente.',
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    setContactMessage('');
    closeContactModal();
  };

  const handleReserve = () => {
    if (moto.estado === 'Disponible') {
      setMoto(prevMoto => ({
        ...prevMoto,
        estado: 'No disponible'
      }));
      toast({
        title: 'Reserva Confirmada',
        description: 'Has reservado la moto exitosamente.',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  if (loading) return <Spinner />;
  if (error) return <Text color='red.500'>Error: {error.message}</Text>;
  if (!moto) return <Text color='red.500'>Moto no encontrada</Text>;

  return (
    <Box display='flex' alignItems='center' justifyContent='center' minH='100vh' p='5'>
      <Box p='8' borderRadius='md' boxShadow='md' maxW='container.md' w='full' bg='white' position='relative'>
        <MotoStatus estado={moto.estado} />
        
        <VStack spacing='4' align='stretch'>
          <Text fontSize='3xl' fontWeight='bold' color='var(--rtc-color-4)'>
            {moto.marca} {moto.modelo} ({moto.año})
          </Text>

          <Image
            src={moto.imagen || '/default-image.png'}
            alt={`${moto.marca} ${moto.modelo}`}
            boxSize={{ base: '300px', md: '500px' }}
            objectFit='cover'
            m='auto'
          />

          <Text fontSize='3xl' fontWeight='bold' color='red.500' textAlign='center' mt='4'>
            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(moto.precio)} / día
          </Text>

          <Button
            size='lg'
            mt='4'
            colorScheme={moto.estado === 'No disponible' ? 'red' : 'green'}
            onClick={handleReserve}
            isDisabled={moto.estado !== 'Disponible'}
          >
            {moto.estado === 'No disponible' ? 'Moto Reservada' : 'Reservar Moto'}
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
            <Button size='sm' mt='2' colorScheme='yellow' bg='var(--rtc-color-2)' onClick={openContactModal}>
              Contactar
            </Button>
          </Box>

          <Divider />

          <Text fontSize='lg' fontWeight='medium' color='var(--rtc-color-4)'>
            <strong>Reseñas:</strong>
          </Text>

          {moto.reviews.length > 0 ? (
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

        <ContactModal
          isOpen={isContactModalOpen}
          onClose={closeContactModal}
          contactMessage={contactMessage}
          setContactMessage={setContactMessage}
          handleSendMessage={handleSendMessage}
        />
      </Box>
    </Box>
  );
};

export default MotoDetails;

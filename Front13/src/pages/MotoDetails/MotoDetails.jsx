import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Image, VStack, Divider, Button, useToast } from '@chakra-ui/react';
import { useMotos } from '../../context/MotoContext';
import MotoStatus from '../../components/MotoDetails/MotoStatus';
import StarRating from '../../components/MotoDetails/StarRating';
import ContactModal from '../../components/MotoDetails/ContactModal';
import Loading from '../../components/Loading/Loading';
import { actionTypes } from '../../context/motoReducer';

const MotoDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useMotos();
  const moto = state.motos.find(m => m._id === id);
  const { loading, error } = state;
  const toast = useToast();
  const [contactMessage, setContactMessage] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isReserved, setIsReserved] = useState(false);

  // Efecto para inicializar el estado basado en localStorage
  useEffect(() => {
    const storedMotoState = localStorage.getItem('moto_reservations');
    if (storedMotoState) {
      const reservations = JSON.parse(storedMotoState);
      const motoReservation = reservations.find(reservation => reservation.id === id);
      if (motoReservation) {
        setIsReserved(motoReservation.estado === 'No disponible');
      }
    }
  }, [id]);

  // Efecto para actualizar el estado de la moto después de realizar una reserva o cancelación
  useEffect(() => {
    if (!moto) return;

    const storedMotoState = localStorage.getItem('moto_reservations');
    if (storedMotoState) {
      const reservations = JSON.parse(storedMotoState);
      const motoReservation = reservations.find(reservation => reservation.id === id);
      if (motoReservation) {
        setIsReserved(motoReservation.estado === 'No disponible');
      }
    }
  }, [moto, id]);

  useEffect(() => {
    if (!moto) {
      fetch(`http://localhost:3000/api/v1/motos/${id}`)
        .then(response => response.json())
        .then(data => {
          dispatch({ type: actionTypes.UPDATE_MOTO, payload: data });
        })
        .catch(error => {
          console.error('Error fetching moto:', error);
        });
    }
  }, [id, moto, dispatch]);

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

  const handleReserve = async () => {
    if (!isReserved) {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/motos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...moto, estado: 'No disponible' })
        });
        if (response.ok) {
          dispatch({ type: actionTypes.RESERVE_MOTO, payload: { ...moto, estado: 'No disponible' } });

          // Guardar en localStorage
          const storedMotoState = localStorage.getItem('moto_reservations');
          let reservations = storedMotoState ? JSON.parse(storedMotoState) : [];
          reservations = reservations.filter(reservation => reservation.id !== id); // Eliminar cualquier reserva previa para esta moto
          reservations.push({ id, estado: 'No disponible' });
          localStorage.setItem('moto_reservations', JSON.stringify(reservations));

          setIsReserved(true);
          toast({
            title: 'Reserva Confirmada',
            description: 'Has reservado la moto exitosamente.',
            status: 'success',
            duration: 5000,
            isClosable: true
          });
        } else {
          toast({
            title: 'Error',
            description: 'Hubo un problema al reservar la moto.',
            status: 'error',
            duration: 5000,
            isClosable: true
          });
        }
      } catch (error) {
        console.error('Error reserving moto:', error);
      }
    }
  };

  const handleCancelReservation = async () => {
    if (isReserved) {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/motos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...moto, estado: 'Disponible' })
        });
        if (response.ok) {
          dispatch({ type: actionTypes.RESERVE_MOTO, payload: { ...moto, estado: 'Disponible' } });

          // Eliminar del localStorage
          const storedMotoState = localStorage.getItem('moto_reservations');
          if (storedMotoState) {
            let reservations = JSON.parse(storedMotoState);
            reservations = reservations.filter(reservation => reservation.id !== id);
            localStorage.setItem('moto_reservations', JSON.stringify(reservations));
          }

          setIsReserved(false);
          toast({
            title: 'Reserva Cancelada',
            description: 'Has cancelado la reserva de la moto.',
            status: 'success',
            duration: 5000,
            isClosable: true
          });
        } else {
          toast({
            title: 'Error',
            description: 'Hubo un problema al cancelar la reserva.',
            status: 'error',
            duration: 5000,
            isClosable: true
          });
        }
      } catch (error) {
        console.error('Error canceling reservation:', error);
      }
    }
  };

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  if (loading) return <Loading isVisible={loading} message="Cargando detalles de la moto..." />;
  if (error) return <Text color='red.500'>Error: {error.message}</Text>;
  if (!moto) return <Text color='red.500'>Moto no encontrada</Text>;

  return (
    <Box display='flex' alignItems='center' justifyContent='center' minH='100vh' p='5'>
      <Box p='8' borderRadius='md' boxShadow='md' maxW='container.md' w='full' bg='white' position='relative'>
        <MotoStatus estado={isReserved ? 'No disponible' : 'Disponible'} />

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

          <Text fontSize='3xl' fontWeight='bold' color='red.500' textAlign='center' mt='4'>
            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(moto.precio)} / día
          </Text>

          <Button
            size='lg'
            mt='4'
            colorScheme={isReserved ? 'red' : 'green'}
            onClick={isReserved ? handleCancelReservation : handleReserve}
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
            <Button size='sm' mt='2' colorScheme='yellow' bg='var(--rtc-color-2)' onClick={openContactModal}>
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


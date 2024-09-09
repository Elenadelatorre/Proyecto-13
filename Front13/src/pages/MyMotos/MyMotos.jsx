import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Image,
  Button,
  Textarea,
  Select,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import Loading from '../../components/Loading/Loading';
import useToastMessage from '../../hooks/useToastMessage';

const MyMotos = () => {
  const [reservas, setReservas] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({
    motoId: '',
    comentario: '',
    calificacion: 1
  });

const showToast = useToastMessage();


  useEffect(() => {
    const fetchReservasYReviews = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('user');
        if (!userId) {
          throw new Error('Usuario no autenticado');
        }

        // Fetch de reservas
        const responseReservas = await fetch(
          `http://localhost:3000/api/v1/reservas/${userId}/reservas-user`
        );
        if (!responseReservas.ok) {
          throw new Error('Error en la solicitud de reservas');
        }
        const reservasData = await responseReservas.json();
        setReservas(reservasData);

        // Fetch de reseñas
        const responseReviews = await fetch(
          `http://localhost:3000/api/v1/reviews/${userId}/reviews-user`
        );
        if (!responseReviews.ok) {
          throw new Error('Error en la solicitud de reseñas');
        }
        const reviewsData = await responseReviews.json();
        setReviews(reviewsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservasYReviews();
  }, []);

  const submitReview = async () => {
    if (!newReview.comentario || !newReview.calificacion) {
      alert('Completa todos los campos');
      return;
    }
    console.log(newReview);
    try {
      const response = await fetch('http://localhost:3000/api/v1/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          moto: newReview.motoId,
          comentario: newReview.comentario,
          calificacion: newReview.calificacion,
          user: localStorage.getItem('user')
        })
      });

      if (!response.ok) {
        throw new Error('Error al enviar la reseña');
      }

      const data = await response.json();
      showToast('Reseña enviada', 'Tu reseña ha sido enviada exitosamente' ,'success'); 
      setNewReview({ motoId: '', comentario: '', calificacion: 1 });
      // Puedes actualizar el estado de reviews si es necesario
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading)
    return (
      <Loading isVisible={loading} message='Cargando reservas y reseñas...' />
    );

  return (
    <Box p='4' maxW='800px' mx='auto' minH='100vh' pt='50px'>
      <VStack spacing={6} align='stretch'>
        <Box>
          <Heading size='xl' mb='4'>
            Reservas
          </Heading>
          {reservas.length > 0 ? (
            reservas.map((reserva) => (
              <Box
                key={reserva._id}
                p='4'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
              >
                <Image
                  src={reserva.moto.imagen || '/default-image.png'}
                  alt={`${reserva.moto.marca} ${reserva.moto.modelo}`}
                  boxSize={{ base: '200px', md: '400px' }}
                  objectFit='contain'
                  maxWidth='100%'
                  maxHeight='100%'
                  m='auto'
                />
                <Text>
                  <strong>Moto:</strong> {reserva.moto.marca}{' '}
                  {reserva.moto.modelo}
                </Text>
                <Text>
                  <strong>Fecha de inicio:</strong>{' '}
                  {new Date(reserva.fechaInicio).toLocaleDateString()}
                </Text>
                <Text>
                  <strong>Fecha de fin:</strong>{' '}
                  {new Date(reserva.fechaFin).toLocaleDateString()}
                </Text>
                <Text>
                  <strong>Precio:</strong> {reserva.precioTotal} €
                </Text>
                <Text>
                  <strong>Comentarios:</strong> {reserva.comentarios}
                </Text>
                <Button
                  mt='4'
                  colorScheme='yellow'
                  bg='var(--rtc-color-2)'
                  onClick={() =>
                    setNewReview({ ...newReview, motoId: reserva.moto._id })
                  }
                >
                  Dejar Reseña
                </Button>
              </Box>
            ))
          ) : (
            <Text>No tienes reservas todavía.</Text>
          )}
        </Box>

        {/* Formulario de Reseña */}
        {newReview.motoId && (
          <Box mt='6' p='4' borderWidth='1px' borderRadius='md' boxShadow='md'>
            <Heading size='md' mb='4'>
              Deja una Reseña
            </Heading>
            <Text>
              <strong>Moto:</strong>{' '}
              {
                reservas.find((r) => r.moto._id === newReview.motoId)?.moto
                  .modelo
              }
            </Text>
            <FormControl mt='4'>
              <FormLabel>Comentario</FormLabel>
              <Textarea
                placeholder='Escribe tu comentario aquí...'
                value={newReview.comentario}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    comentario: e.target.value
                  }))
                }
              />
            </FormControl>
            <FormControl mt='4'>
              <FormLabel>Calificación</FormLabel>
              <Select
                value={newReview.calificacion}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    calificacion: parseInt(e.target.value)
                  }))
                }
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button
              mt='4'
              colorScheme='yellow'
              bg='var(--rtc-color-2)'
              onClick={submitReview}
            >
              Enviar Reseña
            </Button>
          </Box>
        )}
        <Divider />
        <Box>
          <Heading size='xl' mb='4'>
            Reseñas
          </Heading>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Box
                key={index}
                p='4'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
              >
                <Text>
                  <strong>Reseña de:</strong> {review.user}
                </Text>
                <Text>
                  <strong>Comentario:</strong> {review.comentario}
                </Text>
                <Text>
                  <strong>Puntuación:</strong> {review.calificacion}/5
                </Text>
              </Box>
            ))
          ) : (
            <Text>No tienes reseñas todavía.</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default MyMotos;

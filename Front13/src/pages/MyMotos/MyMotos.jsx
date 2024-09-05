import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  useToast,
  Spinner,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const MyMotos = () => {
  const [reservas, setReservas] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservasYReviews = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user._id) {
          throw new Error('Usuario no autenticado');
        }

        // Fetch de reservas
        const responseReservas = await fetch(`http://localhost:3000/api/v1/reservas/${user._id}/reservas`);
        const reservasData = await responseReservas.json();
        setReservas(reservasData);

        // Fetch de reseñas
        const responseReviews = await fetch(`http://localhost:3000/api/v1/reviews/${user._id}/reviews`);
        const reviewsData = await responseReviews.json();
        setReviews(reviewsData);

      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReservasYReviews();
  }, [toast]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p="4" maxW="800px" mx="auto">
      <Heading mb="6">Mis Reservas y Reseñas</Heading>
      
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="md" mb="4">Reservas</Heading>
          {reservas.length > 0 ? (
            reservas.map((reserva, index) => (
              <Box key={index} p="4" borderWidth="1px" borderRadius="md" boxShadow="md">
                <Text><strong>Nombre del cliente:</strong> {reserva.clienteNombre}</Text>
                <Text><strong>Fecha de inicio:</strong> {new Date(reserva.fechaInicio).toLocaleDateString()}</Text>
                <Text><strong>Fecha de fin:</strong> {new Date(reserva.fechaFin).toLocaleDateString()}</Text>
                <Text><strong>Precio:</strong> €{reserva.precio}</Text>
              </Box>
            ))
          ) : (
            <Text>No tienes reservas todavía.</Text>
          )}
        </Box>
        <Divider />

        <Box>
          <Heading size="md" mb="4">Reseñas</Heading>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Box key={index} p="4" borderWidth="1px" borderRadius="md" boxShadow="md">
                <Text><strong>Reseña de:</strong> {review.clienteNombre}</Text>
                <Text><strong>Comentario:</strong> {review.comentario}</Text>
                <Text><strong>Puntuación:</strong> {review.puntuacion}/5</Text>
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

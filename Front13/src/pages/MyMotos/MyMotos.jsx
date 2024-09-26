import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Divider,
  useDisclosure
} from '@chakra-ui/react';
import Loading from '../../components/Loading/Loading';
import useToastMessage from '../../hooks/useToastMessage';
import { POST, GET } from '../../utils/fetchData';
import ReservasList from '../../components/MyMotos/ReservasList';
import ReviewsList from '../../components/MyMotos/ReviewsList';
import AddReviewModal from '../../components/MyMotos/AddReviewModal';

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useToastMessage();

  useEffect(() => {
    console.log('Soy el componente MyMotos.jsx y me renderizo');
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user._id : null;
        console.log('User ID:', userId);
        if (!userId) {
          throw new Error('Usuario no autenticado');
        }

        const reservasData = await GET(`/reservas/${userId}/reservas-user`);
        setReservas(reservasData);

        const reviewsData = await GET(`/reviews/${userId}/reviews-propietario`);
        setReviews(reviewsData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async () => {
    try {
      const selectedReserva = reservas.find(
        (reserva) => reserva.moto._id === newReview.motoId
      );

      if (!selectedReserva) {
        showToast('Error', 'Moto no seleccionada', 'error');
        return;
      }

      await POST('/reviews', {
        user: localStorage.getItem('user'),
        motoId: newReview.motoId,
        comentario: newReview.comentario,
        calificacion: newReview.calificacion
      });

      showToast('Reseña añadida', 'Reseña añadida correctamente', 'success');
      setNewReview({ motoId: '', comentario: '', calificacion: 1 });
      onClose();
    } catch (err) {
      showToast(
        'Error al añadir reseña',
        'Hubo un error al añadir la reseña',
        'error'
      );
    }
  };

  return (
    <Box p='50px' mb='80px'>
      <Loading isVisible={loading} message='Cargando reservas y reseñas...' />
      {error && <Text color='red.500'>{error}</Text>}
      {!loading && !error && (
        <VStack spacing={4}>
          <Heading size='xl' mb='4'>
            Reservas
          </Heading>
          <ReservasList
            reservas={reservas}
            onOpen={onOpen}
            setNewReview={setNewReview}
          />
          <Divider my={4} />
          <Heading size='xl' mb='4'>
            Reseñas Recibidas
          </Heading>
          <ReviewsList reviews={reviews} />
        </VStack>
      )}

      <AddReviewModal
        isOpen={isOpen}
        onClose={onClose}
        newReview={newReview}
        handleReviewChange={handleReviewChange}
        handleReviewSubmit={handleReviewSubmit}
        reservas={reservas}
      />
    </Box>
  );
};

export default MyMotos;

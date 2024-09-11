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
  FormLabel,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import Loading from '../../components/Loading/Loading';
import useToastMessage from '../../hooks/useToastMessage';
import { POST, GET } from '../../utils/fetchData';

const MyMotos = () => {
  const [reservas, setReservas] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({
    motoId: '',
    comentario: '',
    calificacion: 1,
    propietario: ''
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useToastMessage();

  useEffect(() => {
    const fetchReservasYReviews = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('user');
        if (!userId) {
          throw new Error('Usuario no autenticado');
        }
        console.log('UserId obtenido:', userId);

        // GET para obtener reservas
        const reservasData = await GET(`/reservas/${userId}/reservas-user`);
        setReservas(reservasData);

        // GET para obtener las reseñas de las motos del usuario
        const reviewsData = await GET(`/reviews/${userId}`);
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservasYReviews();
  }, []);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async () => {
    try {
      // Asegúrate de que el campo `propietario` sea el ID del propietario de la moto
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
    <Box p={5}>
      <Divider my={4} />
      {loading && <Loading />}
      {error && <Text color='red.500'>{error}</Text>}
      {!loading && !error && (
        <VStack spacing={4}>
          <Heading size='xl' mb='4'>
            Reservas
          </Heading>
          {reservas.map((reserva) => (
            <Box
              key={reserva._id}
              borderWidth='1px'
              borderRadius='md'
              p={6}
              width='500px'
              shadow='md'
            >
              <Flex direction='row' align='center'>
                <Image
                  src={reserva.moto.imagen}
                  boxSize='100px'
                  objectFit='cover'
                  borderRadius='md'
                  alt='Moto'
                  w='100'
                />
                <Box ml={4}>
                  <Text fontSize='lg' fontWeight='bold'>
                    {reserva.moto.marca} {reserva.moto.modelo}
                  </Text>
                  <Text>
                    Fecha de inicio:{' '}
                    {new Date(reserva.fechaInicio).toLocaleDateString()}
                  </Text>
                  <Text>
                    Fecha de fin:{' '}
                    {new Date(reserva.fechaFin).toLocaleDateString()}
                  </Text>
                  <Text>Precio total: {reserva.precioTotal} €</Text>
                </Box>
              </Flex>
              <Button
                mt={4}
                colorScheme='yellow'
                bg='var(--rtc-color-2)'
                onClick={() => {
                  setNewReview((prev) => ({
                    ...prev,
                    motoId: reserva.moto._id
                  }));
                  onOpen();
                }}
              >
                Añadir Reseña
              </Button>
            </Box>
          ))}
        </VStack>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Añadir Reseña</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Moto</FormLabel>
              <Select
                name='motoId'
                value={newReview.motoId}
                onChange={handleReviewChange}
              >
                <option value=''>Selecciona una moto</option>
                {reservas.map((reserva) => (
                  <option key={reserva.moto._id} value={reserva.moto._id}>
                    {reserva.moto.marca} {reserva.moto.modelo}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Comentario</FormLabel>
              <Textarea
                name='comentario'
                value={newReview.comentario}
                onChange={handleReviewChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Calificación</FormLabel>
              <Select
                name='calificacion'
                value={newReview.calificacion}
                onChange={handleReviewChange}
              >
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='yellow'
              bg='var(--rtc-color-2)'
              onClick={handleReviewSubmit}
            >
              Enviar
            </Button>
            <Button variant='outline' ml={3} onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyMotos;

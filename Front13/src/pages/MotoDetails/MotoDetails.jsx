import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, useToast } from '@chakra-ui/react';
import { useMotos } from '../../context/MotoContext';
import { useAuth } from '../../context/AuthContext';
import MotoStatus from '../../components/MotoDetails/MotoStatus';
import MotoInfo from '../../components/MotoDetails/MotoInfo';
import ReserveModal from '../../components/MotoDetails/ReserveModal';
import ContactModal from '../../components/MotoDetails/ContactModal';
import Loading from '../../components/Loading/Loading';
import { actionTypes } from '../../context/motoReducer';

const MotoDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useMotos();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const moto = state.motos.find((m) => m._id === id);
  const { loading, error } = state;
  const toast = useToast();
  const [contactMessage, setContactMessage] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false); // Estado para el modal de reserva
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [precioTotal, setPrecioTotal] = useState(0);
  const [comentarios, setComentarios] = useState('');

  // Función para calcular el precio total basado en las fechas seleccionadas
  const calcularPrecioTotal = () => {
    if (!fechaInicio || !fechaFin) return 0;

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Calcula la diferencia en días
    const diferenciaEnDias = (fin - inicio) / (1000 * 60 * 60 * 24);

    // Asegúrate de que al menos haya un día seleccionado
    const diasDeReserva = Math.max(diferenciaEnDias, 1);

    // Calcula el precio total multiplicando por el precio por día
    const total = diasDeReserva * moto.precio;
    setPrecioTotal(total);
  };
  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  // Recalcula el precio total cuando cambian las fechas de inicio o fin
  useEffect(() => {
    calcularPrecioTotal();
  }, [fechaInicio, fechaFin]); // Recalcula cada vez que las fechas cambien

  // Efecto para inicializar el estado basado en localStorage
  useEffect(() => {
    const storedMotoState = localStorage.getItem('moto_reservations') || '[]';
    if (storedMotoState) {
      const reservations = JSON.parse(storedMotoState);
      const motoReservation = reservations.find(
        (reservation) => reservation.id === id
      );
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
      const motoReservation = reservations.find(
        (reservation) => reservation.id === id
      );
      if (motoReservation) {
        setIsReserved(motoReservation.estado === 'No disponible');
      }
    }
  }, [moto, id]);

  useEffect(() => {
    const fetchMotoData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/motos/${id}`
        );
        const data = await response.json();
        dispatch({ type: actionTypes.UPDATE_MOTO, payload: data });

        // Verificar si la moto está reservada en la base de datos
        if (data.estado === 'No disponible') {
          setIsReserved(true);
        } else {
          setIsReserved(false);
        }
      } catch (error) {
        console.error('Error fetching moto:', error);
        toast({
          title: 'Error',
          description: 'Hubo un problema al cargar los detalles de la moto.',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
    };

    fetchMotoData();
  }, [id, dispatch]);

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
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!isReserved) {
      try {
        const userId = localStorage.getItem('user'); // Obtén el ID del usuario desde localStorage

        const response = await fetch(`http://localhost:3000/api/v1/reservas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            moto: id,
            usuario: userId, // Envío del ID del usuario como una cadena
            fechaInicio, // Puedes ajustar estas fechas según el input del usuario
            fechaFin,
            precioTotal: moto.precio * 2,
            comentarios
          })
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Reserva creada:', data);
          console.log('Moto antes de actualizar:', moto);

          // Actualizar el estado de la moto a 'No disponible'
          const responseMoto = await fetch(
            `http://localhost:3000/api/v1/motos/${id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({ estado: 'No disponible' })
            }
          );

          if (responseMoto.ok) {
            dispatch({
              type: actionTypes.RESERVE_MOTO,
              payload: { ...moto, estado: 'No disponible' }
            });

            setIsReserved(true);

            toast({
              title: 'Reserva Confirmada',
              description: 'Has reservado la moto exitosamente.',
              status: 'success',
              duration: 5000,
              isClosable: true
            });

            setIsReserveModalOpen(false); // Cerrar el modal después de la reserva
          } else {
            const errorData = await responseMoto.json();
            toast({
              title: 'Error',
              description: `Hubo un problema al actualizar el estado de la moto: ${errorData.message}`,
              status: 'error',
              duration: 5000,
              isClosable: true
            });
          }
        } else {
          const errorData = await response.json();
          toast({
            title: 'Error',
            description: `Hubo un problema al reservar la moto: ${errorData.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true
          });
        }
      } catch (error) {
        console.error('Error reservando moto:', error);
        toast({
          title: 'Error',
          description: 'Hubo un problema inesperado al reservar la moto.',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
    }
  };

  const handleCancelReservation = async () => {
    if (isReserved) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/motos/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ ...moto, estado: 'Disponible' })
          }
        );
        if (response.ok) {
          dispatch({
            type: actionTypes.RESERVE_MOTO,
            payload: { ...moto, estado: 'Disponible' }
          });
          setIsReserved(false);

          // Eliminar del localStorage
          const storedMotoState = localStorage.getItem('moto_reservations');
          let reservations = JSON.parse(storedMotoState);
          reservations = reservations.filter(
            (reservation) => reservation.id !== id
          );
          localStorage.setItem(
            'moto_reservations',
            JSON.stringify(reservations)
          );

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

  if (loading)
    return (
      <Loading isVisible={loading} message='Cargando detalles de la moto...' />
    );
  if (error) return <Text color='red.500'>Error: {error.message}</Text>;
  if (!moto) return <Text color='red.500'>Moto no encontrada</Text>;

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      minH='100vh'
      p='5'
    >
      <Box
        p='8'
        borderRadius='md'
        boxShadow='md'
        maxW='container.md'
        w='full'
        bg='white'
        position='relative'
      >
        <MotoStatus estado={isReserved ? 'No disponible' : 'Disponible'} />
        <MotoInfo
          moto={moto}
          isReserved={isReserved}
          handleCancelReservation={handleCancelReservation}
          openReserveModal={() => setIsReserveModalOpen(true)}
          openContactModal={() => setIsContactModalOpen(true)}
        />
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          contactMessage={contactMessage}
          setContactMessage={setContactMessage}
          handleSendMessage={handleSendMessage}
        />
        <ReserveModal
          isReserveModalOpen={isReserveModalOpen}
          closeReserveModal={() => setIsReserveModalOpen(false)}
          fechaInicio={fechaInicio}
          setFechaInicio={setFechaInicio}
          fechaFin={fechaFin}
          setFechaFin={setFechaFin}
          comentarios={comentarios}
          setComentarios={setComentarios}
          precioTotal={precioTotal}
          handleReserve={handleReserve}
        />
      </Box>
    </Box>
  );
};

export default MotoDetails;

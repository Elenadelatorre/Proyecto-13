import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import { useMotos } from '../../context/MotoContext';
import { useAuth } from '../../context/AuthContext';
import MotoStatus from '../../components/MotoDetails/MotoStatus';
import MotoInfo from '../../components/MotoDetails/MotoInfo';
import ReserveModal from '../../components/MotoDetails/ReserveModal';
import ContactModal from '../../components/MotoDetails/ContactModal';
import Loading from '../../components/Loading/Loading';
import { actionTypes } from '../../context/motoReducer';
import { POST, GET, PUT, DELETE } from '../../utils/fetchData';
import useToastMessage from '../../hooks/useToastMessage';

const MotoDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useMotos();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const moto = state.motos.find((m) => m._id === id);
  const { loading, error } = state;
  const showToast = useToastMessage();

  const [modalState, setModalState] = useState({
    isContactModalOpen: false,
    isReserveModalOpen: false,
    contactMessage: '',
    isReserved: false
  });

  const [reservationDetails, setReservationDetails] = useState({
    fechaInicio: '',
    fechaFin: '',
    precioTotal: 0,
    comentarios: ''
  });

  // Función para calcular el precio total basado en las fechas seleccionadas
  const calcularPrecioTotal = () => {
    const { fechaInicio, fechaFin } = reservationDetails;
    if (!fechaInicio || !fechaFin) return 0;

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diferenciaEnDias = (fin - inicio) / (1000 * 60 * 60 * 24);
    return Math.max(diferenciaEnDias, 1) * moto.precio;
  };

  useEffect(() => {
    const fetchMotoData = async () => {
      try {
        const data = await GET(`/motos/${id}`);
        dispatch({ type: actionTypes.UPDATE_MOTO, payload: data });
        setModalState((prev) => ({
          ...prev,
          isReserved: data.estado === 'No disponible'
        }));
      } catch (error) {
        showToast(
          'Error',
          'Hubo un problema al cargar los detalles de la moto.',
          'error'
        );
      }
    };
    fetchMotoData();
  }, [id, dispatch]);

  useEffect(() => {
    setReservationDetails((prev) => ({
      ...prev,
      precioTotal: calcularPrecioTotal()
    }));
  }, [reservationDetails.fechaInicio, reservationDetails.fechaFin]);

  const handleSendMessage = () => {
    showToast(
      'Mensaje Enviado',
      'Tu mensaje ha sido enviado exitosamente.',
      'success'
    );
    setModalState((prev) => ({
      ...prev,
      contactMessage: '',
      isContactModalOpen: false
    }));
  };

  const handleReserve = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!modalState.isReserved) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user._id : null;

        const reservaResponse = await POST(`/reservas`, {
          moto: id,
          usuario: userId,
          propietario: moto.propietario,
          ...reservationDetails
        });

        await PUT(`/motos/${id}`, { estado: 'No disponible' });

        dispatch({
          type: actionTypes.UPDATE_MOTO,
          payload: {
            ...moto,
            estado: 'No disponible',
            reservaId: reservaResponse._id
          }
        });

        const storedMotoState = localStorage.getItem('moto_reservations');
        const reservations = JSON.parse(storedMotoState || '[]');
        reservations.push({
          id,
          reservaId: reservaResponse._id,
          estado: 'No disponible',
          usuario: userId
        });
        localStorage.setItem('moto_reservations', JSON.stringify(reservations));

        setModalState((prev) => ({
          ...prev,
          isReserved: true,
          isReserveModalOpen: false
        }));
        showToast(
          'Reserva Confirmada',
          'Has reservado la moto exitosamente.',
          'success'
        );
      } catch (error) {
        showToast(
          'Error',
          `Hubo un problema al reservar la moto: ${error.message}`,
          'error'
        );
      }
    }
  };

  const handleCancelReservation = async () => {
    if (modalState.isReserved) {
      try {
        const storedMotoState = localStorage.getItem('moto_reservations');
        const reservations = JSON.parse(storedMotoState || '[]');
        const reserva = reservations.find(
          (reservation) => reservation.id === id
        );

        if (!reserva || !reserva.reservaId) {
          showToast(
            'Error',
            'No se encontró la reserva asociada a esta moto.',
            'error'
          );
          return;
        }

        const userId = localStorage.getItem('user');
        if (reserva.usuario !== userId) {
          showToast(
            'Error',
            'No puedes cancelar una reserva que no hiciste.',
            'error'
          );
          return;
        }

        await DELETE(`/reservas/${reserva.reservaId}`);
        await PUT(`/motos/${id}`, { estado: 'Disponible' });

        dispatch({
          type: actionTypes.UPDATE_MOTO,
          payload: { ...moto, estado: 'Disponible' }
        });
        setModalState((prev) => ({ ...prev, isReserved: false }));

        const updatedReservations = reservations.filter(
          (reservation) => reservation.reservaId !== reserva.reservaId
        );
        localStorage.setItem(
          'moto_reservations',
          JSON.stringify(updatedReservations)
        );

        showToast(
          'Reserva Cancelada',
          'Has cancelado la reserva de la moto.',
          'success'
        );
      } catch (error) {
        showToast('Error', 'Hubo un problema al cancelar la reserva.', 'error');
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
        <MotoStatus
          estado={modalState.isReserved ? 'No disponible' : 'Disponible'}
        />
        <MotoInfo
          moto={moto}
          isReserved={modalState.isReserved}
          handleCancelReservation={
            isAuthenticated ? handleCancelReservation : null
          }
          openReserveModal={() => {
            if (isAuthenticated) {
              setModalState((prev) => ({ ...prev, isReserveModalOpen: true }));
            } else {
              navigate('/login');
            }
          }}
          openContactModal={() => {
            if (isAuthenticated) {
              setModalState((prev) => ({ ...prev, isContactModalOpen: true }));
            }
          }}
          isAuthenticated={isAuthenticated}
        />
        <ContactModal
          isOpen={modalState.isContactModalOpen}
          onClose={() =>
            setModalState((prev) => ({ ...prev, isContactModalOpen: false }))
          }
          contactMessage={modalState.contactMessage}
          setContactMessage={(message) =>
            setModalState((prev) => ({ ...prev, contactMessage: message }))
          }
          handleSendMessage={handleSendMessage}
        />
        <ReserveModal
          isReserveModalOpen={modalState.isReserveModalOpen}
          closeReserveModal={() =>
            setModalState((prev) => ({ ...prev, isReserveModalOpen: false }))
          }
          fechaInicio={reservationDetails.fechaInicio}
          setFechaInicio={(fecha) =>
            setReservationDetails((prev) => ({ ...prev, fechaInicio: fecha }))
          }
          fechaFin={reservationDetails.fechaFin}
          setFechaFin={(fecha) =>
            setReservationDetails((prev) => ({ ...prev, fechaFin: fecha }))
          }
          comentarios={reservationDetails.comentarios}
          setComentarios={(comentarios) =>
            setReservationDetails((prev) => ({ ...prev, comentarios }))
          }
          precioTotal={reservationDetails.precioTotal}
          handleReserve={handleReserve}
        />
      </Box>
    </Box>
  );
};

export default MotoDetails;

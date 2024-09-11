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

  const [contactMessage, setContactMessage] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [precioTotal, setPrecioTotal] = useState(0);
  const [comentarios, setComentarios] = useState('');

  // Función para calcular el precio total basado en las fechas seleccionadas
  const calcularPrecioTotal = () => {
    if (!fechaInicio || !fechaFin) return 0;

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diferenciaEnDias = (fin - inicio) / (1000 * 60 * 60 * 24);
    const diasDeReserva = Math.max(diferenciaEnDias, 1);

    return diasDeReserva * moto.precio;
  };

  useEffect(() => {
    const fetchMotoData = async () => {
      try {
        const data = await GET(`/motos/${id}`);
        console.log('Datos de la moto:', data);
        dispatch({ type: actionTypes.UPDATE_MOTO, payload: data });
        setIsReserved(data.estado === 'No disponible');
      } catch (error) {
        console.error('Error al obtener la moto:', error);
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
    setPrecioTotal(calcularPrecioTotal());
  }, [fechaInicio, fechaFin]);

  const handleSendMessage = () => {
    showToast(
      'Mensaje Enviado',
      'Tu mensaje ha sido enviado exitosamente.',
      'success'
    );
    setContactMessage('');
    setIsContactModalOpen(false);
  };

  const handleReserve = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!isReserved) {
      try {
        const userId = localStorage.getItem('user');
        const reservaResponse = await POST(`/reservas`, {
          moto: id,
          usuario: userId,
          propietario: moto.propietario,
          fechaInicio,
          fechaFin,
          precioTotal,
          comentarios
        });

        const reservaId = reservaResponse._id; 

        await PUT(`/motos/${id}`, { estado: 'No disponible' });

        dispatch({
          type: actionTypes.UPDATE_MOTO,
          payload: { ...moto, estado: 'No disponible', reservaId }
        });

        // Guardar la reserva en localStorage con el ID de la reserva
        const storedMotoState = localStorage.getItem('moto_reservations');
        let reservations = JSON.parse(storedMotoState || '[]');
        reservations.push({ id, reservaId, estado: 'No disponible' });
        localStorage.setItem('moto_reservations', JSON.stringify(reservations));

        console.log('Reserva guardada en localStorage:', reservations);

        setIsReserved(true);
        showToast(
          'Reserva Confirmada',
          'Has reservado la moto exitosamente.',
          'success'
        );
        setIsReserveModalOpen(false);
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
    if (isReserved) {
      try {
        const storedMotoState = localStorage.getItem('moto_reservations');
        const reservations = JSON.parse(storedMotoState || '[]');
        const reserva = reservations.find(
          (reservation) => reservation.id === id
        );

        if (!reserva || !reserva.reservaId) {
          console.log('Reserva no encontrada en localStorage:', reservations);
          showToast(
            'Error',
            'No se encontró la reserva asociada a esta moto.',
            'error'
          );
          return;
        }

        console.log('ID de la reserva:', reserva.reservaId);

        // Intenta eliminar la reserva
        await DELETE(`/reservas/${reserva.reservaId}`);

        // Actualiza el estado de la moto a 'Disponible'
        const putResponse = await PUT(`/motos/${id}`, { estado: 'Disponible' });

        if (putResponse) {
          dispatch({
            type: actionTypes.UPDATE_MOTO,
            payload: { ...moto, estado: 'Disponible' }
          });
          setIsReserved(false);

          // Actualizar el localStorage después de la cancelación
          const updatedReservations = reservations.filter(
            (reservation) => reservation.reservaId !== reserva.reservaId
          );
          localStorage.setItem(
            'moto_reservations',
            JSON.stringify(updatedReservations)
          );
          console.log(
            'LocalStorage después de la eliminación:',
            updatedReservations
          );

          showToast(
            'Reserva Cancelada',
            'Has cancelado la reserva de la moto.',
            'success'
          );
        } else {
          showToast(
            'Error',
            'Hubo un problema al actualizar el estado de la moto.',
            'error'
          );
        }
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

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Button
} from '@chakra-ui/react';

const AddReviewModal = ({
  isOpen,
  onClose,
  newReview,
  handleReviewChange,
  handleReviewSubmit,
  reservas
}) => {
  return (
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
  );
};

export default AddReviewModal;

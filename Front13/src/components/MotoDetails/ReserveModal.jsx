import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Text,
} from '@chakra-ui/react';

const ReserveModal = ({
  isReserveModalOpen,
  closeReserveModal,
  fechaInicio,
  setFechaInicio,
  fechaFin,
  setFechaFin,
  comentarios,
  setComentarios,
  precioTotal,
  handleReserve,
}) => (
  <Modal isOpen={isReserveModalOpen} onClose={closeReserveModal}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Reservar Moto</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl mb="4">
          <FormLabel>Fecha de Inicio</FormLabel>
          <Input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Fecha de Fin</FormLabel>
          <Input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Comentarios</FormLabel>
          <Textarea value={comentarios} onChange={(e) => setComentarios(e.target.value)} />
        </FormControl>
        <Text fontSize="xl" fontWeight="bold" color="red.500">
          Precio Total: {precioTotal} €
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="yellow" bg={'var(--rtc-color-2)'} mr="3" onClick={handleReserve}>
          Confirmar Reserva
        </Button>
        <Button onClick={closeReserveModal}>Cancelar</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ReserveModal;

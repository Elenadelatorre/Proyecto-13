// src/components/MotoDetails/ContactModal.jsx
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Input, Button, HStack } from '@chakra-ui/react';

const ContactModal = ({ isOpen, onClose, contactMessage, setContactMessage, handleSendMessage }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Contactar con el Propietario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb='4'>Escribe tu mensaje:</Text>
          <Input
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            placeholder='Escribe tu mensaje aquí...'
            mb='4'
          />
          <HStack spacing='4' justify='flex-end'>
            <Button colorScheme='yellow' bg='var(--rtc-color-2)' onClick={handleSendMessage}>
              Enviar
            </Button>
            <Button variant='outline' onClick={onClose}>
              Cerrar
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ContactModal;

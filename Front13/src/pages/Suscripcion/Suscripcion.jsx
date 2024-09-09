import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import SuccessMessage from '../../components/Suscripcion/CorrectForm/CorrectForm';
import Instrucciones from '../../components/Suscripcion/Instrucciones/Instrucciones';
import MotosBrandSelect from '../../components/Suscripcion/MotosBrandSelect/MotosBrandSelect';

const Formulario = () => {
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
    toast({
      title: 'Suscripción exitosa',
      description: 'Te has suscrito a nuestras ofertas y promociones exitosamente.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  if (submitted) {
    return <SuccessMessage />;
  }

  return (
    <Box p="4" maxW="1000px" mx="auto"  minH='100vh' pt='80px' pb='80px'>
      <Instrucciones />
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="4" align="stretch">
          <FormControl isInvalid={!!errors.name} isRequired>
            <FormLabel>Nombre Completo</FormLabel>
            <Input
              type="text"
              placeholder="Nombre y apellidos"
              {...register('name', { required: 'Este campo es obligatorio' })}
            />
            {errors.name && <Text color="red.500">{errors.name.message}</Text>}
          </FormControl>

          <FormControl isInvalid={!!errors.email} isRequired>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              type="email"
              placeholder="correo@ejemplo.com"
              {...register('email', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  message: 'Correo electrónico no válido',
                },
              })}
            />
            {errors.email && <Text color="red.500">{errors.email.message}</Text>}
          </FormControl>

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel>Número de Teléfono</FormLabel>
            <Input
              type="tel"
              placeholder="1234567890"
              {...register('phone', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Número de teléfono no válido',
                },
              })}
            />
            {errors.phone && <Text color="red.500">{errors.phone.message}</Text>}
          </FormControl>

          <FormControl isInvalid={!!errors.age} isRequired>
            <FormLabel>Fecha de Nacimiento</FormLabel>
            <Input
              type="date"
              {...register('age', { required: 'Este campo es obligatorio' })}
            />
            {errors.age && <Text color="red.500">{errors.age.message}</Text>}
          </FormControl>

          <MotosBrandSelect {...register('brand')} />

          <FormControl isInvalid={!!errors.preference} isRequired>
            <FormLabel>Preferencias de Ofertas</FormLabel>
            <Input
              type="text"
              placeholder="Tipo de ofertas que te interesan"
              {...register('preference')}
            />
            {errors.preference && (
              <Text color="red.500">{errors.preference.message}</Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.frequency}>
            <FormLabel>Frecuencia de Notificaciones</FormLabel>
            <Select
              placeholder="Selecciona la frecuencia"
              {...register('frequency', { required: 'Este campo es obligatorio' })}
            >
              <option value="daily">Diaria</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
            </Select>
            {errors.frequency && (
              <Text color="red.500">{errors.frequency.message}</Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.terms} isRequired>
            <Checkbox {...register('terms', { required: 'Debe aceptar los términos' })}>
              Acepto los términos y condiciones
            </Checkbox>
            {errors.terms && <Text color="red.500">{errors.terms.message}</Text>}
          </FormControl>

          <Button type="submit" colorScheme="yellow" bg="var(--rtc-color-2)">
            Suscribirse
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Formulario;

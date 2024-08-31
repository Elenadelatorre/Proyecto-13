import React, { useEffect, useReducer } from 'react';
import { Box, Button, useToast, VStack, Flex } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormField from './FormField';
import { initialState, motoFormReducer } from '../../context/motoFormReducer';

const AddMotoForm = () => {
  const [formState, dispatch] = useReducer(motoFormReducer, initialState);
  const toast = useToast();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: initialState
  });

  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userObject = JSON.parse(user);
        if (userObject && userObject._id) {
          dispatch({
            type: 'SET_FIELD',
            payload: { name: 'propietario', value: userObject._id }
          });
          setValue('propietario', userObject._id);
        }
      } catch (error) {
        console.error('Error al parsear el objeto del usuario:', error);
      }
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/motos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Error al crear la moto');

      const result = await response.json();
      toast({
        title: 'Moto agregada',
        description: `La moto ${result.marca} ${result.modelo} ha sido añadida exitosamente.`,
        status: 'success',
        duration: 2000,
        isClosable: true
      });

      dispatch({ type: 'RESET_FORM' });
      reset(initialState);

      // Redirigir y desplazar al inicio de la página
      navigate('/motos');
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <Box p='4' maxW='800px' mx='auto'>
      <FormProvider {...methods}>
        <Box as='form' onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing='4' align='stretch' mb='4'>
            <FormField
              name='VIN'
              label='VIN'
              placeholder='Ingrese el VIN'
              isRequired
            />
            <FormField
              name='marca'
              label='Marca'
              placeholder='Ingrese la marca'
              isRequired
            />
            <FormField
              name='modelo'
              label='Modelo'
              placeholder='Ingrese el modelo'
              isRequired
            />
          </VStack>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            mb='4'
            wrap='wrap'
            gap='4'
          >
            <FormField
              name='tipo'
              label='Tipo'
              type='select'
              options={[
                { value: 'Cruiser', label: 'Cruiser' },
                { value: 'Custom', label: 'Custom' },
                { value: 'Deportiva', label: 'Deportiva' },
                { value: 'Eléctrica', label: 'Eléctrica' },
                { value: 'Motocross', label: 'Motocross' },
                { value: 'Naked', label: 'Naked' },
                { value: 'Retro', label: 'Retro' },
                { value: 'Scooter', label: 'Scooter' },
                { value: 'Trail', label: 'Trail' },
                { value: 'Turismo', label: 'Turismo' }
              ]}
              placeholder='Seleccione el tipo'
            />
            <FormField
              name='año'
              label='Año'
              type='number'
              placeholder='Ingrese el año'
              isRequired
            />
            <FormField
              name='km'
              label='Kilómetros'
              type='number'
              placeholder='Ingrese los kilómetros'
              isRequired
            />
            <FormField
              name='precio'
              label='Precio al día (€)'
              type='number'
              placeholder='Ingrese el precio'
              isRequired
            />
            <FormField
              name='estado'
              label='Estado'
              type='select'
              options={[{ value: 'Disponible', label: 'Disponible' }]}
            />
            <FormField
              name='imagen'
              label='Imagen URL'
              placeholder='Ingrese la URL de la imagen'
              isRequired
            />
          </Flex>

          <FormField
            name='descripcion'
            label='Descripción'
            type='textarea'
            placeholder='Ingrese una descripción'
            isRequired
          />
          <FormField
            name='propietario'
            label='Propietario ID'
            placeholder='Propietario'
            readOnly
          />
          <Flex justify='center' mt='4'>
            <Button
              type='submit'
              mt='4'
              colorScheme='yellow'
              bg='var(--rtc-color-2)'
            >
              Agregar Moto
            </Button>
          </Flex>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default AddMotoForm;

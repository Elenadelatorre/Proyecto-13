import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Flex,
  Select
} from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useToastMessage from '../../hooks/useToastMessage';
import { POST } from '../../utils/fetchData';

const AddMotoForm = () => {
  const showToast = useToastMessage();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      VIN: '',
      marca: '',
      modelo: '',
      tipo: '',
      año: '',
      km: '',
      precio: '',
      estado: 'Disponible',
      imagen: '',
      descripcion: '',
      propietario: ''
    }
  });

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors }
  } = methods;

  useEffect(() => {
    const userId = localStorage.getItem('user'); // Aquí obtenemos el valor directamente

    if (userId) {
      setValue('propietario', userId); // Asignamos el ID directamente al campo propietario
    } else {
      showToast(
        'Error',
        'No se pudo obtener la información del usuario.',
        'error'
      );
    }
  }, [setValue, showToast]);

  const onSubmit = async () => {
    const userId = localStorage.getItem('user');
    const data = {
      VIN: methods.getValues('VIN'),
      marca: methods.getValues('marca'),
      modelo: methods.getValues('modelo'),
      tipo: methods.getValues('tipo'),
      año: methods.getValues('año'),
      km: methods.getValues('km'),
      precio: methods.getValues('precio'),
      estado: methods.getValues('estado'),
      imagen: methods.getValues('imagen'),
      descripcion: methods.getValues('descripcion'),
      propietario: userId
    };
    try {
      const response = await POST('/motos', data);

      if (response.error) throw new Error('Error al crear la moto');

      showToast(
        'Moto agregada',
        `La moto ${response.marca} ${response.modelo} ha sido añadida exitosamente.`,
        'success'
      );

      navigate('/motos');
      window.scrollTo(0, 0);
    } catch (error) {
      showToast('Error', `Hubo un problema al crear la moto: ${error.message}`, 'error');
    }
  };

  return (
    <Box p='4' maxW='800px' mx='auto' minH='8vh' pt='80px' pb='80px'>
      <FormProvider {...methods}>
        <Box as='form' onSubmit={handleSubmit(onSubmit)} noValidate>
          <VStack spacing='4' align='stretch' mb='4'>
            <FormControl isInvalid={!!errors.VIN} isRequired>
              <FormLabel>VIN</FormLabel>
              <Input
                type='text'
                placeholder='Ingrese el VIN'
                {...register('VIN', { required: 'Este campo es obligatorio' })}
              />
              {errors.VIN && <Text color='red.500'>{errors.VIN.message}</Text>}
            </FormControl>

            <FormControl isInvalid={!!errors.marca} isRequired>
              <FormLabel>Marca</FormLabel>
              <Input
                type='text'
                placeholder='Ingrese la marca'
                {...register('marca', {
                  required: 'Este campo es obligatorio'
                })}
              />
              {errors.marca && (
                <Text color='red.500'>{errors.marca.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.modelo} isRequired>
              <FormLabel>Modelo</FormLabel>
              <Input
                type='text'
                placeholder='Ingrese el modelo'
                {...register('modelo', {
                  required: 'Este campo es obligatorio'
                })}
              />
              {errors.modelo && (
                <Text color='red.500'>{errors.modelo.message}</Text>
              )}
            </FormControl>
          </VStack>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            mb='4'
            wrap='wrap'
            gap='4'
          >
            <FormControl isInvalid={!!errors.tipo} isRequired>
              <FormLabel>Tipo</FormLabel>
              <Input
                type='text'
                placeholder='Ingrese el tipo de moto'
                {...register('tipo', { required: 'Este campo es obligatorio' })}
              />
              {errors.tipo && (
                <Text color='red.500'>{errors.tipo.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.año} isRequired>
              <FormLabel>Año</FormLabel>
              <Input
                type='number'
                placeholder='Ingrese el año'
                {...register('año', {
                  required: 'Este campo es obligatorio',
                  min: { value: 1900, message: 'Debe ser un año válido' }
                })}
              />
              {errors.año && <Text color='red.500'>{errors.año.message}</Text>}
            </FormControl>

            <FormControl isInvalid={!!errors.km} isRequired>
              <FormLabel>Kilómetros</FormLabel>
              <Input
                type='number'
                placeholder='Ingrese los kilómetros'
                {...register('km', { required: 'Este campo es obligatorio' })}
              />
              {errors.km && <Text color='red.500'>{errors.km.message}</Text>}
            </FormControl>

            <FormControl isInvalid={!!errors.precio} isRequired>
              <FormLabel>Precio al día (€)</FormLabel>
              <Input
                type='number'
                placeholder='Ingrese el precio'
                {...register('precio', {
                  required: 'Este campo es obligatorio'
                })}
              />
              {errors.precio && (
                <Text color='red.500'>{errors.precio.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.estado}>
              <FormLabel>Estado</FormLabel>
              <Select
                {...register('estado', {
                  required: 'Este campo es obligatorio'
                })}
                defaultValue='Disponible'
                isReadOnly
              >
                <option value='Disponible'>Disponible</option>
              </Select>
            </FormControl>

            <FormControl isInvalid={!!errors.imagen} isRequired>
              <FormLabel>Imagen URL</FormLabel>
              <Input
                type='text'
                placeholder='Ingrese la URL de la imagen'
                {...register('imagen', {
                  required: 'Este campo es obligatorio'
                })}
              />
              {errors.imagen && (
                <Text color='red.500'>{errors.imagen.message}</Text>
              )}
            </FormControl>
          </Flex>

          <FormControl isInvalid={!!errors.descripcion} isRequired>
            <FormLabel>Descripción</FormLabel>
            <Input
              type='text'
              placeholder='Ingrese una descripción'
              {...register('descripcion', {
                required: 'Este campo es obligatorio'
              })}
            />
            {errors.descripcion && (
              <Text color='red.500'>{errors.descripcion.message}</Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Propietario ID</FormLabel>
            <Input type='text' readOnly {...register('propietario')} />
          </FormControl>

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

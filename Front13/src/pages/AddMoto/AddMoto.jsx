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
  useToast,
  Select
} from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddMotoForm = () => {
  const toast = useToast();
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
      estado: 'Disponible', // Estado predeterminado
      imagen: '',
      descripcion: '',
      propietario: '' // Campo para el propietario
    }
  });

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors }
  } = methods;

  useEffect(() => {
    // Obtener el usuario desde localStorage
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userObject = JSON.parse(user);
        console.log("Usuario cargado desde localStorage:", userObject); // Verifica el objeto del usuario

        if (userObject && userObject._id) {
          console.log("ID de usuario:", userObject._id); // Verifica el ID del usuario
          // Establecer el ID del propietario en el formulario
          setValue('propietario', userObject._id);
        }
      } catch (error) {
        console.error('Error al parsear el objeto del usuario:', error);
      }
    } else {
      console.warn('No se encontró un usuario en localStorage');
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

          {/* Campo de Propietario ID de solo lectura */}
          <FormControl>
            <FormLabel>Propietario ID</FormLabel>
            <Input
              type='text'
              readOnly
              {...register('propietario')}
            />
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

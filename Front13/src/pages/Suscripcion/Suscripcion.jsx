import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
  Flex,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const AddMotoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
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

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userObject = JSON.parse(user);
        if (userObject && userObject._id) {
          reset((prev) => ({
            ...prev,
            propietario: userObject._id || '' 
          }));
        }
      } catch (error) {
        console.error('Error al parsear el objeto del usuario:', error);
      }
    }
  }, [reset]);

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
        duration: 5000,
        isClosable: true
      });

      reset({
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
      });

      navigate('/motos');
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
      <Box as='form' onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing='4' align='stretch' mb='4'>
          <FormControl isInvalid={!!errors.VIN}>
            <FormLabel>VIN</FormLabel>
            <Input
              placeholder='Ingrese el VIN'
              {...register('VIN', { required: 'El VIN es obligatorio' })}
            />
            {errors.VIN && <Text color='red.500'>{errors.VIN.message}</Text>}
          </FormControl>

          <FormControl isInvalid={!!errors.marca}>
            <FormLabel>Marca</FormLabel>
            <Input
              placeholder='Ingrese la marca'
              {...register('marca', { required: 'La marca es obligatoria' })}
            />
            {errors.marca && <Text color='red.500'>{errors.marca.message}</Text>}
          </FormControl>

          <FormControl isInvalid={!!errors.modelo}>
            <FormLabel>Modelo</FormLabel>
            <Input
              placeholder='Ingrese el modelo'
              {...register('modelo', { required: 'El modelo es obligatorio' })}
            />
            {errors.modelo && <Text color='red.500'>{errors.modelo.message}</Text>}
          </FormControl>
        </VStack>

        <Flex
          direction={{ base: 'column', md: 'row' }}
          mb='4'
          wrap='wrap'
          gap='4'
        >
          <FormControl flex='1'>
            <FormLabel>Tipo</FormLabel>
            <Select {...register('tipo')}>
              <option value='Cruiser'>Cruiser</option>
              <option value='Custom'>Custom</option>
              <option value='Deportiva'>Deportiva</option>
              <option value='Eléctrica'>Eléctrica</option>
              <option value='Motocross'>Motocross</option>
              <option value='Naked'>Naked</option>
              <option value='Retro'>Retro</option>
              <option value='Scooter'>Scooter</option>
              <option value='Trail'>Trail</option>
              <option value='Turismo'>Turismo</option>
            </Select>
          </FormControl>

          <FormControl isInvalid={!!errors.año} flex='1'>
            <FormLabel>Año</FormLabel>
            <Input
              type='number'
              placeholder='Ingrese el año'
              {...register('año', { required: 'El año es obligatorio' })}
            />
            {errors.año && <Text color='red.500'>{errors.año.message}</Text>}
          </FormControl>

          <FormControl isInvalid={!!errors.km} flex='1'>
            <FormLabel>Kilómetros</FormLabel>
            <Input
              type='number'
              placeholder='Ingrese los kilómetros'
              {...register('km', { required: 'Los kilómetros son obligatorios' })}
            />
            {errors.km && <Text color='red.500'>{errors.km.message}</Text>}
          </FormControl>

          <FormControl isInvalid={!!errors.precio} flex='2'>
            <FormLabel>Precio al día (€)</FormLabel>
            <Input
              type='number'
              placeholder='Ingrese el precio'
              {...register('precio', { required: 'El precio es obligatorio' })}
            />
            {errors.precio && <Text color='red.500'>{errors.precio.message}</Text>}
          </FormControl>

          <FormControl flex='1'>
            <FormLabel>Estado</FormLabel>
            <Select {...register('estado')}>
              <option value='Disponible'>Disponible</option>
            </Select>
          </FormControl>

          <FormControl flex='2'>
            <FormLabel>Imagen URL</FormLabel>
            <Input
              placeholder='Ingrese la URL de la imagen'
              {...register('imagen')}
            />
          </FormControl>
        </Flex>

        <FormControl isInvalid={!!errors.descripcion} mb='4'>
          <FormLabel>Descripción</FormLabel>
          <Textarea
            placeholder='Ingrese una descripción'
            {...register('descripcion', { required: 'La descripción es obligatoria' })}
          />
          {errors.descripcion && <Text color='red.500'>{errors.descripcion.message}</Text>}
        </FormControl>

        <FormControl mb='4'>
          <FormLabel>Propietario ID</FormLabel>
          <Input
            value={formData.propietario || ''} // Mantenlo solo lectura
            readOnly
            {...register('propietario')}
          />
        </FormControl>

        <Button type='submit' colorScheme='blue'>
          Agregar Moto
        </Button>
      </Box>
    </Box>
  );
};

export default AddMotoForm;

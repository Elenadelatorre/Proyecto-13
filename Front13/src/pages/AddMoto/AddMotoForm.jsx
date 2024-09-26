import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Input
} from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useToastMessage from '../../hooks/useToastMessage';
import { POST } from '../../utils/fetchData';
import FormField from '../../components/AddMoto/FormField';
import FormGroup from '../../components/AddMoto/FormGroup';

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
    getValues,
    formState: { errors }
  } = methods;

  useEffect(() => {
    console.log('Soy el componente AddMotos.jsx y me renderizo');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user._id : null;

    if (userId) {
      setValue('propietario', userId);
    } else {
      showToast(
        'Error',
        'No se pudo obtener la información del usuario.',
        'error'
      );
    }
  }, [setValue, showToast]);

  const onSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user._id : null;
    const data = {
      VIN: getValues('VIN'),
      marca: getValues('marca'),
      modelo: getValues('modelo'),
      tipo: getValues('tipo'),
      año: getValues('año'),
      km: getValues('km'),
      precio: getValues('precio'),
      estado: getValues('estado'),
      imagen: getValues('imagen'),
      descripcion: getValues('descripcion'),
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
      showToast(
        'Error',
        `Hubo un problema al crear la moto: ${error.message}`,
        'error'
      );
    }
  };

  return (
    <Box p='4' maxW='800px' mx='auto' minH='8vh' pt='80px' pb='80px'>
      <FormProvider {...methods}>
        <Box as='form' onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormGroup>
            <FormField
              name='VIN'
              label='VIN'
              placeholder='Ingrese el VIN'
              type='text'
              isRequired
              error={errors.VIN}
            />
            <FormField
              name='marca'
              label='Marca'
              placeholder='Ingrese la marca'
              type='text'
              isRequired
              error={errors.marca}
            />
            <FormField
              name='modelo'
              label='Modelo'
              placeholder='Ingrese el modelo'
              type='text'
              isRequired
              error={errors.modelo}
            />
          </FormGroup>
          <FormGroup>
            <FormField
              name='tipo'
              label='Tipo'
              placeholder='Ingrese el tipo de moto'
              type='text'
              isRequired
              error={errors.tipo}
            />
            <FormField
              name='año'
              label='Año'
              placeholder='Ingrese el año'
              type='number'
              isRequired
              error={errors.año}
            />
            <FormField
              name='km'
              label='Kilómetros'
              placeholder='Ingrese los kilómetros'
              type='number'
              isRequired
              error={errors.km}
            />
            <FormField
              name='precio'
              label='Precio al día (€)'
              placeholder='Ingrese el precio'
              type='number'
              isRequired
              error={errors.precio}
            />
            <FormField
              name='imagen'
              label='Imagen URL'
              placeholder='Ingrese la URL de la imagen'
              type='text'
              isRequired
              error={errors.imagen}
            />
            <FormField
              name='descripcion'
              label='Descripción'
              placeholder='Ingrese una descripción'
              type='text'
              isRequired
              error={errors.descripcion}
            />
            <FormControl isInvalid={!!errors.estado}>
              <FormLabel>Estado</FormLabel>
              <Select
                {...methods.register('estado', {
                  required: 'Este campo es obligatorio'
                })}
                defaultValue='Disponible'
                isReadOnly
              >
                <option value='Disponible'>Disponible</option>
              </Select>
              {errors.estado && (
                <Text color='red.500'>{errors.estado.message}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Propietario ID</FormLabel>
              <Input
                type='text'
                readOnly
                {...methods.register('propietario')}
              />
            </FormControl>
          </FormGroup>
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

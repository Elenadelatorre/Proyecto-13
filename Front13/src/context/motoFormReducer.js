const initialState = {
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
};

const motoFormReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

export { initialState, motoFormReducer };

export const initialState = {
  motos: [],
  loading: false,
  error: null,
};

export const actionTypes = {
  FETCH_MOTOS_REQUEST: 'FETCH_MOTOS_REQUEST',
  FETCH_MOTOS_SUCCESS: 'FETCH_MOTOS_SUCCESS',
  FETCH_MOTOS_FAILURE: 'FETCH_MOTOS_FAILURE',
  UPDATE_MOTO: 'UPDATE_MOTO',
  RESERVE_MOTO: 'RESERVE_MOTO'
};

export const motoReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOTOS_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.FETCH_MOTOS_SUCCESS:
      return { ...state, loading: false, motos: action.payload };
    case actionTypes.FETCH_MOTOS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.UPDATE_MOTO:
      return {
        ...state,
        motos: state.motos.map(moto =>
          moto._id === action.payload._id ? action.payload : moto
        )
      };
    case actionTypes.RESERVE_MOTO:
      return {
        ...state,
        motos: state.motos.map(moto =>
          moto._id === action.payload._id ? { ...moto, estado: 'No disponible' } : moto
        )
      };
    default:
      return state;
  }
};

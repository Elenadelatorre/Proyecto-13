import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { motoReducer, initialState, actionTypes } from './motoReducer';

const MotoContext = createContext();

export const MotoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(motoReducer, initialState);

  useEffect(() => {
    const fetchMotos = async () => {
      dispatch({ type: actionTypes.FETCH_MOTOS_REQUEST });
      try {
        const response = await fetch('https://back-motos.vercel.app/api/v1/motos');
        const data = await response.json();
        dispatch({ type: actionTypes.FETCH_MOTOS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: actionTypes.FETCH_MOTOS_FAILURE, payload: error });
      }
    };

    fetchMotos();
  }, []);

  return (
    <MotoContext.Provider value={{ state, dispatch }}>
      {children}
    </MotoContext.Provider>
  );
};

export const useMotos = () => {
  const context = useContext(MotoContext);
  if (!context) {
    throw new Error('useMotos must be used within a MotoProvider');
  }
  return context;
};

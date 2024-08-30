//! Crear mi propio proveedor de 'cambiador de tema' para que todos los componentes tengan acceso al mismo:
import { createContext, useEffect, useState } from 'react';

// Crear el contexto:
export const ThemeContext = createContext();

// Utilizar el contexto:
// 1. Crear componente proveedor:
// 2. Recoger todos los hijos que haya dentro de las etiquetas de 'ThemeProvider-> ({children})
// 3. Renderizar 'children', envolviéndolos con 'ThemeContext', proveyendo de valores:
const ThemeProvider = ({ children }) => {
  // Recojo 'light' del 'localStorage', si es string 'false' que sea booleano false y sino true.
  const [light, setLight] = useState(
    localStorage.getItem('light') === 'false' ? false : true
  );

  useEffect(() => {
    localStorage.setItem('light', light);
  }, [light]);
  return (
    <ThemeContext.Provider value={{ light, setLight }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ThemeProvider from './Providers/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </BrowserRouter>
);

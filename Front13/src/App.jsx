import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Motos from './pages/Motos/Motos';
import Suscripcion from './pages/Suscripcion/Suscripcion';
import NotFound from './pages/NotFound/NotFound';
import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { ThemeContext } from './Providers/ThemeProvider';
import MotoDetails from './pages/MotoDetails/MotoDetails';
import Register from './pages/Register/Register';
import MyMotos from './pages/MyMotos/MyMotos';
import AddMotoForm from './pages/AddMoto/AddMotoForm';

function App() {
  const { light } = useContext(ThemeContext);
  return (
    <Box
      minH='100vh'
      bg={`var(--rtc-${light ? 'light' : 'dark'}-mode-bg)`}
      transition='all 0.5s'
      color={`var(--rtc-${light ? 'light' : 'dark'}-mode-text)`}
    >
      <Header />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/motos' element={<Motos />}></Route>
        <Route path='/motos/:id' element={<MotoDetails />}></Route>
        <Route path='/suscripcion' element={<Suscripcion />}></Route>
        <Route path='/addMoto' element={<AddMotoForm />}></Route>
        <Route path='/myMotos' element={<MyMotos />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;

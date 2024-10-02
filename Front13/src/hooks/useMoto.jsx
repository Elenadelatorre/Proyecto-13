import { useState, useEffect } from 'react';
import { GET } from '../utils/fetchData';

const useMoto = (id) => {
  const [moto, setMoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError(new Error('ID no proporcionado'));
      setLoading(false);
      return;
    }

    const fetchMoto = async () => {
      setLoading(true); // Inicia el loading

      try {
        const data = await GET(`/motos/${id}`);
        setMoto(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMoto();
  }, [id]);

  return { moto, loading, error, setMoto };
};

export default useMoto;

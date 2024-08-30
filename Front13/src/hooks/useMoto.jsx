import { useState, useEffect } from 'react';

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

    fetch(`http://localhost:3000/api/v1/motos/${id}`)
      .then(response => response.json())
      .then(data => {
        setMoto(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  return { moto, loading, error, setMoto };
};

export default useMoto;

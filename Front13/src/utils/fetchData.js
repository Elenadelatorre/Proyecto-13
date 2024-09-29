const BASE_URL = 'https://proyecto-13-2.vercel.app/';

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la solicitud');
    }

    return response.json(); 
  } catch (error) {
    console.error('Error en la llamada fetch:', error);
    throw error;
  }
};

export const GET = (url) => fetchData(url, { method: 'GET' });
export const POST = (url, data) =>
  fetchData(url, { method: 'POST', body: JSON.stringify(data) });
export const PUT = (url, data) =>
  fetchData(url, { method: 'PUT', body: JSON.stringify(data) });
export const DELETE = (url) => fetchData(url, { method: 'DELETE' });

import axios from 'axios';
import qs from 'qs';

const API_URL = 'https://api.factus.com.co/oauth/token';
const REGISTER_URL = 'https://factus-db-factus-db.up.railway.app/API.php?opc=create';

export const login = async (username: string, password: string) => {
  try {
    const data = qs.stringify({
      grant_type: 'password',
      client_id: 'tu client id',
      client_secret: 'tu client secret',
      username: username,
      password: password
    });

    const response = await axios.post(API_URL, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error en la solicitud:', error.response.data);
      throw new Error(error.response.data.error_description || 'Error en la autenticación. Verifica tus credenciales.');
    } else {
      console.error('Error en la solicitud:', (error as Error).message);
      throw new Error('Error en la autenticación. Verifica tus credenciales.');
    }
  }
};

export const register = async (nombre: string, apellidos: string, email: string, contrasena: string, avatar: string) => {
  try {
    const data = {
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      contrasena: contrasena,
      avatar: avatar
    };

    const response = await axios.post(REGISTER_URL, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error en la solicitud:', error.response.data);
      throw new Error(error.response.data.message || 'Error en el registro. Verifica tus datos.');
    } else {
      console.error('Error en la solicitud:', (error as Error).message);
      throw new Error('Error en el registro. Verifica tus datos.');
    }
  }
};
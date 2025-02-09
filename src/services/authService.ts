import axios from 'axios';
import qs from 'qs';

const API_URL = 'https://api.factus.com.co/oauth/token';
const REGISTER_URL = 'https://api.factus.com.co/register'; // URL de registro

// Función para obtener el token de autenticación
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

    return response.data; // Retorna el token
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

// Función para registrar un nuevo usuario
export const register = async (username: string, password: string, email: string, nombre: string, apellidos: string, avatar: string) => {
  try {
    const data = {
      username: username,
      password: password,
      email: email,
      nombre: nombre,
      apellidos: apellidos,
      avatar: avatar
    };

    const response = await axios.post(REGISTER_URL, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response.data; // Retorna la respuesta del registro
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
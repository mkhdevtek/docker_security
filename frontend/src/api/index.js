import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para agregar token a todas las solicitudes
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta (como tokens expirados)
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 (Unauthorized) y no hemos intentado refrescar el token antes
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Intentar refrescar el token
        const token = await refreshToken();
        
        // Si se refrescó correctamente, reintentar la solicitud original
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return API(originalRequest);
      } catch (refreshError) {
        // Si no se puede refrescar, redirigir al login o manejar según necesidad
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('auth_user');
        
        // Redirección al login (esto depende de tu router)
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Función para refrescar el token
const refreshToken = async () => {
  try {
    const response = await API.post('/auth/refresh');
    const newToken = response.data.access_token;
    localStorage.setItem('jwt_token', newToken);
    return newToken;
  } catch (error) {
    throw error;
  }
};

export default API;

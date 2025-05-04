import API from '../api';

// Clave para almacenar el token en localStorage
const TOKEN_KEY = 'jwt_token';
const USER_KEY = 'auth_user';

// Servicio de autenticación
const AuthService = {
  // Iniciar sesión
  login: async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      const { access_token, user } = response.data;
      
      // Guardar token y datos del usuario
      localStorage.setItem(TOKEN_KEY, access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      
      // Configurar el token en los headers para futuras peticiones
      API.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  
  // Registrar nuevo usuario
  register: async (name, email, password, password_confirmation) => {
    try {
      const response = await API.post('/auth/register', {
        name,
        email,
        password,
        password_confirmation
      });
      
      const { access_token, user } = response.data;
      
      // Guardar token y datos del usuario
      localStorage.setItem(TOKEN_KEY, access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      
      // Configurar el token en los headers para futuras peticiones
      API.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  
  // Cerrar sesión
  logout: async () => {
    try {
      await API.post('/auth/logout');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      // Limpiar localStorage y headers aunque falle el logout en el servidor
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      delete API.defaults.headers.common['Authorization'];
    }
  },
  
  // Obtener el usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },
  
  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  
  // Refrescar el token
  refreshToken: async () => {
    try {
      const response = await API.post('/auth/refresh');
      const { access_token } = response.data;
      
      localStorage.setItem(TOKEN_KEY, access_token);
      API.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      return access_token;
    } catch (error) {
      // Si falla, probablemente el token expiró completamente
      AuthService.logout();
      throw error;
    }
  },
  
  // Inicializar headers con el token si existe
  initializeAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};

export default AuthService;

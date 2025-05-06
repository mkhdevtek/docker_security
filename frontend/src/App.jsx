import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componentes
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Navigation from './components/Navigation';

// Configuración de Axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token almacenado
    const token = localStorage.getItem('token');
    if (token) {
      // Configurar el token en los headers de Axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Obtener información del usuario
      axios.get('/auth/me')
        .then(response => {
          setUser(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener información del usuario:', error);
          logout();
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Protección de rutas
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <div className="text-center p-5">Cargando...</div>;
    }
    
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Navigation user={user} onLogout={logout} />
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={!user ? <Login onLogin={login} /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path="/" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
            <Route path="/task/new" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
            <Route path="/task/edit/:id" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
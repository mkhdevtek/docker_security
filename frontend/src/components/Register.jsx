import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/auth/register', formData);
      navigate('/login', { state: { message: 'Registro exitoso. Por favor inicia sesión.' } });
    } catch (err) {
      if (err.response?.data?.email) {
        setError(`Email: ${err.response.data.email[0]}`);
      } else if (err.response?.data?.password) {
        setError(`Contraseña: ${err.response.data.password[0]}`);
      } else if (err.response?.data?.name) {
        setError(`Nombre: ${err.response.data.name[0]}`);
      } else {
        setError(err.response?.data?.message || 'Error al registrarse');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">Registro</div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password_confirmation" className="form-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Registrarse'}
              </button>
            </form>
            <div className="mt-3">
              <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

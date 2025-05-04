import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ user, onLogout }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Gestor de Tareas</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Lista de Tareas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/task/new">Nueva Tarea</Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">¡Hola, {user.name}!</span>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={handleLogout}>Cerrar Sesión</a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

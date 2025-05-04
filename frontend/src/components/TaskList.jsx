import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar las tareas');
      setLoading(false);
      console.error('Error al cargar las tareas:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      return;
    }

    try {
      await axios.delete(`/tasks/${id}`);
      fetchTasks(); // Recargar la lista
    } catch (err) {
      setError('Error al eliminar la tarea');
      console.error('Error al eliminar la tarea:', err);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'in_progress':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  const formatStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'in_progress':
        return 'En Progreso';
      default:
        return 'Pendiente';
    }
  };

  if (loading) {
    return <div className="text-center p-5">Cargando tareas...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Tareas</h2>
        <Link to="/task/new" className="btn btn-primary">
          Nueva Tarea
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {tasks.length === 0 ? (
        <div className="alert alert-info">
          No hay tareas registradas. ¡Crea una nueva tarea!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description ? task.description.substring(0, 50) + (task.description.length > 50 ? '...' : '') : '-'}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                      {formatStatusText(task.status)}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <Link to={`/task/edit/${task.id}`} className="btn btn-sm btn-outline-primary me-2">
                        Editar
                      </Link>
                      <button 
                        onClick={() => handleDelete(task.id)} 
                        className="btn btn-sm btn-outline-danger"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskList;

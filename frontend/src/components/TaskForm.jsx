import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`/tasks/${id}`);
      setTask(response.data);
    } catch (err) {
      setError('Error al cargar la tarea');
      console.error('Error al cargar la tarea:', err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        await axios.put(`/tasks/${id}`, task);
      } else {
        await axios.post('/tasks', task);
      }
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        (isEditing ? 'Error al actualizar la tarea' : 'Error al crear la tarea')
      );
    } finally {
      setLoading(false);
    }
  };

  if (isEditing && isFetching) {
    return <div className="text-center p-5">Cargando tarea...</div>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Título *</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="4"
                  value={task.description || ''}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Estado</label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pendiente</option>
                  <option value="in_progress">En Progreso</option>
                  <option value="completed">Completada</option>
                </select>
              </div>
              <div className="d-flex gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => navigate('/')}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarProfesor from './EditarProfesor';
import CrearProfesor from './CrearProfesor';

const ProfesorList = ({ refresh }) => {
  const [profesores, setProfesores] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [profesorToEdit, setProfesorToEdit] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchProfesores(), fetchProgramas()]);
      setLoading(false);
    };
    fetchData();
  }, [refresh]);

  const fetchProfesores = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/profesores');
      setProfesores(response.data);
    } catch (error) {
      console.error("Error obteniendo profesores:", error);
      setError('Error al obtener profesores. Intente nuevamente.');
    }
  };

  const fetchProgramas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/programas');
      setProgramas(response.data);
    } catch (error) {
      console.error("Error obteniendo programas:", error);
      setError('Error al obtener programas. Intente nuevamente.');
    }
  };

  const handleEditProfesor = (profesor) => {
    setProfesorToEdit(profesor);
    setShowEditForm(true);
    setIsFormVisible(false);
  };

  const handleProfesorUpdated = () => {
    setShowEditForm(false);
    setProfesorToEdit(null);
    fetchProfesores();
    setSuccess('Profesor actualizado correctamente.');
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setProfesorToEdit(null);
    setIsFormVisible(true);
  };

  const handleDeleteProfesor = async (id) => {
    const confirmed = window.confirm('¿Está seguro de que desea eliminar este profesor?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8080/api/profesores/${id}`);
      setProfesores(profesores.filter(p => p.id !== id));
      setSuccess('Profesor eliminado correctamente.');
    } catch (error) {
      console.error("Error eliminando profesor:", error);
      setError('Error al eliminar el profesor.');
    }
  };

  const dismissAlert = () => {
    setError(null);
    setSuccess(null);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="container">
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={dismissAlert} aria-label="Close"></button>
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button type="button" className="btn-close" onClick={dismissAlert} aria-label="Close"></button>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Gestión de Profesores</h4>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsFormVisible(!isFormVisible);
            setShowEditForm(false);
          }}
        >
          {isFormVisible ? 'Ocultar Formulario' : 'Crear Profesor'}
        </button>
      </div>

      {showEditForm ? (
        <EditarProfesor 
          profesor={profesorToEdit} 
          onProfesorUpdated={handleProfesorUpdated}
          onCancel={handleCancelEdit}
        />
      ) : (
        isFormVisible && <CrearProfesor onProfesorCreated={handleProfesorUpdated} />
      )}

      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Lista de Profesores</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-bordered mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Especialidad</th>
                  <th>Fecha Contratación</th>
                  <th>Programa</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {profesores.map(profesor => (
                  <tr key={profesor.id}>
                    <td>{profesor.id}</td>
                    <td>{profesor.nombre}</td>
                    <td>{profesor.apellido}</td>
                    <td>{profesor.especializacion}</td>
                    <td>{profesor.fecha_contratacion}</td>
                    <td>{profesor.programa ? profesor.programa.nombre : 'No asignado'}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEditProfesor(profesor)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteProfesor(profesor.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {profesores.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-3">
                      No hay profesores registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfesorList;

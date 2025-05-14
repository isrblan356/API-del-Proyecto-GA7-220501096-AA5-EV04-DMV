import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarEstudiante from './EditarEstudiante';
import CrearEstudiante from './CrearEstudiante';

const EstudianteList = ({ refresh }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [estudianteToEdit, setEstudianteToEdit] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchEstudiantes(), fetchProgramas()]);
      setLoading(false);
    };
    fetchData();
  }, [refresh]);

  const fetchEstudiantes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/estudiantes');
      setEstudiantes(response.data);
    } catch (error) {
      console.error("Error obteniendo estudiantes:", error);
      setError('Error al obtener estudiantes. Intente nuevamente.');
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

  const handleEditEstudiante = (estudiante) => {
    setEstudianteToEdit(estudiante);
    setShowEditForm(true);
    setIsFormVisible(false);
  };

  const handleEstudianteUpdated = () => {
    setShowEditForm(false);
    setEstudianteToEdit(null);
    fetchEstudiantes();
    setSuccess('Estudiante actualizado correctamente.');
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEstudianteToEdit(null);
  };

  const handleDeleteEstudiante = async (id) => {
    const confirmed = window.confirm('¿Está seguro de que desea eliminar este estudiante?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8080/api/estudiantes/${id}`);
      // Actualizar la lista de estudiantes después de eliminar
      fetchEstudiantes();
      setSuccess('Estudiante eliminado correctamente.');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error eliminando estudiante:", error.response?.data || error.message);
      } else {
        console.error("Error eliminando estudiante:", error);
      }
      setError('Error al eliminar el estudiante.');
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
        <h4 className="mb-0">Gestión de Estudiantes</h4>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsFormVisible(!isFormVisible);
            setShowEditForm(false);
          }}
        >
          {isFormVisible ? 'Ocultar Formulario' : 'Crear Estudiante'}
        </button>
      </div>

      {showEditForm ? (
        <EditarEstudiante 
          estudiante={estudianteToEdit} 
          onEstudianteUpdated={handleEstudianteUpdated}
          onCancel={handleCancelEdit}
        />
      ) : (
        isFormVisible && <CrearEstudiante onEstudianteCreated={fetchEstudiantes} />
      )}

      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Lista de Estudiantes</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-bordered mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Fecha Ingreso</th>
                  <th>Semestre</th>
                  <th>Programa</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map(estudiante => (
                  <tr key={estudiante.id}>
                    <td>{estudiante.id}</td>
                    <td>{estudiante.nombre}</td>
                    <td>{estudiante.apellido}</td>
                    <td>{estudiante.email}</td>
                    <td>{estudiante.fecha_ingreso}</td>
                    <td>{estudiante.semestre}</td>
                    <td>{estudiante.programa ? estudiante.programa.nombre : 'No asignado'}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEditEstudiante(estudiante)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteEstudiante(estudiante.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {estudiantes.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-3">
                      No hay estudiantes registrados.
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

export default EstudianteList;
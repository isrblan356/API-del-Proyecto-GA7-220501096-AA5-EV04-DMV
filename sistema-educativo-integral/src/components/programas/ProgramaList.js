import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CrearPrograma from './CrearPrograma';
import EditarPrograma from './EditarPrograma';

const ProgramaList = () => {
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit'
  const [programaToEdit, setProgramaToEdit] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchProgramas();
  }, [refreshTrigger]);

  const fetchProgramas = async () => {
    setLoading(true);
    try {
      console.log('Obteniendo programas de la API...');
      const response = await axios.get('http://localhost:8080/api/programas');
      console.log('Programas recibidos:', response.data);
      setProgramas(response.data);
      setError(null);
    } catch (error) {
      console.error('Error al obtener programas:', error);
      setError('Error al cargar los programas. Por favor, intente nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar la edición de un programa
  const handleEditPrograma = (programa) => {
    setProgramaToEdit(programa);
    setCurrentView('edit');
  };

  // Función para actualizar la lista después de crear/editar un programa
  const handleProgramaUpdated = () => {
    setRefreshTrigger(prev => prev + 1); // Incrementa el contador para activar useEffect
    setCurrentView('list'); // Volver a la lista
  };

  // Función para cancelar la edición/creación
  const handleCancel = () => {
    setCurrentView('list');
    setProgramaToEdit(null);
  };

  // Función para eliminar un programa
  const handleDeletePrograma = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este programa?')) {
      try {
        await axios.delete(`http://localhost:8080/api/programas/${id}`);
        // Actualizar la lista de programas
        setRefreshTrigger(prev => prev + 1);
      } catch (error) {
        setError(`Error al eliminar el programa: ${error.message}`);
      }
    }
  };

  // Renderizar indicador de carga
  if (loading && programas.length === 0) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Programas</h2>
        {currentView === 'list' ? (
          <button 
            className="btn btn-primary"
            onClick={() => setCurrentView('create')}
          >
            Crear Nuevo Programa
          </button>
        ) : (
          <button 
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Volver a la Lista
          </button>
        )}
      </div>

      {/* Mostrar mensaje de error si existe */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)} 
            aria-label="Close"
          />
        </div>
      )}

      {currentView === 'create' && (
        <CrearPrograma onProgramaCreated={handleProgramaUpdated} />
      )}

      {currentView === 'edit' && programaToEdit && (
        <EditarPrograma 
          programa={programaToEdit} 
          onProgramaUpdated={handleProgramaUpdated}
          onCancel={handleCancel}
        />
      )}

      {currentView === 'list' && (
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="card-title mb-0">Lista de Programas</h5>
          </div>
          <div className="card-body">
            {/* Mensaje cuando no hay programas */}
            {programas.length === 0 ? (
              <div className="alert alert-info">
                <strong>No hay programas registrados.</strong> Por favor, crea uno nuevo.
              </div>
            ) : (
              // Tabla de programas
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programas.map(programa => (
                      <tr key={programa.id}>
                        <td>{programa.id}</td>
                        <td>{programa.nombre}</td>
                        <td>{programa.descripcion}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <button 
                              className="btn btn-warning btn-sm me-1" 
                              title="Editar programa"
                              onClick={() => handleEditPrograma(programa)}
                            >
                              <i className="bi bi-pencil"></i> Editar
                            </button>
                            <button 
                              className="btn btn-danger btn-sm" 
                              title="Eliminar programa"
                              onClick={() => handleDeletePrograma(programa.id)}
                            >
                              <i className="bi bi-trash"></i> Eliminar
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
        </div>
      )}
    </div>
  );
};

export default ProgramaList;
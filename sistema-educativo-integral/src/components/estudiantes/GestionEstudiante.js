// src/components/GestionEstudiante.js
import React, { useState } from 'react';
import axios from 'axios';
import EstudianteList from './EstudianteList';
import CrearEstudiante from './CrearEstudiante';
import EditarEstudiante from './EditarEstudiante';

const GestionEstudiante = () => {
  const [estudianteToEdit, setEstudianteToEdit] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const handleEditEstudiante = (estudiante) => {
    setEstudianteToEdit(estudiante);
    setShowEditForm(true);
  };

  const handleDeleteEstudiante = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este estudiante?')) {
      try {
        await axios.delete(`http://localhost:8080/api/estudiantes/${id}`);
        setRefreshList(!refreshList);
      } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
        alert('Error al eliminar el estudiante');
      }
    }
  };

  const handleEstudianteCreated = () => {
    setRefreshList(!refreshList);
  };

  const handleEstudianteUpdated = () => {
    setRefreshList(!refreshList);
    setShowEditForm(false);
    setEstudianteToEdit(null);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEstudianteToEdit(null);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Lista de estudiantes */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Lista de Estudiantes</h5>
            </div>
            <div className="card-body">
              <EstudianteList
                onEditEstudiante={handleEditEstudiante}
                onDeleteEstudiante={handleDeleteEstudiante}
                refresh={refreshList}
              />
            </div>
          </div>
        </div>

        {/* Formulario crear/editar estudiante */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className={`card-header ${showEditForm ? 'bg-warning' : 'bg-success'} text-white`}>
              <h5 className="mb-0">{showEditForm ? 'Editar Estudiante' : 'Registrar Estudiante'}</h5>
            </div>
            <div className="card-body">
              {showEditForm ? (
                <EditarEstudiante
                  estudiante={estudianteToEdit}
                  onEstudianteUpdated={handleEstudianteUpdated}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <CrearEstudiante onEstudianteCreated={handleEstudianteCreated} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionEstudiante;

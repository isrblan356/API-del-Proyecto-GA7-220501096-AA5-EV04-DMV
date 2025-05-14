import React, { useState } from 'react';
import axios from 'axios';
import ProfesorList from './ProfesorList';
import CrearProfesor from './CrearProfesor';
import EditarProfesor from './EditarProfesor';

const GestionProfesor = () => {
  const [profesorToEdit, setProfesorToEdit] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const handleEditProfesor = (profesor) => {
    if (profesor) {
      setProfesorToEdit(profesor);
      setShowEditForm(true);
    }
  };

  const handleDeleteProfesor = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este profesor?')) {
      try {
        await axios.delete(`http://localhost:8080/api/profesores/${id}`);
        setRefreshList(!refreshList);
      } catch (error) {
        console.error('Error al eliminar el profesor:', error);
        alert('Error al eliminar el profesor');
      }
    }
  };

  const handleProfesorCreated = () => {
    setRefreshList(!refreshList);
  };

  const handleProfesorUpdated = () => {
    setRefreshList(!refreshList);
    setShowEditForm(false);
    setProfesorToEdit(null);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setProfesorToEdit(null);
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="text-primary">Gestión de Profesores</h2>
        <hr />
      </div>

      <div className="row g-4">
        {/* Lista de profesores */}
        <div className="col-lg-6">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-light d-flex align-items-center justify-content-between">
              <h5 className="card-title mb-0">Listado de Profesores</h5>
            </div>
            <div className="card-body p-3">
              <ProfesorList
                onEditProfesor={handleEditProfesor}
                onDeleteProfesor={handleDeleteProfesor}
                refresh={refreshList}
              />
            </div>
          </div>
        </div>

        {/* Formulario de creación/edición */}
        <div className="col-lg-6">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-light d-flex align-items-center justify-content-between">
              <h5 className="card-title mb-0">
                {showEditForm ? 'Editar Profesor' : 'Registrar Nuevo Profesor'}
              </h5>
              {showEditForm && (
                <button className="btn btn-sm btn-outline-secondary" onClick={handleCancelEdit}>
                  Cancelar
                </button>
              )}
            </div>
            <div className="card-body p-3">
              {showEditForm ? (
                <EditarProfesor
                  profesor={profesorToEdit}
                  onProfesorUpdated={handleProfesorUpdated}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <CrearProfesor onProfesorCreated={handleProfesorCreated} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionProfesor;

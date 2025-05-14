// src/components/GestionPrograma.js
import React, { useState } from 'react';
import axios from 'axios';
import ProgramaList from './ProgramaList';
import CrearPrograma from './CrearPrograma';
import EditarPrograma from './EditarPrograma';

const GestionPrograma = () => {
  const [programaToEdit, setProgramaToEdit] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const handleEditPrograma = (programa) => {
    setProgramaToEdit(programa);
    setShowEditForm(true);
  };

  const handleDeletePrograma = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este programa?')) {
      try {
        await axios.delete(`http://localhost:8080/api/programas/${id}`);
        setRefreshList(!refreshList);
      } catch (error) {
        console.error('Error al eliminar el programa:', error);
        alert('Error al eliminar el programa');
      }
    }
  };

  const handleProgramaCreated = () => {
    setRefreshList(!refreshList);
  };

  const handleProgramaUpdated = () => {
    setRefreshList(!refreshList);
    setShowEditForm(false);
    setProgramaToEdit(null);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setProgramaToEdit(null);
  };

  return (
    <div className="row g-4">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Lista de Programas</h5>
          </div>
          <div className="card-body">
            <ProgramaList 
              onEditPrograma={handleEditPrograma} 
              onDeletePrograma={handleDeletePrograma}
              refresh={refreshList}
            />
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className={`card-header ${showEditForm ? 'bg-warning text-dark' : 'bg-success text-white'}`}>
            <h5 className="mb-0">{showEditForm ? 'Editar Programa' : 'Crear Nuevo Programa'}</h5>
          </div>
          <div className="card-body">
            {showEditForm ? (
              <EditarPrograma 
                programa={programaToEdit} 
                onProgramaUpdated={handleProgramaUpdated}
                onCancel={handleCancelEdit}
              />
            ) : (
              <CrearPrograma onProgramaCreated={handleProgramaCreated} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionPrograma;

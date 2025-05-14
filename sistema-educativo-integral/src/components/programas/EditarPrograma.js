// src/components/EditarPrograma.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarPrograma = ({ programa, onProgramaUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar los datos del programa cuando el componente se monta o cuando cambia el programa
  useEffect(() => {
    if (programa) {
      setFormData({
        nombre: programa.nombre || '',
        descripcion: programa.descripcion || ''
      });
    }
  }, [programa]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validación básica
    if (!formData.nombre.trim() || !formData.descripcion.trim()) {
      setError('Todos los campos son obligatorios');
      setIsSubmitting(false);
      return;
    }

    try {
      // Configuración para la petición HTTP
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      // Para depuración
      console.log('Enviando datos de actualización:', formData);
      
      // Envío de datos a la API
      const response = await axios.put(
        `http://localhost:8080/api/programas/${programa.id}`, 
        formData,
        config
      );
      console.log('Respuesta del servidor:', response.data);
      
      setSuccess('Programa actualizado con éxito');
      setError('');
      
      // Notificar al componente padre
      if (onProgramaUpdated) {
        onProgramaUpdated();
      }
    } catch (error) {
      console.error('Error completo:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
      setError(`Error al actualizar el programa: ${errorMessage}`);
      setSuccess('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-warning text-dark">
        <h5 className="card-title mb-0">Editar Programa</h5>
      </div>
      <div className="card-body">
        {/* Mostrar mensajes de error */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError('')} 
              aria-label="Close"
            />
          </div>
        )}
        
        {/* Mostrar mensajes de éxito */}
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setSuccess('')} 
              aria-label="Close"
            />
          </div>
        )}
        
        {/* Formulario de edición */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className={`form-control ${error && !formData.nombre ? 'is-invalid' : ''}`}
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre del programa"
              required
            />
            {error && !formData.nombre && (
              <div className="invalid-feedback">
                El nombre es obligatorio
              </div>
            )}
          </div>
          
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              className={`form-control ${error && !formData.descripcion ? 'is-invalid' : ''}`}
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Ingrese una descripción"
              rows="4"
              required
            />
            {error && !formData.descripcion && (
              <div className="invalid-feedback">
                La descripción es obligatoria
              </div>
            )}
          </div>
          
          <div className="d-flex gap-2">
            <button 
              type="submit" 
              className="btn btn-warning"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Actualizando...
                </>
              ) : 'Actualizar'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPrograma;
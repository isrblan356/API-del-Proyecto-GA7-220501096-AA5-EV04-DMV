// src/components/CrearPrograma.js
import React, { useState } from 'react';
import axios from 'axios';

const CrearPrograma = ({ onProgramaCreated }) => {
  const [programa, setPrograma] = useState({ nombre: '', descripcion: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrograma({ ...programa, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!programa.nombre.trim() || !programa.descripcion.trim()) {
      setError('Todos los campos son obligatorios');
      setIsSubmitting(false);
      return;
    }

    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      await axios.post('http://localhost:8080/api/programas', programa, config);
      setSuccess('Programa creado con éxito');
      setError('');
      setPrograma({ nombre: '', descripcion: '' });
      if (onProgramaCreated) onProgramaCreated();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
      setError(`Error al crear el programa: ${errorMessage}`);
      setSuccess('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close" />
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button type="button" className="btn-close" onClick={() => setSuccess('')} aria-label="Close" />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className={`form-control ${error && !programa.nombre ? 'is-invalid' : ''}`}
            id="nombre"
            name="nombre"
            value={programa.nombre}
            onChange={handleChange}
            placeholder="Ingrese el nombre del programa"
            required
          />
          {error && !programa.nombre && (
            <div className="invalid-feedback">El nombre es obligatorio</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className={`form-control ${error && !programa.descripcion ? 'is-invalid' : ''}`}
            id="descripcion"
            name="descripcion"
            value={programa.descripcion}
            onChange={handleChange}
            placeholder="Ingrese una descripción"
            rows="4"
            required
          ></textarea>
          {error && !programa.descripcion && (
            <div className="invalid-feedback">La descripción es obligatoria</div>
          )}
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-success" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Procesando...
              </>
            ) : 'Crear Programa'}
          </button>
        </div>
      </form>
    </>
  );
};

export default CrearPrograma;

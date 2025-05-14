import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearProfesor = ({ onProfesorCreated }) => {
  const [profesor, setProfesor] = useState({
    nombre: '',
    apellido: '',
    especializacion: '',
    fecha_contratacion: '',
    programa_id: ''
  });

  const [programas, setProgramas] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [programasLoading, setProgramasLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProgramas = async () => {
      setProgramasLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/programas');
        setProgramas(response.data);
        setError('');
      } catch (error) {
        console.error('Error obteniendo programas:', error);
        setError('No se pudieron cargar los programas');
      } finally {
        setProgramasLoading(false);
      }
    };
    fetchProgramas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfesor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    setSuccess('');

    const dataToSend = {
      nombre: profesor.nombre,
      apellido: profesor.apellido,
      especializacion: profesor.especializacion,
      fechaContratacion: profesor.fecha_contratacion,
      programa: { id: parseInt(profesor.programa_id) }
    };

    try {
      await axios.post('http://localhost:8080/api/profesores', dataToSend);

      setProfesor({
        nombre: '',
        apellido: '',
        especializacion: '',
        fecha_contratacion: '',
        programa_id: ''
      });

      setSuccess('Profesor creado correctamente');
      if (onProfesorCreated) onProfesorCreated();
    } catch (error) {
      console.error("Error al crear el profesor:", error);
      const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
      setError(`Error al crear el profesor: ${errorMessage}`);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div>
      {/* Alertas */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-dismissible fade show mb-3" role="alert">
          {success}
          <button type="button" className="btn-close" onClick={() => setSuccess('')} aria-label="Close"></button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={profesor.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="apellido" className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              name="apellido"
              value={profesor.apellido}
              onChange={handleChange}
              placeholder="Ingrese el apellido"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="especializacion" className="form-label">Especialización</label>
            <input
              type="text"
              className="form-control"
              id="especializacion"
              name="especializacion"
              value={profesor.especializacion}
              onChange={handleChange}
              placeholder="Ingrese la especialización"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="fecha_contratacion" className="form-label">Fecha de Contratación</label>
            <input
              type="date"
              className="form-control"
              id="fecha_contratacion"
              name="fecha_contratacion"
              value={profesor.fecha_contratacion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="programa_id" className="form-label">Programa Académico</label>
            <select
              className="form-select"
              id="programa_id"
              name="programa_id"
              value={profesor.programa_id}
              onChange={handleChange}
              required
              disabled={programasLoading}
            >
              <option value="">
                {programasLoading ? 'Cargando programas...' : 'Seleccione un programa'}
              </option>
              {programas.map(programa => (
                <option key={programa.id} value={programa.id}>
                  {programa.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" disabled={formLoading || programasLoading}>
              {formLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Guardando...
                </>
              ) : 'Crear Profesor'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CrearProfesor;

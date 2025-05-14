import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearEstudiante = ({ onEstudianteCreated }) => {
  const [estudiante, setEstudiante] = useState({
    nombre: '',
    apellido: '',
    email: '',
    fecha_ingreso: '',
    semestre: '',
    programa_id: ''
  });

  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar la lista de programas
    const fetchProgramas = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/programas');
        setProgramas(response.data);
        setError(null);
      } catch (error) {
        console.error('Error obteniendo programas:', error);
        setError('No se pudieron cargar los programas');
      } finally {
        setLoading(false);
      }
    };
    fetchProgramas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstudiante({
      ...estudiante,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const dataToSend = {
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      email: estudiante.email,
      fecha_ingreso: estudiante.fecha_ingreso,
      semestre: parseInt(estudiante.semestre),
      programa: { id: parseInt(estudiante.programa_id) } // Enviar el programa como objeto con ID
    };

    try {
      await axios.post('http://localhost:8080/api/estudiantes', dataToSend);
      
      // Resetear el formulario
      setEstudiante({
        nombre: '',
        apellido: '',
        email: '',
        fecha_ingreso: '',
        semestre: '',
        programa_id: ''
      });
      
      // Notificar éxito
      onEstudianteCreated();
      
      // Mostrar mensaje de éxito
      setError(null);
      // Usar un mensaje de éxito en lugar de alert
      const successMessage = document.getElementById('successMessageEstudiante');
      if (successMessage) {
        successMessage.classList.remove('d-none');
        setTimeout(() => {
          successMessage.classList.add('d-none');
        }, 3000);
      }
    } catch (error) {
      console.error("Error al crear el estudiante:", error);
      setError("Error al crear el estudiante. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="estudiante-form">
      <div className="alert alert-success d-none" id="successMessageEstudiante" role="alert">
        Estudiante creado correctamente
      </div>
      
      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input 
              type="text" 
              className="form-control" 
              id="nombre" 
              name="nombre" 
              placeholder="Ingrese el nombre" 
              value={estudiante.nombre} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="col-md-6 mb-3">
            <label htmlFor="apellido" className="form-label">Apellido</label>
            <input 
              type="text" 
              className="form-control" 
              id="apellido" 
              name="apellido" 
              placeholder="Ingrese el apellido" 
              value={estudiante.apellido} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            placeholder="ejemplo@correo.com" 
            value={estudiante.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="fecha_ingreso" className="form-label">Fecha de Ingreso</label>
            <input 
              type="date" 
              className="form-control" 
              id="fecha_ingreso" 
              name="fecha_ingreso" 
              value={estudiante.fecha_ingreso} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="col-md-6 mb-3">
            <label htmlFor="semestre" className="form-label">Semestre</label>
            <input 
              type="number" 
              className="form-control" 
              id="semestre" 
              name="semestre" 
              placeholder="Ingrese el semestre actual" 
              min="1" 
              max="10"
              value={estudiante.semestre} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="programa_id" className="form-label">Programa Académico</label>
          <select 
            className="form-select" 
            id="programa_id" 
            name="programa_id" 
            value={estudiante.programa_id} 
            onChange={handleChange} 
            required
          >
            <option value="">Seleccione un programa</option>
            {programas.map(programa => (
              <option key={programa.id} value={programa.id}>{programa.nombre}</option>
            ))}
          </select>
        </div>

        <div className="d-grid gap-2">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Guardando...
              </>
            ) : 'Crear Estudiante'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearEstudiante;
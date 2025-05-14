import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarProfesor = ({ profesor, onProfesorUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    especializacion: '',
    fecha_contratacion: '',
    programa_id: ''
  });

  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    // Cargar programas disponibles
    axios.get('http://localhost:8080/api/programas')
      .then(response => setProgramas(response.data))
      .catch(error => console.error("Error obteniendo programas:", error));
  
    // Cargar datos del profesor
    if (profesor) {
      console.log("Cargando datos del profesor:", profesor);
      setFormData({
        nombre: profesor.nombre || "",
        apellido: profesor.apellido || "",
        especializacion: profesor.especializacion || "",
        fecha_contratacion: profesor.fecha_contratacion || "2025-01-01",
        programa_id: profesor.programa ? profesor.programa.id.toString() : ""
      });
    }
  }, [profesor]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      especializacion: formData.especializacion,
      fecha_contratacion: formData.fecha_contratacion || "2025-01-01",
      programa: formData.programa_id ? { id: parseInt(formData.programa_id) } : null
    };

    console.log("JSON enviado al backend:", JSON.stringify(dataToSend, null, 2));

    try {
      const response = await axios.put(`http://localhost:8080/api/profesores/${profesor.id}`, dataToSend);
      console.log("Respuesta del backend:", response.data);

      alert("Profesor actualizado correctamente");
      onProfesorUpdated();
    } catch (error) {
      console.error("Error actualizando profesor:", error.response ? error.response.data : error);
      alert("Error al actualizar el profesor. Revisa la consola para más detalles.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Editar Profesor</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Especialización</label>
              <input
                type="text"
                name="especializacion"
                value={formData.especializacion}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha de Contratación</label>
              <input
                type="date"
                name="fecha_contratacion"
                value={formData.fecha_contratacion}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Programa</label>
              <select
                name="programa_id"
                value={formData.programa_id}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Seleccione un programa</option>
                {programas.map(programa => (
                  <option key={programa.id} value={programa.id}>
                    {programa.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success me-2">
                Actualizar Profesor
              </button>
              <button type="button" onClick={onCancel} className="btn btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarProfesor;

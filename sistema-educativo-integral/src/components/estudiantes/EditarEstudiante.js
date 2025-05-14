import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarEstudiante = ({ estudiante, onEstudianteUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    fecha_ingreso: '',
    semestre: '',
    programa_id: ''
  });

  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    // Cargar programas disponibles
    axios.get('http://localhost:8080/api/programas')
      .then(response => setProgramas(response.data))
      .catch(error => console.error("Error obteniendo programas:", error));
  
    // Cargar datos del estudiante
    if (estudiante) {
      console.log("Cargando datos del estudiante:", estudiante);
      setFormData({
        nombre: estudiante.nombre || "",
        apellido: estudiante.apellido || "",
        email: estudiante.email || "",
        fecha_ingreso: estudiante.fecha_ingreso || "2025-01-01",
        semestre: estudiante.semestre ? estudiante.semestre.toString() : "1",
        programa_id: estudiante.programa ? estudiante.programa.id.toString() : ""
      });
    }
  }, [estudiante]);

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
      email: formData.email,
      fecha_ingreso: formData.fecha_ingreso || "2025-01-01",
      semestre: parseInt(formData.semestre),
      programa: formData.programa_id ? { id: parseInt(formData.programa_id) } : null
    };

    console.log("JSON enviado al backend:", JSON.stringify(dataToSend, null, 2));

    try {
      const response = await axios.put(`http://localhost:8080/api/estudiantes/${estudiante.id}`, dataToSend);
      console.log("Respuesta del backend:", response.data);

      alert("Estudiante actualizado correctamente");
      onEstudianteUpdated();
    } catch (error) {
      console.error("Error actualizando estudiante:", error.response ? error.response.data : error);
      alert("Error al actualizar el estudiante. Revisa la consola para más detalles.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-dark">
          <h4 className="mb-0">Editar Estudiante</h4>
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
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha de Ingreso</label>
              <input
                type="date"
                name="fecha_ingreso"
                value={formData.fecha_ingreso}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Semestre</label>
              <input
                type="number"
                name="semestre"
                value={formData.semestre}
                onChange={handleChange}
                className="form-control"
                required
                min="1"
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
                Actualizar Estudiante
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

export default EditarEstudiante;


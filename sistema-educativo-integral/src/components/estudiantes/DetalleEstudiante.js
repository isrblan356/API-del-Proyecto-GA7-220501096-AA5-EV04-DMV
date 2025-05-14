// src/components/DetalleEstudiante.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetalleEstudiante = ({ estudiante, cargarEstudiantes, setEstudianteAEditar }) => {
    const [nombre, setNombre] = useState(estudiante.nombre);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(estudiante.materias[0]?.id || '');
    const [materias, setMaterias] = useState([]);
    const [mostrarTabla, setMostrarTabla] = useState(true);  // Estado para controlar la visibilidad de la tabla

    useEffect(() => {
        axios.get(`http://localhost:8080/api/estudiantes/${estudiante.id}/materias`)
            .then(response => setMaterias(response.data))
            .catch(error => console.log(error));
    }, [estudiante.id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const estudianteActualizado = {
            ...estudiante,
            nombre,
            materias: [{ id: materiaSeleccionada }]
        };

        axios.put(`http://localhost:8080/api/estudiantes/${estudiante.id}`, estudianteActualizado)
            .then(() => {
                cargarEstudiantes();
                alert('Estudiante actualizado con éxito');
                setEstudianteAEditar(null);
            })
            .catch(error => {
                console.log(error);
                alert('Hubo un error al actualizar el estudiante');
            });
    };

    // Función para eliminar una materia
    const eliminarMateria = (id) => {
        axios.delete(`http://localhost:8080/api/materias/${id}`)
            .then(() => {
                cargarEstudiantes(); // Recargar los estudiantes después de eliminar
                alert('Materia eliminada con éxito');
            })
            .catch(error => {
                console.log(error);
                alert('Hubo un error al eliminar la materia');
            });
    };

    // Función para manejar el clic en el botón cancelar y ocultar la tabla
    const handleCancelar = () => {
        setMostrarTabla(false);  // Cambia el estado de la tabla para que no se muestre
    };

    return (
        <div>
            {mostrarTabla && (  // Si mostrarTabla es true, muestra la tabla
                <table>
                    <thead>
                        <tr><h3>Lista de Materias:</h3></tr>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materias.map(materia => (
                            <tr key={materia.id}>
                                <td>{materia.nombre}</td>
                                <td>
                                    <button type="button" onClick={() => eliminarMateria(materia.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DetalleEstudiante;

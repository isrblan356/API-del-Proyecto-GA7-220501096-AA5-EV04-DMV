// src/components/ProgramaList.js
import React, { useState } from 'react';
import axios from 'axios';
import EditarPrograma from './EditarPrograma'; // Corrección: importación correcta del componente EditarPrograma

const ProgramaList = ({ programas, cargarProgramas }) => {
    const [programaAEditar, setProgramaAEditar] = useState(null); // Variable correctamente nombrada

    // Función para eliminar un programa
    const eliminarPrograma = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/programas/${id}`);
            cargarProgramas(); // Recargar los programas después de eliminar
            alert('Programa eliminado con éxito');
        } catch (error) {
            console.error('Error al eliminar el programa:', error); // Mensaje de error mejorado
            alert('Hubo un error al eliminar el programa');
        }
    };

    // Función para activar la edición de un programa
    function editarPrograma(programa) {
        setProgramaAEditar(programa);
    }

    return (
        <div>
            <h3>Lista de Programas</h3>
            
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {programas.length > 0 ? (
                        programas.map((programa) => (
                            <tr key={programa.id}>
                                <td>{programa.nombre}</td>
                                <td>                            
                                    <button onClick={() => editarPrograma(programa)}>Editar</button>
                                    <button onClick={() => eliminarPrograma(programa.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No hay programas disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Renderizar el formulario de edición si hay un programa seleccionado */}
            {programaAEditar && (
                <EditarPrograma
                    programa={programaAEditar}
                    cargarProgramas={cargarProgramas}
                    setProgramaAEditar={setProgramaAEditar} // Para cerrar el formulario de edición después de guardar
                />
            )}
        </div>
    );
};

export default ProgramaList;


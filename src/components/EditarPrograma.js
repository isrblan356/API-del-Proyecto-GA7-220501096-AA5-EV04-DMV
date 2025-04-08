// src/components/EditarPrograma.js
import React, { useState } from 'react';
import axios from 'axios';

const EditarPrograma = ({ programa, cargarProgramas, setProgramaAEditar }) => {
    // Inicializa el estado con el nombre del programa
    const [nombre, setNombre] = useState(programa?.nombre || ''); // Añadido un operador de seguridad por si 'programa' es undefined

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear el objeto actualizado
        const programaActualizado = {
            nombre,
        };
            // Realizar la solicitud PUT al backend
        await axios.put(`http://localhost:8080/api/programas/${programa.id}`, programaActualizado)
            .then(response => {
                cargarProgramas(); // Recargar los programas después de editar
                alert('Programa actualizado con éxito');
                setProgramaAEditar(null); // Cerrar el formulario de edición
              })
                .catch(error => {
                 console.log(error);
                 alert('Hubo un error al actualizar el producto');
              });
            };

    return (
        <div>
            <h3>Editar Programa</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={() => setProgramaAEditar(null)}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditarPrograma;




// src/components/CrearPrograma.js
import React, { useState } from 'react';
import axios from 'axios';

const CrearPrograma = ({ cargarProgramas }) => {
    const [nombre, setNombre] = useState('');
    
    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear el objeto programa según los datos introducidos
        const nuevoPrograma = {
            nombre,
        };

        try {
            // Realizar la solicitud POST al backend
            await axios.post('http://localhost:8080/api/programas', nuevoPrograma);
            alert('Programa creado exitosamente');
            cargarProgramas(); // Recargar la lista de programas
        } catch (error) {
            console.error('Error al crear el programa:', error);
            alert('Hubo un error al crear el programa');
        }

        // Limpiar los campos del formulario después de agregar el programa
        setNombre('');
    };

    return (
        <div>
            <h3>Crear Programa</h3>
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
                <button type="submit">Crear Programa</button>
            </form>
        </div>
    );
};

export default CrearPrograma;


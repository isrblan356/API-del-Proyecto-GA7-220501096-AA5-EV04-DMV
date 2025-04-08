// src/components/GestionPrograma.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgramaList from './ProgramaList';
import CrearPrograma from './CrearPrograma';

const GestionPrograma = () => {
    const [programas, setProgramas] = useState([]); // Lista de programas
    const [cargando, setCargando] = useState(true); // Estado para cargar datos

    // Función para cargar los programas desde el backend
    const cargarProgramas = async () => {
        setCargando(true); // Activar el estado de carga
        try {
            const response = await axios.get('http://localhost:8080/api/programas');
            setProgramas(response.data); // Actualizar la lista de programas
            console.log('Programas cargados:', response.data); // Depuración
        } catch (error) {
            console.error('Error al cargar los programas:', error);
        } finally {
            setCargando(false); // Desactivar el estado de carga
        }
    };

    // Llamar a cargarProgramas cuando se monta el componente
    useEffect(() => {
        cargarProgramas();
    }, []);
    console.log('Programas pasados a ProgramaList:', programas);
    return (
        <div>
            <h2>Gestión de Programas</h2>

            {/* Crear Programa */}
            <CrearPrograma cargarProgramas={cargarProgramas} />

            {/* Lista de Programas */}
            {cargando ? (
                <p>Cargando programas...</p>
            ) : (
                <ProgramaList
                    programas={programas}
                    cargarProgramas={cargarProgramas}
                />
                
            )}
        </div>
    );
};

export default GestionPrograma;


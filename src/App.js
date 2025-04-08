// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GestionPrograma from './components/GestionPrograma';

const App = () => {
    return (
        <div>
            <header>
                <h1>Sistema de Gestión de Programas</h1>
            </header>
            <main>
                <GestionPrograma />
            </main>
            <footer>
                <p>© 2025 Sistema de Gestión de Programas. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default App;
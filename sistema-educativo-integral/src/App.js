import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import GestionPrograma from './components/programas/GestionPrograma';
import GestionProfesor from './components/profesores/GestionProfesor';
import GestionEstudiante from './components/estudiantes/GestionEstudiante';
import MiComponente from './MiComponente'; // Asegúrate de que la ruta sea correcta
// Importar otros componentes necesarios
import Navbar from './components/Navbar';
import Home from './components/home'; // Importamos con mayúscula para seguir convenciones de React

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/programas" element={<GestionPrograma />} />
          <Route path="/profesores" element={<GestionProfesor />} />
          <Route path="/estudiantes" element={<GestionEstudiante />} />
          <Route path="/" element={<Home />} /> {/* Usamos el componente Home en la ruta principal */}
          <Route path="/test" element={<MiComponente />} /> {/* 🔹 Nueva ruta para probar la API */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
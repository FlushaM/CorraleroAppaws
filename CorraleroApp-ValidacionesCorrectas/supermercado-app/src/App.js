import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CarniceriaPage from './modules/Carniceria/CarniceriaPage';
import VerduleriaPage from './modules/Verduleria/VerduleriaPage';
import RoticeriaPage from './modules/Roticeria/RoticeriaPage';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import PanaderiaPage from './modules/Panaderia/PanaderiaPage'; // Nuevo módulo

=======
import PanaderiaPage from './modules/Panaderia/PanaderiaPage';
import TimeClockPage from './modules/Reloj/TimeClockPage'; // Importamos tu nueva página
>>>>>>> parent of 97f4b5a (Update App.js)
=======
import PanaderiaPage from './modules/Panaderia/PanaderiaPage'; // Nuevo módulo

>>>>>>> parent of 93741ad (RelojMarcajeV1)
=======
import PanaderiaPage from './modules/Panaderia/PanaderiaPage'; // Nuevo módulo

>>>>>>> parent of 93741ad (RelojMarcajeV1)

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ruta principal para Login */}
                <Route path="/" element={<LoginPage />} />
                
                {/* Ruta para el Dashboard del Administrador */}
                <Route path="/dashboard" element={<AdminDashboard />} />
                
                {/* Ruta para Carnicería */}
                <Route path="/carniceria" element={<CarniceriaPage />} />
                
                {/* Ruta para Verdulería */}
                <Route path="/verduleria" element={<VerduleriaPage />} />
                
                {/* Ruta para Roticería */}
                <Route path="/roticeria" element={<RoticeriaPage />} />
                
                {/* Ruta para Panadería */}
                <Route path="/panaderia" element={<PanaderiaPage />} />
                

            </Routes>
        </Router>
    );
};

export default App;

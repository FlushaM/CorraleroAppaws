import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CarniceriaPage from './modules/Carniceria/CarniceriaPage';
import VerduleriaPage from './modules/Verduleria/VerduleriaPage';
import RoticeriaPage from './modules/Roticeria/RoticeriaPage';
import PanaderiaPage from './modules/Panaderia/PanaderiaPage'; // Nuevo módulo


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

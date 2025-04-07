import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Login from '../pages/Login/Login';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import Home from '../pages/Home/Home';
import Perfil from '../pages/Perfil/Perfil';
import Pago from '../pages/Pago/Pago';
import RegistroUsuario from '../pages/RegistroUsuario/RegistroUsuario';
import VerInscripcionCampeonato from '../pages/VerInscripcionCampeonato/verinscripcioncampeonato';
import RegistroCampeonato from '../pages/RegistroCampeonato/RegistroCampeonato';
import Campeonatos from '../pages/campeonatos/Campeonatos';
import GestionFinanciera from '../pages/GestionFinanciera/GestionFinanciera';
import ProtectedRoute from '../layouts/ProtectedRoute/ProtectedRoute';


const AppRoutes = () => {

    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Login />} />
            <Route path="/registro-usuario" element={<RegistroUsuario />} />



            {/* Rutas protegidas para cualquier usuario autenticado */}
            <Route path="/campeonatos" element={<ProtectedRoute><Campeonatos/></ProtectedRoute> }/>   
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
            <Route path="/pago" element={<ProtectedRoute><Pago /></ProtectedRoute>} />
            <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
            <Route path="/ver-inscripcion-campeonato" element={<ProtectedRoute><VerInscripcionCampeonato /></ProtectedRoute>} />


            {/* Rutas protegidas para admin */}
            <Route path="/registro-campeonato" element={<ProtectedRoute requireAdmin={true}> <RegistroCampeonato /></ProtectedRoute>} />
            <Route path='/gestion-financiera' element={<ProtectedRoute requireAdmin={true}><GestionFinanciera /></ProtectedRoute>} />
        </Routes>
    )
}

export default AppRoutes;
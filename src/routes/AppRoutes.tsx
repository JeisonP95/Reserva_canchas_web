import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Login from '../pages/Login/Login';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import Home from '../pages/Home/Home';
import Perfil from '../pages/Perfil/Perfil';
import Pago from '../pages/Pago/Pago';
import RegistroUsuario from '../pages/RegistroUsuario/RegistroUsuario';
import RegistroCampeonato from '../pages/RegistroCampeonato/RegistroCampeonato';
import VerInscripcionCampeonato from '../pages/VerInscripcionCampeonato/verinscripcioncampeonato';
import CrearUsuarioAdmin from '../pages/Crearusuarioadmin/crearusuarioadmin';



const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/pago" element={<Pago />} />
            <Route path="/registro-usuario" element={<RegistroUsuario />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/registro-campeonato" element={<RegistroCampeonato />} />
            <Route path="/" element={<Login />} />
            <Route path="/ver-inscripcion-campeonato" element={<VerInscripcionCampeonato />} />
            <Route path="/crearusuarioadmin" element={<CrearUsuarioAdmin/>}/>


        </Routes>
    )
}

export default AppRoutes;
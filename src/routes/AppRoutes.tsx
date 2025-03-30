import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Login from '../pages/Login/Login';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import Home from '../pages/Home/Home';
import Perfil from '../pages/Perfil/Perfil';


const AppRoutes = () => {

    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/home" element={<Home/>}/>
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/" element={<Login />} />
        </Routes>        
    )
}

export default AppRoutes;
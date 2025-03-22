import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Login from '../pages/Login/Login';

const AppRoutes = () => {

    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>        
    )
}

export default AppRoutes;
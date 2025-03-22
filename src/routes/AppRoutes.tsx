import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
        </Routes>        
    )
}

export default AppRoutes;
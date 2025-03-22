import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound: React.FC = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#e0f7fa"
        >
            <Typography variant="h3" color="#01579b">
                Página no encontrada
            </Typography>
            <Typography variant="subtitle1" color="#0288d1" marginTop={2}>
                ¡Ups! Parece que te has perdido.
            </Typography>
        </Box>
    );
};

export default NotFound;
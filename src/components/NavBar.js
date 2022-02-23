import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1, width: 1, backgroundColor: '#d5d8dc' }}>
            <AppBar position="static" sx={{ backgroundColor: '#f4f6f6'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left", color: "#4d5656" }}>
                        grow therapy take home
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
};

export default NavBar;
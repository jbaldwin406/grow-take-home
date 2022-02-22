import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1, width: 1, backgroundColor: '#d5d8dc' }}>
            <AppBar position="static" sx={{ backgroundColor: '#5d6d7e'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
                        grow therapy take home
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
};

export default NavBar;
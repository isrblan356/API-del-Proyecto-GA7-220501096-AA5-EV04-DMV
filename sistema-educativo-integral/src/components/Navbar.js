import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Sistema Académico
            </Link>
          </Typography>
          
          <Button color="inherit" component={Link} to="/profesores">
            Profesores
          </Button>
          <Button color="inherit" component={Link} to="/estudiantes">
            Estudiantes
          </Button>
          <Button color="inherit" component={Link} to="/programas">
            Programas
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
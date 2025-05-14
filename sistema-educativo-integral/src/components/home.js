import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Container, Button, Grid, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sistema de Gestión Académica
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Administre estudiantes, profesores y programas académicos de manera eficiente
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SchoolIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Estudiantes
            </Typography>
            <Typography variant="body1" paragraph>
              Gestione los registros de estudiantes, visualice información detallada y realice seguimiento académico.
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to="/estudiantes" 
              sx={{ mt: 'auto' }}
            >
              Ver Estudiantes
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PersonIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Profesores
            </Typography>
            <Typography variant="body1" paragraph>
              Administre el personal docente, sus asignaciones y perfiles profesionales.
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to="/profesores" 
              sx={{ mt: 'auto' }}
            >
              Ver Profesores
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MenuBookIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Programas
            </Typography>
            <Typography variant="body1" paragraph>
              Gestione los programas académicos, planes de estudio y asignaciones de cursos.
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to="/programas" 
              sx={{ mt: 'auto' }}
            >
              Ver Programas
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
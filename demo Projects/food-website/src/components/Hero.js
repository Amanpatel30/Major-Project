import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const Hero = () => {
  return (
    <Box
      sx={{
        height: '80vh',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://source.unsplash.com/1600x900/?food,restaurant")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Delicious Eats
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          Experience the finest cuisine with our carefully crafted dishes
        </Typography>
        <Button variant="contained" size="large" sx={{ backgroundColor: '#ff4d4d', '&:hover': { backgroundColor: '#ff3333' } }}>
          View Menu
        </Button>
      </Container>
    </Box>
  );
};

export default Hero; 
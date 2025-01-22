import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#ff4d4d' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <RestaurantMenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Delicious Eats
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Menu</Button>
        <Button color="inherit">About</Button>
        <Button color="inherit">Contact</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 
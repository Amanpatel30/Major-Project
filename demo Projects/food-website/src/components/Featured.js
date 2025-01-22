import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const featuredDishes = [
  {
    title: 'Signature Pasta',
    description: 'Fresh homemade pasta with rich tomato sauce',
    image: 'https://source.unsplash.com/800x600/?pasta'
  },
  {
    title: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with herbs and lemon',
    image: 'https://source.unsplash.com/800x600/?salmon'
  },
  {
    title: 'Chocolate Dessert',
    description: 'Decadent chocolate cake with berries',
    image: 'https://source.unsplash.com/800x600/?chocolate,cake'
  }
];

const Featured = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Featured Dishes
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Discover our chef's special selection
        </Typography>
        <Grid container spacing={4}>
          {featuredDishes.map((dish, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={dish.image}
                  alt={dish.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {dish.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dish.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Featured; 
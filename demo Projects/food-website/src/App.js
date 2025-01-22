import React from 'react';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Featured from './components/Featured';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Hero />
      <Featured />
    </>
  );
}

export default App; 
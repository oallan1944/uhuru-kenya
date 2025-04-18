import React from 'react';
import './App.css';
import { Button, ThemeProvider } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Navbar from './customer/components/Navbar/navbar';
import customTheme from './Theme/customTheme';
import Home from './customer/pages/Home/Home';



function App() {
  return (

    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar/>
        <Home/>
      </div>

    </ThemeProvider>






  );
}

export default App;

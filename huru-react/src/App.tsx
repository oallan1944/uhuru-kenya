import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import Navbar from './customer/components/Navbar/navbar';
import customTheme from './Theme/customTheme';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import ProductDetails from './customer/pages/ProductDetails/ProductDetails';
import Reviews from './customer/pages/Review/Reviews';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BecomeSeller from './customer/pages/Become Seller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/pages/Dashboard/AdminDashboard';
import { fetchProduct } from './State/fetchProduct';
import { useAppDispatch, useAppSelector } from './State/store';
import { fetchSellerProfile } from './State/seller/sellerSlice';
import Auth from './customer/pages/Auth/Auth';




function App() {
  const dispatch = useAppDispatch();
  const { seller } = useAppSelector(store => store)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""))

  }, [])

  useEffect(() => {
    if (seller.profile) {
      navigate("/seller")
    }
  }, [seller.profile])
  return (

    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/products/:category' element={<Product />} />
          <Route path='/reviews/:productId' element={<Reviews />} />
          <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/become-seller' element={<BecomeSeller />} />
          <Route path='/account/*' element={<Account />} />
          <Route path='/seller/*' element={<SellerDashboard />} />
          <Route path='/admin/*' element={<AdminDashboard />} />
        </Routes>
      </div>

    </ThemeProvider>






  );
}

export default App;

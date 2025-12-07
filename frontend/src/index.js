import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './index.css';
import HomePage from './landing_page/home/HomePage';
import SupportPage from './landing_page/support/SupportPage';
import AboutPage from './landing_page/about/AboutPage';
import PricingPage from './landing_page/pricing/PricingPage';
import ProductsPage from './landing_page/products/ProductsPage';
import Footer from './landing_page/Footer';
import Navbar from './landing_page/Navbar';
import NotFound from './landing_page/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import Login from './landing_page/Login/Login.js';
import Signup from './landing_page/signup/Signup';
import ForgotPassword from './landing_page/ForgotPassword/ForgotPassword.js';
import ResetPassword from './landing_page/ResetPassword/ResetPassword.js';

import CreateTicket from './landing_page/support/CreateTicket.js'; // 1. IMPORT

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/support' element={<SupportPage/>}></Route>
        <Route path='/about' element={<AboutPage/>}></Route>
        <Route path='/pricing' element={<PricingPage/>}></Route>
        <Route path='/products' element={<ProductsPage/>}></Route>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='*' element={<NotFound/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/create-ticket" element={<CreateTicket />} /> {/* 2. ADD ROUTE */}
      </Routes>
    <Footer/>
  </BrowserRouter>
);


import { useState } from 'react'
import './App.css'


// React Slick slider CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Common/Navbar.jsx'
import Footer from './components/Common/Footer.jsx'




function App() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Toaster />
   <Footer/>
    </>
  )
}

export default App

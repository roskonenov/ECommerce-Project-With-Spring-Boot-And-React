import './App.css';
import Home from './components/home/Home';
import Navbar from './components/navigation/Navbar';
import Products from './components/products/Products';
import About from "./components/about/About.jsx";
import Contacts from './components/contact/Contacts.jsx';
import React from 'react';
import Cart from './components/cart/Cart.jsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LogIn from './components/auth/LogIn.jsx';


function App() {

  return (
    <React.Fragment>
      <Toaster position='top-center'/>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LogIn />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App

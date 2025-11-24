import './App.css';
import Home from './components/home/Home';
import Navbar from './components/navigation/Navbar';
import Products from './components/products/Products';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from "./components/about/About.jsx";
import Contacts from './components/contact/Contacts.jsx';
import { Toaster } from 'react-hot-toast';
import React from 'react';


function App() {

  return (
    <React.Fragment>
      <Toaster position='top-right'/>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/contacts' element={<Contacts />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App

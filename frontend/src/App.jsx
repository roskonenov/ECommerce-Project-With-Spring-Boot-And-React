import './App.css';
import Home from './components/home/Home';
import Navbar from './components/navigation/Navbar';
import Products from './components/products/Products';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from "./components/about/About.jsx";


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </Router>
  )
}

export default App

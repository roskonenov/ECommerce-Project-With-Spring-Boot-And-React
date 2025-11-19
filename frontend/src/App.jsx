import './App.css';
import Home from './components/home/Home';
import Navbar from './components/navigation/Navbar';
import Products from './components/products/Products';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<Products />}/>
      </Routes>
    </Router>
  )
}

export default App

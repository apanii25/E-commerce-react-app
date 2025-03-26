import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductNavbar from './components/ProductNavbar';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import CategoryBar from './components/CategoryBar';
import CategoryDetails from './components/CategoryDetails';

function App() {
  return (
    <Router>
      <ProductNavbar />
      <CategoryBar/>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:category" element={<CategoryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

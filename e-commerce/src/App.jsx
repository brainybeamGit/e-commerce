import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Product from './Components/Product'
import NoPage from './Components/NoPage'
import About from './Components/About'
import Navbar from './Layout/Navbar'
import Register from './Layout/Register'
import Login from './Layout/Login'
import ManageProduct from './admin/ManageProduct'
import Contact from './Contact'
import ProtectedRoute from './Route/ProtectedRoute'
import AdminRoute from './Route/AdminRoute'
import Order from './Components/Order'
import ProductDetail from './Components/ProductDetail'
import Cart from './Components/Cart'

const App = () => {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/about' element={<About />} />
        <Route path='/manage-product' element={
          <ProtectedRoute>
            <AdminRoute>
              <ManageProduct />
            </AdminRoute>
          </ProtectedRoute>

        } />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product-detail/:id' element={<ProductDetail />} />
        <Route path='/order' element={<Order />} />
        <Route path='/add-to-cart' element={<Cart />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NoPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
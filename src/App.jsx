import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CryptoHome from './CryptoApp/Pages/CryptoHome'
import CryptoDetails from './CryptoApp/Pages/CryptoDetails'
import Navbar from './CryptoApp/Components/Navbar'


function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<CryptoHome/>} />
        <Route path='/coin/:id' element={<CryptoDetails/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

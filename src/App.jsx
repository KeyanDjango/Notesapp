import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import './App.css'
import Login from './Security/Login';
import Register from './Security/Register';
import ProtectedRoute from "./Security/protectedRoute";



export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<ProtectedRoute>   <Home />  </ProtectedRoute>   } />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
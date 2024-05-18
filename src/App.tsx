import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import { Home } from '@mui/icons-material';
import ProtectedLayout from './layouts/ProtectedLayout';
//import logo from './logo.svg';
//import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

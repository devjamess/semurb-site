import React from 'react';
import {Routes, Route, useLocation, Navigate} from "react-router-dom";
import Login from './pages/login';

function App() {
  const router = useLocation()

  return (
    <>
      <Routes location={router} key={router.pathname}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App

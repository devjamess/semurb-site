import React from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import Login from './pages/login';

function App() {
  const router = useLocation()

  return (
    <>
      <Routes location={router} key={router.pathname}>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  )
}

export default App

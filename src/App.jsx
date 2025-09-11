import * as React from 'react';
import {Routes, Route} from "react-router-dom";
import Login from './pages/login';
import Home from './pages/Home';

function App() {


  return (
  
      <Routes>
        <Route path='/home' element={ <Home /> }/>
        <Route path="/" element={ <Login /> } />
      </Routes>
    
  )
}

export default App;

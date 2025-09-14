import * as React from 'react';
import {Routes, Route} from "react-router-dom";
import Login from './pages/login';
import Home from './pages/Home';
import Profile from './pages/Profile'

function App() {


  return (
  
      <Routes>
        <Route path='/home' element={ <Home /> }/>
        <Route path='/' element={ <Login /> } />
        <Route path='/profile' element={ <Profile /> } />
      </Routes>
    
  )
}

export default App;

import * as React from 'react';
import {Routes, Route, Navigate, Outlet} from "react-router-dom";
import Login from './pages/login';
import Home from './pages/Home';
import Profile from './pages/Profile'
import {AuthProvider} from './context/authProviderImport'
import {useAuth} from './hook/useAuth'
import { BrowserRouter } from 'react-router-dom';

function AuthApp (){
  const {inUser} = useAuth()

  return inUser ? <Outlet /> : <Navigate to='/' />
}

export default function RootApp(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  )
}
function App() {

    return (
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/home' element={<AuthApp />}>
          <Route path='/home' element={ <Home /> }/>
        </Route>
        <Route path='/profile' element={ <Profile /> } />
      </Routes>
    
  ) 
} 



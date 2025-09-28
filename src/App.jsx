import * as React from 'react';
import {Routes, Route, Navigate, Outlet} from "react-router-dom";
import Login from './pages/login';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Teams from './pages/Teams'
import Header from './components/Header'
import Config from './pages/Config'
import Admin from './pages/Admin'
import LoginAdmin from './pages/loginAdmin'
import Employees from './pages/Emplyees'
import {AuthProvider} from './context/authProviderImport'
import {ThemeProvider} from './theme/ThemeProviderImport'
import {useAuth} from './hook/useAuth'
import { BrowserRouter, useLocation } from 'react-router-dom';

function AuthApp (){
  const {inUser} = useAuth()

  if (inUser) {return(<div className="layout"> <Header /> <main className="main-layout"><Outlet /></main> </div>   )} else {<Navigate to='/' />}
}

function AdminAuth () {
  const {inAdmin} = useAuth()

  if(inAdmin) {return(<div className="layout"> <Header /> <main className="main-layout"><Outlet /></main> </div>   )} else {<Navigate to='/login/admin' />}
}


export default function RootApp(){
  return(
    
    <AuthProvider>
      <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
    
  )
}


function App() {
  const location = useLocation()

    return (
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={ <Login /> } />
        <Route path='/login/admin' element={ <LoginAdmin />} />
       
        <Route  element={<AuthApp />}>
          <Route path='/home' element={ <Home /> }/>
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/teams/:id' element={ <Teams /> }/>
          <Route path='/config' element={ <Config />} />
          <Route path='/employees/:id' element={ <Employees />} />
        </Route>

      <Route element={<AdminAuth />}>
          <Route path='/admin' element={<Admin />} />
      </Route>
       
      </Routes>
    
  ); 
} 



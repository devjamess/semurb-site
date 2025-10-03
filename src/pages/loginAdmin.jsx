import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
import {useAuth} from '../hook/useAuth'
function LoginAdmin() {
  const route = useNavigate();
  const {adminSignIn, logout} = useAuth();
  const [registration, setMatricula] = useState()
  const [password, setPassword] = useState()

  const handleSignIn = async (e) => {
    e.preventDefault();

    const adminData = await adminSignIn(registration, password);
    if(adminData){
      route('/admin');
    } else {
     alert('Falha no login, verifique suas credenciais') 
     logout()  
    }


  }
  return (
    <div className="background-login">
      <div className="container-login">
        <div className="logo-login">
          <img src={logo} alt="semurb-logo" className=""/>
          <p className="font-title-logo">Escala Semurb</p>
        </div>

        <form className="form-login" onSubmit={handleSignIn}>
          <div className="title-login">
          <p className="font-title">Administrador</p>
          <p className="font-subtitle">LOGIN</p>
          </div>

        <div className="content-login">
        <label className='label-login'> Numero de Matricula </label>
        <input className='input-login' type="text" name="registration" 
        id="registration" 
        value={registration}
        onChange={(e) => setMatricula(e.target.value)} />

        <label className='label-login'> password </label>
        <input className='input-login' type="password" name="password" id="password" 
        value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className='button-login' type="submit">Entrar</button>
       
        </div> 
        </form>
      </div>

    </div>
  )
}

export default LoginAdmin;
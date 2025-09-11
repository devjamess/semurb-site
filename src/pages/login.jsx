import React from "react";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
function Login() {

  return (
    <div className="background-login">
      <div className="container-login">
        <div className="logo-login">
          <img src={logo} alt="semurb-logo" className=""/>
          <h1>Escala Semurb</h1>
        </div>

        <form className="form-login">
          <div className="title-login">
          <h1 className="font-color">Administrador</h1>
          <h2 className="font-color-light">LOGIN</h2>
          </div>

        <div className="content-login">
        <label > Numero de Matricula </label>
        <input  type="number" id="registration" />

        <label> Senha </label>
        <input type="password" id="password" />

        <button type="submit">Entrar</button>
        <a href="/home">Esqueceu a senha?</a>
        </div> 
        </form>
      </div>

    </div>
  )
}

export default Login;
import React from "react";
import '../styles/login.css'
function Login() {

  return (
    <div className="background-login">
      <div className="container-login">
        <div className="logo-login">
          <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/acec149e-3587-41bf-87f0-d137ca8402b4/32ac977fbe5d38dcda1f0da4ca00be86.png" alt="semurb-logo" />
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
        <a href="#">Esqueceu a senha?</a>
        </div> 
        </form>
      </div>

    </div>
  )
}

export default Login;
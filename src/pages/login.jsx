import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
import {useAuth} from '../hook/useAuth'
function Login() {
  const navigate = useNavigate();
  const {signIn} = useAuth();
  const [matricula_funcionario, setMatricula] = useState()
  const [senha, setSenha] = useState()

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userData = await signIn(matricula_funcionario, senha);
    if(userData){
      console.log(userData);
      navigate('/home');
    } else {
     alert('Falha no login, verifique suas credenciais')
     console.log(userData);
    }


  }
  return (
    <div className="background-login">
      <div className="container-login">
        <div className="logo-login">
          <img src={logo} alt="semurb-logo" className=""/>
          <h1>Escala Semurb</h1>
        </div>

        <form className="form-login" onSubmit={handleSignIn}>
          <div className="title-login">
          <h1 className="font-color">Administrador</h1>
          <h2 className="font-color-light">LOGIN</h2>
          </div>

        <div className="content-login">
        <label > Numero de Matricula </label>
        <input type="number" name="matricula_funcionario" 
        id="matricula_funcionario" 
        value={matricula_funcionario}
        onChange={(e) => setMatricula(e.target.value)} />

        <label> Senha </label>
        <input type="password" name="senha" id="senha" 
        value={senha} onChange={(e) => setSenha(e.target.value)} />

        <button type="submit">Entrar</button>
        <a href="/home">Esqueceu a senha?</a>
        </div> 
        </form>
      </div>

    </div>
  )
}

export default Login;
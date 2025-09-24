import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
import {useAuth} from '../hook/useAuth'
import Alert from '../components/modals/Alert'

function Login() {
  const route = useNavigate();
  const {signIn} = useAuth();
  const [matricula_funcionario, setMatricula] = useState()
  const [senha, setSenha] = useState()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userData = await signIn(matricula_funcionario, senha);
    if(userData.result){
      route('/home');
    } else {
     setResponse(response)
     setErroMessage(userData.error)   
    }


  }
  return (
    <div>
      {erroMessage && 
      <Alert response={response}
      text='ao Fazer Login'
      error={erroMessage}
      onClose={() => setErroMessage("")}
      />
      }
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
        <label className='label-login'> Numero de Matricula </label>
        <input className='input-login' type="number" name="matricula_funcionario" 
        id="matricula_funcionario" 
        value={matricula_funcionario}
        onChange={(e) => setMatricula(e.target.value)} />

        <label className='label-login'> Senha </label>
        <input className='input-login' type="password" name="senha" id="senha" 
        value={senha} onChange={(e) => setSenha(e.target.value)} />

        <button className='button-login' type="submit">Entrar</button>
        <a className='forgot-password' href="/home">Esqueceu a senha?</a>
        <a className='forgot-password' href="/login/admin">Admin</a>
        </div> 
        </form>
      </div>

    </div>
    </div>
  )
}

export default Login;
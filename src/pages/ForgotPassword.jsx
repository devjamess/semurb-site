import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
//import {useAuth} from '../hook/useAuth'
//import Alert from '../components/modals/Alert'

function ForgotPassword(){

  const route = useNavigate();
  const [email, setEmail] = useState()
  //const [erroMessage, setErroMessage] = useState()
  //const [response, setResponse] = useState('Erro')

  const handleSignIn = async (e) => {
    e.preventDefault();

   // const userData = await signIn(matricula_funcionario, senha);
   //if(userData.result){
      route('/home');
   // } else {
    //setResponse(response)
     //setErroMessage(userData.error)   
     //logout()
   // }
  }
  return (
    <div>
      {/* {erroMessage && 
      <Alert response={response}
      text='ao Fazer Login'
      error={erroMessage}
      onClose={() => setErroMessage("")}
      />
      } */}
    <div className="background-login">
      
      <div className="container-login">
        <div className="logo-login">
          <img src={logo} alt="semurb-logo" className=""/>
          <p className="font-title-logo">Escala Semurb</p>
        </div>

        <form className="form-login" onSubmit={handleSignIn}>
          <div className="title-login">
          <p className="font-title">Recuperar</p>
          <p className="font-subtitle">Senha</p>
          </div>

        <div className="content-login">
        <label className='label-login'> Email: </label>
        <input className='input-login' type="email" name="email" 
        id="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} />

        <button type="submit" className={`button-login ${!email ? 'disable' : ''}`} 
        disabled={!email}>Entrar</button>
      
        <a className='forgot-password' href="/">Voltar ao login</a>
        </div> 
        </form>
      </div>

    </div>
    </div>
  )
}export default ForgotPassword;
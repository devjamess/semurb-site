import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
import {useAuth} from '../hook/useAuth'
import Alert from '../components/modals/Alert'

function ResetPassword(){

  const route = useNavigate();
  const [senha, setSenha] = useState()
  const [erroMessage, setErroMessage] = useState('')
  const [response, setResponse] = useState('Erro')
  const {resetPassword} = useAuth()

  const handleSignIn = async (e) => {
    e.preventDefault();

   const newPassword = await resetPassword(senha)
   if(newPassword?.result){
      setResponse('Sucesso')
      setErroMessage(newPassword.sucess)
   } else {
    setResponse(response)
    setErroMessage(newPassword.error)   
   }
  }
  return (
    <div>
      { erroMessage && 
      <Alert response={response}
      text='ao Mudar Senha'
      error={erroMessage}
      onClose={() => {setErroMessage(""); route('/')}}
      />
      }
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
        <label className='label-login'> Nova Senha: </label>
        <input className='input-login' type="password" name="password" 
        id="password" 
        value={senha}
        onChange={(e) => setSenha(e.target.value)} />

        <button type="submit" className={`button-login ${!senha ? 'disable' : ''}`} 
        disabled={!senha}>Entrar</button>
      
        <a className='forgot-password' href="/">Voltar ao login</a>
        </div> 
        </form>
      </div>

    </div>
    </div>
  )
}export default ResetPassword;
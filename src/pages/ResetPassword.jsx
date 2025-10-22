import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
import {useAuth} from '../hook/useAuth'
import Alert from '../components/modals/Alert'

function ResetPassword(){

  const route = useNavigate();
  const [nova_senha, setSenha] = useState()
  const [confirmar_senha, setConfirmSenha] = useState()
  const [erroMessage, setErroMessage] = useState('')
  const [response, setResponse] = useState('Erro')
  const {resetPassword} = useAuth()
  const {id} = useParams()
  const handleSignIn = async (e) => {
    e.preventDefault();

   const newPassword = await resetPassword(nova_senha, confirmar_senha)
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
      onClose={() => {setErroMessage("");
      if(response === 'Sucesso')
      route('/')
    }}
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
        <input className='input-login' type="password"
        value={nova_senha}
        onChange={(e) => setSenha(e.target.value)} />

         <label className='label-login'> Confirmar Senha: </label>
        <input className='input-login' type="password" 
        value={confirmar_senha}
        onChange={(e) => setConfirmSenha(e.target.value)} />

        <button type="submit" className={`button-login ${!nova_senha || !confirmar_senha ? 'disable' : ''}`} 
        disabled={!nova_senha || !confirmar_senha}>Enviar</button>
      
        <a className='forgot-password' href="/">Voltar ao login</a>
        </div> 
        </form>
      </div>

    </div>
    </div>
  )
}export default ResetPassword;
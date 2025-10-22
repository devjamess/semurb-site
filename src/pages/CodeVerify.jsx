import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
import {useAuth} from '../hook/useAuth'
import Alert from '../components/modals/Alert'

function CodeVerify(){

  const route = useNavigate();
  const [code, setCode] = useState()
  const [erroMessage, setErroMessage] = useState('')
  const [response, setResponse] = useState('Erro')
  const {codeVerify} = useAuth()
  const {id} = useParams()
  const handleSignIn = async (e) => {
    e.preventDefault();

   const receiveCode = await codeVerify(id, code)
   if(receiveCode?.result){
      setResponse('Sucesso')
      setErroMessage(receiveCode.sucess)
      console.log(receiveCode)
   } else {
    setResponse(response)
    setErroMessage(receiveCode.error)   
   }
  }
  return (
    <div>
      { erroMessage && 
      <Alert response={response}
      text='ao Verificar Código'
      error={erroMessage}
      onClose={() => {setErroMessage("");
        if(response === 'Sucesso')
        route(`/reset-password/${re}`)
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
        <label className='label-login'> Código: </label>
        <input className='input-login' type="number" name="code" 
        id="code" 
        value={code}
        onChange={(e) => setCode(e.target.value)} />

        <button type="submit" className={`button-login ${!code ? 'disable' : ''}`} 
        disabled={!code}>Entrar</button>
      
        <a className='forgot-password' href="/">Voltar ao login</a>
        </div> 
        </form>
      </div>

    </div>
    </div>
  )
}export default CodeVerify;
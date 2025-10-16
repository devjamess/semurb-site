import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/images/semurb-logo-login.png'
import { useAuth } from '../hook/useAuth'
import Alert from '../components/modals/Alert'
import { BeatLoader } from "react-spinners";

function Login() {
  const route = useNavigate();
  const { signIn, logout } = useAuth();
  const [matricula_funcionario, setMatricula] = useState()
  const [senha, setSenha] = useState()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [loading, setLoad] = useState(false)
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoad(true)

    const userData = await signIn(matricula_funcionario, senha);
    if (userData.result) {
      route('/home', { replace: true });
    } else {
      setResponse(response)
      setErroMessage(userData.error)
      logout()
    }

    setLoad(false);
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
            <img src={logo} alt="semurb-logo" className="" />
            <p className="font-title-logo">Escala Semurb</p>
          </div>

          <form className="form-login" onSubmit={handleSignIn}>
            <div className="title-login">
              <p className="font-title">Administrador</p>
              <p className="font-subtitle">LOGIN</p>
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

                <button type="submit" className={`button-login ${!matricula_funcionario || !senha ? 'disable' : ''}`}
                  disabled={!matricula_funcionario || !senha}>
                  {loading ? ( <BeatLoader size={15} color='#F4D03F' /> ) : ('Entrar') }
                </button>
               
              <a className='forgot-password' href="/forgot-password">Esqueceu a senha?</a>
              <a className='forgot-password' href="/login/admin">Admin</a>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login;
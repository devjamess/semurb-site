import { useState } from 'react';
import { useAuth } from '../../hook/useAuth'
import Alert from './Alert';

export default function AddTeam({isOpen, setIsOpen}) {

  const { addTeam } = useAuth()

  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')

  const [nome_equipe, setEquipe] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const team = await addTeam(nome_equipe)

    if (team.result) {
      setResponse('Sucesso')
      setErroMessage(team.sucess)
    } else {
      setResponse('Erro')
      setErroMessage(team.error)
    }
  }
  if (isOpen) return (
    <div className="form-container">
      {erroMessage && (
        <Alert
          response={response}
          text="ao Cadastrar Equipe"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            setIsOpen(!isOpen)
          }}
        />
      )}
    <div className="form-card-position admin-card">
      <form onSubmit={handleSubmit} className="forms admin-form">
        <p className="form-title">Adicionar Equipe</p>
        <div className="form-card admin-setor">
          <input name="equipe" type="text" className="form-input" placeholder="Nome do Equipe"
            value={nome_equipe} onChange={(e) => setEquipe(e.target.value)} />
        </div>
        <div className="buttons-form">
          <button type="submit" className="confirm-button"
            disabled={!nome_equipe}
          >
            Concluir
          </button>
          <button className="cancel-button" onClick={() => setIsOpen(!isOpen)}>Cancelar</button>
        </div>
      </form>
    </div>
    </div>

  );
}
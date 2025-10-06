import { useState } from 'react';
import { useAuth } from '../hook/useAuth'
import Alert from './modals/Alert';

export default function AddSector({isOpenModal, setIsOpenModal}) {

  const { addSector } = useAuth()

  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')

  const [setor, setSetor] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const sector = await addSector(setor)

    if (sector.result) {
      setResponse('Sucesso')
      setErroMessage(sector.sucess)
    } else {
      setResponse('Erro')
      setErroMessage(sector.error)
    }
  }
  if (isOpenModal) return (
    <div className="form-container">
      {erroMessage && (
        <Alert
          response={response}
          text="ao Cadastrar Setor"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
          }}
        />
      )}
    <div className="form-card-position admin-card">
      <form onSubmit={handleSubmit} className="forms admin-form">
        <p className="form-title">Adicionar Setor</p>
        <div className="form-card admin-setor">
          <input name="setor" type="text" className="form-input" placeholder="Nome do Setor"
            value={setor} onChange={(e) => setSetor(e.target.value)} />
        </div>
        <div className="buttons-form">
          <button type="submit" className="confirm-button"
            disabled={!setor}
          >
            Continuar
          </button>
          <button className="cancel-button" onClick={() => setIsOpenModal(!isOpenModal)}>Cancelar</button>
        </div>
      </form>
    </div>
    </div>

  );
}
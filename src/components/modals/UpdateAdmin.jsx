import { useAuth } from '../../hook/useAuth'
import { useState} from 'react'
import Alert from './Alert'


function UpdateAdmin({ isOpen, setIsOpen, employee }) {
  const { updateEmployee, allSectors } = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState()

  const [form, setForm] = useState({
    matricula_funcionario: employee.matricula_funcionario,
    email: '',
    telefone: '',
    cargo: '',
    setor: '',
    status_permissao: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleAddEmployee(e) {
    e.preventDefault()
    const EditEmployee = await updateEmployee(form.matricula_funcionario, form)

    if (EditEmployee.result) {
      setResponse('Sucesso')
      setErroMessage(EditEmployee.sucess)
      setSave(EditEmployee.result)
    } else {
      setResponse('Erro')
      setErroMessage(EditEmployee.error)
    }
  }

 if(isOpen) return (
    <div>
      {erroMessage && (
        <Alert
          response={response}
          text="ao Cadastrar Funcionario"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            if (response === 'Sucesso' && save) {
              goNextPage(save)
            }
          }}
        />
      )}

      <div className="form-card-position">
        <form onSubmit={handleAddEmployee} className="forms">
          <p className="form-title">Atualizar Funcionario</p>
          <div className="form-card ">

            <input name='matricula_funcionario' type="number" className="form-input" placeholder="Matricula"
              value={form.matricula_funcionario} />

            <input name='email' type="text" className="form-input" placeholder="Email"
              value={form.email} onChange={handleChange} />

            <input name='telefone' type="tel" className="form-input" placeholder="Telefone"
              value={form.telefone} onChange={handleChange} />

            <input name='cargo' type="text" className="form-input" placeholder="Cargo"
              value={form.cargo} onChange={handleChange} />

            <input name="setor" id="setor-input" list="setores-list" className="form-input"
              placeholder="Setor" value={form.setor} onChange={handleChange} />
            <datalist id="setores-list">
              {allSectors.result?.setores?.map((sector, key) => (
                <option key={key} value={sector.nome_setor} />
              ))}
            </datalist>

          </div>

          <div className="buttons-form">
            <button type="submit" 
              className={`confirm-button ${Object.values(form).some(values => values === '') ? 'disable' : ''}`}
              disabled={Object.values(form).some(values => values === '')}>
              Continuar
            </button>
            <button type="button" className="cancel-button" onClick={() => setIsOpen(!isOpen)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default UpdateAdmin
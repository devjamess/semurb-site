import { useAuth } from '../../hook/useAuth'
import { useState, useEffect} from 'react'
import Alert from './Alert'


function UpdateAdmin({ isOpen, setIsOpen, employee }) {
  const { updateAdmin, allSectors, teams, regions, user, findTeams } = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')


  const [form, setForm] = useState({ })
 
  const sector = allSectors?.result?.setores?.find(sector => (
  employee.id_setor == sector.id_setor))?.nome_setor
  const team = teams?.result?.find(team => 
  employee.id_equipe == team.id_equipe)?.nome_equipe
  const region = regions?.result?.find(region => 
  employee.id_regiao == region.id_regiao)?.nome_regiao
  const sectorUser = user?.funcionario?.id_setor === employee?.id_setor ? user?.setor?.nome_setor : null

  useEffect(()=>{
    if(isOpen && employee)
    setForm({
    email: employee.email,
    telefone: employee.telefone,
    cargo: employee.cargo,
    setor: sector || sectorUser,
    status_permissao: employee.status_permissao,
    equipe: team,
    regiao: region,
    })

  },[isOpen, employee])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleAddEmployee(e) {
    e.preventDefault()

    console.log("dadoas enviados", form)

    const EditEmployee = await updateAdmin(employee.matricula_funcionario, form)

    console.log("Resposta do backend", EditEmployee)
    
  if (EditEmployee.sucess) {
      setResponse('Sucesso')
      setErroMessage(EditEmployee.sucess)
    } else {
      setResponse('Erro')
      setErroMessage(EditEmployee.error)
    }
  }

 if(isOpen) return (
    <div className='form-container'>
      {erroMessage && (
        <Alert
          response={response}
          text="ao Cadastrar Funcionario"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            setIsOpen(!isOpen)
            window.location.reload()
          }}
        />
      )}

      <div className="form-card-position">
        <form onSubmit={handleAddEmployee} className="forms">
          <p className="form-title">Atualizar Funcionario</p>
          <div className="form-card ">

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

            <input name="status_permissao" type="text" className="form-input" placeholder="Administrador (Sim/Não)"
              value={form.status_permissao} onChange={handleChange} id='permissao-input' list="permissao-list" />
            <datalist id="permissao-list">
              <option value="Sim" className=""></option>
              <option value="Não" className=""></option>
            </datalist>

            <select name='equipe'className="form-input" value={form.equipe} onChange={handleChange}>
                <option value="">Selecione uma equipe</option>
                {teams?.result?.map((eq) => (
                  <option key={eq.id_equipe} value={eq.nome_equipe}> {eq.nome_equipe}</option>
                ))}
            </select>

            <input name="regiao" id="regiao-input" list="regioes-list" className="form-input"
              placeholder="Regiao" value={form.regiao} onChange={handleChange} />
            <datalist id="regioes-list">
              {regions?.result?.map((region, key) => (
                <option key={key} value={region.nome_regiao} />
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
import '../../styles/AddEmployee.css'
import { useAuth } from '../../hook/useAuth'
import { useState, useEffect } from 'react'
import Alert from './Alert'

function AddEmployeeCard({ isOpenEmployee, setIsOpenEmployee, setPage, employee }) {
  const [currentPage, setCurrentPage] = useState(setPage || 1)
  const [createdEmployee, setCreatedEmployee] = useState(employee || null) // guarda funcionário criado

  const goNextPage = (employee) => {
    if (employee) setCreatedEmployee(employee)
    setCurrentPage((prev) => prev + 1) // avança de forma progressiva
  }

  const pages = [
    <Page1
      key="page1"
      isOpenEmployee={isOpenEmployee}
      setIsOpenEmployee={setIsOpenEmployee}
      goNextPage={goNextPage}
    />,
    <Page2
      key="page2"
      employee={createdEmployee}
      setIsOpenEmployee={setIsOpenEmployee}
      goNextPage={goNextPage}
    />,
    <Page3
      key="page3"
      employee={createdEmployee}
      setIsOpenEmployee={setIsOpenEmployee}
    />
  ]

  return isOpenEmployee && (
    <div className="form-container">
      {pages[currentPage - 1]}
    </div>
  )
}

function Page1({ isOpenEmployee, setIsOpenEmployee, goNextPage }) {
  const { addEmployee, teams, regions, findTeams, findRegions, user } = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState()

  const [form, setForm] = useState({
    matricula_funcionario: '',
    nome: '',
    telefone: '',
    email: '',
    cargo: '',
    nome_equipe: '',
    nome_regiao: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  useEffect(() => {
    if (isOpenEmployee) {
      findTeams();
      findRegions();
    }
  }, [isOpenEmployee])

  async function handleAddEmployee(e) {
    e.preventDefault()
    const employee = await addEmployee(user, form)

    if (employee.result) {
      setResponse('Sucesso')
      setErroMessage(employee.sucess)
      setSave(employee.result)
    } else {
      setResponse('Erro')
      setErroMessage(employee.error)
    }
  }
  const isDisable = Object.values(form).some(values => values === '')
  return (
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
          <p className="form-title">Adicionar Funcionario</p>
          <div className="form-card ">

            <input name='matricula_funcionario' type="number" className="form-input" placeholder="Matricula"
              value={form.matricula_funcionario} onChange={handleChange} />

            <input name='nome' type="text" className="form-input" placeholder="Nome Completo"
              value={form.nome} onChange={handleChange} />

            <input name='telefone' type="tel" className="form-input" placeholder="Telefone"
              value={form.telefone} onChange={handleChange} />

            <input name='email' type="email" className="form-input" placeholder="Email"
              value={form.email} onChange={handleChange} />

            <input name='cargo' type="text" className="form-input" placeholder="Cargo"
              value={form.cargo} onChange={handleChange} />

            <select name='nome_equipe' id="equipe-input" list="equipes-list" className="form-input"
              placeholder="Equipe" value={form.nome_equipe} onChange={handleChange}>
                <option value="">Selecione uma equipe</option>
                {teams?.result?.map((eq) => (
                  <option key={eq.id_equipe} value={eq.nome_equipe}> {eq.nome_equipe}</option>
                ))}
            </select>
            
            <input name='nome_regiao' id="regiao-input" list="regioes-list" className="form-input"
              placeholder="Regiao" value={form.nome_regiao} onChange={handleChange} />
            <datalist id="regioes-list">
              {regions?.result?.map((eq) => (
                <option key={eq.id_regiao} value={eq.nome_regiao} />
              ))}
            </datalist>
          </div>

          <div className="buttons-form">
            <button type="submit" className={`confirm-button ${isDisable ? 'disable' : ''}`}
              disabled={isDisable}>
              Continuar
            </button>
            <button type="button" className="cancel-button" onClick={() => setIsOpenEmployee(false)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Page2({ employee, setIsOpenEmployee, goNextPage }) {
  const { addScale, scales, user } = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState()

  const [form, setForm] = useState({
    matricula_funcionario: employee.matricula_funcionario,
    data_inicio: '',
    tipo_escala: '',
    usa_dias_especificos: 'NAO',
    dias_n_trabalhados_escala_semanal: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDiasChange = (dia) => {
    setForm(prev => {
      const dias = prev.dias_n_trabalhados_escala_semanal
      const updatedDias = dias.includes(dia) ? dias.filter(d => d !== dia) : [...dias, dia]
      return { ...prev, dias_n_trabalhados_escala_semanal: updatedDias }
    })
  }

  async function handleAddScale(e) {
    e.preventDefault()
    const scale = await addScale(user, form)
    if (scale.result) {
      setResponse('Sucesso')
      setErroMessage(scale.sucess)
      setSave(scale)
    } else {
      setResponse('Erro')
      setErroMessage(scale.error)
    }
  }

  const camposObrigatorios = ['matricula_funcionario', 'data_inicio', 'tipo_escala']
  const camposPreenchidos = camposObrigatorios.every(key => form[key] !== '')
  const isDisabled = !camposPreenchidos || (form.usa_dias_especificos === 'SIM' && form.dias_n_trabalhados_escala_semanal.length === 0)

  return (
    <div>
      {erroMessage && (
        <Alert
          response={response}
          text="ao Cadastrar Escala"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            if (response === 'Sucesso' && save) goNextPage(save)
          }}
        />
      )}

      <div className="form-card-position">
        <form onSubmit={handleAddScale} className="forms">
          <p className="form-title">Cadastrar Escala</p>
          <div className="form-card">
            <input name='matricula_funcionario' type="number" className="form-input" placeholder="Matricula"
              value={form.matricula_funcionario} onChange={handleChange} />
            <input name='data_inicio' type="date" className="form-input" value={form.data_inicio} onChange={handleChange} />
            <input name='tipo_escala' id="escala-input" list="escalas-list" className="form-input"
              placeholder="Escala" value={form.tipo_escala} onChange={handleChange} />
            <datalist id="escalas-list">
              {scales?.result?.map(s =>
                <option key={s.id_escala} value={s.tipo_escala} />)}
            </datalist>

            <label>Usar dias específicos de folga:</label>
            <select name="usa_dias_especificos" value={form.usa_dias_especificos} onChange={handleChange}>
              <option value="SIM">SIM</option>
              <option value="NAO">NAO</option>
            </select>

            {form.usa_dias_especificos === 'SIM' && (
              <div className="dias-semana-checkboxes">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(dia => (
                  <label key={dia}>
                    <input type="checkbox"
                      checked={form.dias_n_trabalhados_escala_semanal.includes(dia)}
                      onChange={() => handleDiasChange(dia)}
                    />
                    {dia}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="buttons-form">
            <button type="submit" className={`confirm-button ${isDisabled ? 'disable' : ''}`} disabled={isDisabled}>Concluir</button>
            <button type="button" className="cancel-button" onClick={() => setIsOpenEmployee(false)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Page3({ employee, setIsOpenEmployee }) {
  const { addTurn, user } = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState()

  const [form, setForm] = useState({
    matricula_funcionario: employee.matricula_funcionario,
    inicio_turno: '',
    termino_turno: '',
    duracao_turno: '',
    intervalo_turno: ''
  })
  const handleChange = (e) => {
    const {name, value} = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  async function handleAddTurn(e) {
    e.preventDefault()
    const turn = await addTurn(user, form)
    if (turn.result) {
      setResponse('Sucesso')
      setErroMessage(turn.sucess)
      setSave(turn)
    } else {
      setResponse('Erro')
      setErroMessage(turn.error)
    }
  }

  const isDisable = Object.values(form).some(values => values === '')
  return (
    <div>
      {erroMessage && (
        <Alert
          response={response}
          text="ao Cadastrar Turno"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            if (response === 'Sucesso' && save) {
              setIsOpenEmployee(false)
            }
          }}
        />
      )}

      <div className="form-card-position">
        <form onSubmit={handleAddTurn} className="forms">
          <p className="form-title">Cadastrar Turno</p>
          <div className="form-card">

            <label className="form-label">Matricula</label>
            <input name='matricula_funcionario' type="number" className="form-input" placeholder="Matricula"
              value={form.matricula_funcionario} onChange={handleChange} />

            <label className="form-label">Inicio do Turno</label>
            <input name='inicio_turno' type="time" className="form-input"
              value={form.inicio_turno} onChange={handleChange} />

            <label name='termino_turno' className="form-label">Termino do Turno</label>
            <input type="time" className="form-input"
              value={form.termino_turno} onChange={handleChange} />

            <label name='duracao_turno' className="form-label">Duração do Turno</label>
            <input type="time" className="form-input"
              value={form.duracao_turno} onChange={handleChange} />

            <label name='intervalo_turno' className="form-label">Intervalo do Turno</label>
            <input type="time" className="form-input"
              value={form.intervalo_turno} onChange={handleChange} />
          </div>

          <div className="buttons-form">
            <button type="submit" className={`confirm button ${isDisable ? 'disable' : ''} `}
              disabled={isDisable}>
              Concluir
            </button>
            <button type="button" className="cancel-button" onClick={() => setIsOpenEmployee(false)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEmployeeCard

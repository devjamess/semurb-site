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

            <input name='nome_equipe' id="equipe-input" list="equipes-list" className="form-input"
              placeholder="Equipe" value={form.nome_equipe} onChange={handleChange} />
            <datalist id="equipes-list">
              {teams?.result?.result?.map((eq) => (
                <option key={eq.id_equipe} value={eq.nome_equipe} />
              ))}
            </datalist>

            <input name='nome_regiao' id="regiao-input" list="regioes-list" className="form-input"
              placeholder="Regiao" value={form.nome_regiao} onChange={handleChange} />
            <datalist id="regioes-list">
              {regions?.result?.map((eq) => (
                <option key={eq.id_regiao} value={eq.nome_regiao} />
              ))}
            </datalist>
          </div>

          <div className="buttons-form">
            <button type="submit" className={`confirm-button ${Object.values(form).some(values => values === '') ? 'disable' : ''}`}
              disabled={Object.values(form).some(values => values === '')}>
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
    usa_dias_especificos: false,
    dias_n_trabalhados_escala_semanal: [],
  })
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'usa_dias_especificos') {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleDiasChange = (dia) => {
    setForm((prev) => {
      const dias = prev.dias_n_trabalhados_escala_semanal;
      const updatedDias = dias.includes(dia)
        ? dias.filter(d => d !== dia)
        : [...dias, dia];
      return { ...prev, dias_n_trabalhados_escala_semanal: updatedDias };
    });
  };
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

const isDisabled = !camposPreenchidos || 
  (form.usa_dias_especificos && form.dias_n_trabalhados_escala_semanal.length === 0)


  return (
    <div>
      {erroMessage && (
        <Alert
          response={response}
          text="ao Cadastrar Escala"
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
        <form onSubmit={handleAddScale} className="forms">
          <p className="form-title">Cadastrar Escala</p>
          <div className="form-card">
            <input name='matricula_funcionario' type="number" className="form-input" placeholder="Matricula"
              value={form.matricula_funcionario} onChange={handleChange} />

            <input name='data_inicio' type="date" className="form-input"
              value={form.data_inicio} onChange={handleChange} />

            <input name='tipo_escala'
              id="escala-input"
              list="escalas-list"
              className="form-input"
              placeholder="Escala"
              value={form.tipo_escala}
              onChange={handleChange}
            />
            <datalist id="escalas-list">
              {scales?.map(scalel => (
                <option key={scalel.id_escala} value={scalel.tipo_escala} />
              ))}
            </datalist>

            <label>
              <input
                type="checkbox"
                name="usa_dias_especificos"
                checked={form.usa_dias_especificos}
                onChange={handleChange}
              />
              Usar dias específicos de folga
            </label>

            {form.usa_dias_especificos && (
              <div className="dias-semana-checkboxes">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(dia => (
                  <label key={dia}>
                    <input
                      type="checkbox"
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
            <button type="submit" className={`confirm-button 
            ${isDisabled ? 'disabel' : ''}`}
              disabled={isDisabled}>
              Concluir
            </button>
            <button type="button" className="cancel-button" onClick={() => setIsOpenEmployee(false)}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Page3({ employee, setIsOpenEmployee }) {
  const { addTurn } = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState()

  const [matricula_funcionario, setMatriculaFuncionario] = useState(employee?.matricula_funcionario)
  const [inicio_turno, setInicioTurno] = useState("")
  const [termino_turno, setTerminoTurno] = useState("")
  const [duracao_turno, setDuracaoTurno] = useState("")
  const [intervalo_turno, setIntervaloTurno] = useState("")

  async function handleAddTurn(e) {
    e.preventDefault()
    const turn = await addTurn(
      matricula_funcionario,
      inicio_turno, termino_turno,
      duracao_turno, intervalo_turno
    )
    if (turn.result) {
      setResponse('Sucesso')
      setErroMessage(turn.sucess)
      setSave(turn)
    } else {
      setResponse('Erro')
      setErroMessage(turn.error)
    }
  }

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

            <label className="form-label">Matricula do Funcionário</label>
            <input type="number" className="form-input" placeholder="Matricula"
              value={matricula_funcionario} onChange={(e) => setMatriculaFuncionario(e.target.value)} />

            <label className="form-label">Inicio do Turno</label>
            <input type="time" className="form-input"
              value={inicio_turno} onChange={(e) => setInicioTurno(e.target.value)} />

            <label className="form-label">Termino do Turno</label>
            <input type="time" className="form-input"
              value={termino_turno} onChange={(e) => setTerminoTurno(e.target.value)} />

            <label className="form-label">Duração do Turno</label>
            <input type="time" className="form-input"
              value={duracao_turno} onChange={(e) => setDuracaoTurno(e.target.value)} />

            <label className="form-label">Intervalo do Turno</label>
            <input type="time" className="form-input"
              value={intervalo_turno} onChange={(e) => setIntervaloTurno(e.target.value)} />
          </div>

          <div className="buttons-form">
            <button type="submit" className="confirm-button"
              disabled={
                !matricula_funcionario || !inicio_turno ||
                !termino_turno || !duracao_turno || !intervalo_turno
              }>
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

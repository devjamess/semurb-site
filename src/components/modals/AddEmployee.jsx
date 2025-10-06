import '../../styles/AddEmployee.css'
import { useAuth } from '../../hook/useAuth'
import { useState, useEffect } from 'react'
import Alert from './Alert'

function AddEmployeeCard({ isOpenEmployee, setIsOpenEmployee }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [createdEmployee, setCreatedEmployee] = useState(null) // guarda funcionário criado

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
  const { addEmployee, teams, regions, findTeams, findRegions } = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState()

  const [nome, setNome] = useState("")
  const [matricula_funcionario, setMatricula] = useState("")
  const [senha, setSenha] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
  const [cargo, setCargo] = useState("")
  const [nome_equipe, setEquipe] = useState("")
  const [nome_regiao, setRegiao] = useState("")

  useEffect(() => {
    if (isOpenEmployee) {
      findTeams()
      findRegions()
    }
  }, [isOpenEmployee])

  async function handleAddEmployee(e) {
    e.preventDefault()
    const employee = await addEmployee(
      nome, matricula_funcionario, telefone,
      email, cargo, nome_regiao, nome_equipe, senha
    )

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
            <input type="text" className="form-input" placeholder="Nome Completo"
              value={nome} onChange={(e) => setNome(e.target.value)} />

            <input type="number" className="form-input" placeholder="Matricula"
              value={matricula_funcionario} onChange={(e) => setMatricula(e.target.value)} />

            <input type="tel" className="form-input" placeholder="Telefone"
              value={telefone} onChange={(e) => setTelefone(e.target.value)} />

            <input type="email" className="form-input" placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type="text" className="form-input" placeholder="Cargo"
              value={cargo} onChange={(e) => setCargo(e.target.value)} />

            <input type="password" className="form-input" placeholder="Senha"
              value={senha} onChange={(e) => setSenha(e.target.value)} />

            <input id="equipe-input" list="equipes-list" className="form-input"
              placeholder="Equipe" value={nome_equipe} onChange={(e) => setEquipe(e.target.value)} />
            <datalist id="equipes-list">
              {teams.map((eq) => (
                <option key={eq.id_equipe} value={eq.nome_equipe} />
              ))}
            </datalist>

            <input id="regiao-input" list="regioes-list" className="form-input"
              placeholder="Regiao" value={nome_regiao} onChange={(e) => setRegiao(e.target.value)} />
            <datalist id="regioes-list">
              {regions.map((eq) => (
                <option key={eq.id_regiao} value={eq.nome_regiao} />
              ))}
            </datalist>
          </div>

          <div className="buttons-form">
            <button type="submit" className="confirm-button"
              disabled={
                !nome || !matricula_funcionario || !telefone || !email ||
                !cargo || !senha || !nome_equipe || !nome_regiao
              }>
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
  const { addScale, scales } = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState()

  const [matricula_funcionario, setMatriculaFuncionario] = useState(employee?.matricula_funcionario || "")
  const [data_inicio, setDataInicio] = useState("")
  const [tipo_escala, setTipoEscala] = useState("")
  const [dias_trabalhados, setDiasTrabalhados] = useState("")
  const [dias_n_trabalhados, setDiasNTrabalhados] = useState("")

  async function handleAddScale(e) {
    e.preventDefault()
    const scale = await addScale(
      matricula_funcionario, data_inicio, dias_trabalhados,
      dias_n_trabalhados, tipo_escala
    )
    if (scale.result) {
      setResponse('Sucesso')
      setErroMessage(scale.sucess)
      setSave(scale)
    } else {
      setResponse('Erro')
      setErroMessage(scale.error)
    }
  }

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
            <input type="number" className="form-input" placeholder="Matricula"
              value={matricula_funcionario} onChange={(e) => setMatriculaFuncionario(e.target.value)} />

            <input type="date" className="form-input"
              value={data_inicio} onChange={(e) => setDataInicio(e.target.value)} />

            <input type="number" className="form-input" placeholder="Dias trabalhados"
              value={dias_trabalhados} onChange={(e) => setDiasTrabalhados(e.target.value)} />

            <input type="number" className="form-input" placeholder="Dias de folga"
              value={dias_n_trabalhados} onChange={(e) => setDiasNTrabalhados(e.target.value)} />

            <input
              id="escala-input"
              list="escalas-list"
              className="form-input"
              placeholder="Escala"
              value={tipo_escala}
              onChange={(e) => setTipoEscala(e.target.value)}

            />
            <datalist id="escalas-list">
              {scales.map(scalel => (
                <option key={scalel.escala.id_escala} value={scalel.escala.tipo_escala} />
              ))}
            </datalist>
          </div>

          <div className="buttons-form">
            <button type="submit" className="confirm-button"
              disabled={
                !matricula_funcionario || !data_inicio ||
                !dias_trabalhados || !dias_n_trabalhados || !tipo_escala
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

function Page3({ employee, setIsOpenEmployee }) {
  const { addTurn } = useAuth()
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')
  const [save, setSave] = useState()

  const [matricula_funcionario, setMatriculaFuncionario] = useState(employee?.matricula_funcionario || "")
  const [inicio_turno, setInicioTurno] = useState("")
  const [termino_turno, setTerminoTurno] = useState("")
  const [duracao_turno, setDuracaoTurno] = useState("")
  const [intervalo_turno, setIntervaloTurno] = useState("")

  async function handleAddTurn(e) {
    e.preventDefault()
    const turn = await addTurn(
      matricula_funcionario, inicio_turno, termino_turno, duracao_turno, intervalo_turno
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

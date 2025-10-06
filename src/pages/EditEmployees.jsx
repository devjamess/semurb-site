import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from '../hook/useAuth'
import { IoIosContact } from 'react-icons/io'
import { useState } from 'react'
import CalendarProfile from '../components/CalendarProfile'
import UpdateScale from '../components/modals/UpdateScale'
import AddEmployeeCard from '../components/modals/AddEmployee'
import Alert from '../components/modals/Alert'

function EditEmployee() {

  const { allEmployees, allSectors, teams, regions, turns, scales, deleteEmployee } = useAuth()
  const { id } = useParams()
  const route = useNavigate()

  const [isOpenEmployeeUpdate, setIsOpenEmployeeUpdate] = useState(false)
  const [isOpenEmployeeAdd, setIsOpenEmployeeAdd] = useState(false)
  const [page, setPage] = useState(2)

  const [erroMessage, setErroMessage] = useState('')
  const [response, setResponse] = useState('Erro')

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };

  if (!allEmployees || !allEmployees.result) {
    return <p className='loading-text'>Carregando funcionário...</p>;
  }

  const currentEmployee = allEmployees.result.find(
    employee => String(employee.matricula_funcionario) === id
  );


  const sector = allSectors.result?.setores?.find(sector => (
    currentEmployee?.id_setor == sector.id_setor))?.nome_setor
  const team = teams?.result?.find(team => (
    currentEmployee?.id_equipe == team.id_equipe
  ))?.nome_equipe
  const region = regions?.result?.find(region => (
    currentEmployee?.id_regiao == region.id_regiao
  ))?.nome_regiao
  const scale = scales?.result?.find(scale => (
    currentEmployee?.id_escala == scale.id_escala
  ))?.tipo_escala
  const turn = turns?.find(turn => (
    currentEmployee?.id_turno == turn.id_turno
  ))?.duracao_turno

  async function handleDelete() {
    const del = await deleteEmployee(currentEmployee?.matricula_funcionario)
    if (del?.sucess) {
      setResponse('Não')
      setErroMessage('Funcionario foi deletado')
    } else {
      setResponse('Não')
      setErroMessage('Erro ao Buscar Funcionario')
    }
  }
  if (!currentEmployee) {
    return <div className="form-container">
      {<Alert
        response={response}
        text="foi possivel encontrar o funcionário"
        error={erroMessage}
        onClose={() => {
          setErroMessage("")
          route(-1)
        }}
      />}
    </div>
  }
  return (
    <div className="body">

      <UpdateScale
        employee={currentEmployee?.matricula_funcionario}
        setIsOpenEmployee={setIsOpenEmployeeUpdate}
        isOpenEmployee={isOpenEmployeeUpdate}
      />
      <AddEmployeeCard
        isOpenEmployee={isOpenEmployeeAdd}
        setIsOpenEmployee={setIsOpenEmployeeAdd}
        setPage={page}
        employee={currentEmployee}
      />
      <div className="container-profile-page">
        <div key={currentEmployee?.matricula_funcionario} className="profile-container">
          <div className="profile-card-up">
            <IoIosContact size={200} color={'#6B7280'} />

            <h2 className="profile-name">{currentEmployee?.nome}</h2>
          </div>
          <div className="profile-card-down">
            <p className="profile-info">Matrícula: <span className="info-auth">{currentEmployee?.matricula_funcionario}</span> </p>
            <p className="profile-info">Telefone: <span className="info-auth">{currentEmployee?.telefone}</span></p>
            <p className="profile-info">Email: <span className="info-auth">{currentEmployee?.email}</span></p>
            <p className="profile-info">Cargo: <span className="info-auth">{currentEmployee?.cargo}</span></p>
            <p className="profile-info">Equipe: <span className="info-auth">{team}</span></p>
            <p className="profile-info">Região: <span className="info-auth">{region}</span></p>
            <p className="profile-info">Setor: <span className="info-auth">{sector}</span></p>
            <p className="profile-info">Escala: <span className="info-auth">{scale}</span></p>
            <p className="profile-info">Turno: <span className="info-auth">{turn}</span></p>
          </div>
          <button className="confirm-button">Editar</button>
          <button className="cancel-button" onClick={handleDelete}>Deletar</button>
        </div>

        <div className="profile-escale">
          <CalendarProfile
            value={selectedDate}
            onDateChange={handleDateSelect}
            escala={scales?.result?.find(scale => (scale.id_escala == currentEmployee?.id_escala))?.escala}
          />
          <div className="profile-escale-details">
            <div className="details">Folgas</div>
            <div className="details">Feriados</div>
            <div className="details">Trabalho</div>
          </div>
          <button className="confirm-button"
            onClick={() => {
              if (currentEmployee?.id_escala) {
                setIsOpenEmployeeUpdate(!isOpenEmployeeUpdate)
              } else {
                setPage(-1)
                setIsOpenEmployeeAdd(!isOpenEmployeeAdd)
              }
            }}>
            {currentEmployee?.id_escala ? 'Atualizar Escala' : 'Nova Escala'}
          </button>

        </div>
      </div>
    </div>
  )
}
export default EditEmployee
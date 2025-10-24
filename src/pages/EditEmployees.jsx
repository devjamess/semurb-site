import { useParams } from "react-router-dom"
import { useAuth } from '../hook/useAuth'
import { IoIosContact } from 'react-icons/io'
import { useState } from 'react'
import CalendarProfile from '../components/CalendarProfile'
import UpdateScale from '../components/modals/UpdateScale'
import AddEmployeeCard from '../components/modals/AddEmployee'
import UpdateAdmin from '../components/modals/UpdateAdmin'
import Confirmation from '../components/modals/ConfirmDelEmployee'

function EditEmployee() {

  const { allEmployees, allSectors, teams, regions, turns, scales } = useAuth()
  const { id } = useParams()


  const [isOpenEmployeeUpdate, setIsOpenEmployeeUpdate] = useState(false)
  const [isOpenEmployeeAdd, setIsOpenEmployeeAdd] = useState(false)
  const [isOpenAdminUpdate, setIsOpenAdminUpdate] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [page, setPage] = useState(2)

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };

  if (!allEmployees || !allEmployees.result) {
    return <p className='loading-text'>Carregando funcionário...</p>;
  }

  const currentEmployee = allEmployees?.result?.find(
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
  const turn = turns?.result?.find(turn => (
    currentEmployee?.id_turno == turn.id_turno
  ))
  

  
  if (!currentEmployee) 
  return <p className="loading-text">Não foi possível encontrar o funcionário</p>;
  

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
      <UpdateAdmin 
      isOpen={isOpenAdminUpdate}
      setIsOpen={setIsOpenAdminUpdate}
      employee={currentEmployee}
      />
      <Confirmation 
      isOpen={isOpenDelete}
      setIsOpen={setIsOpenDelete}
      currentEmployee={currentEmployee}
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
          </div>
          <button className="confirm-button" onClick={() => setIsOpenAdminUpdate(!isOpenAdminUpdate)}>Atualizar Dados</button>
          <button className="cancel-button" onClick={() => setIsOpenDelete(!isOpenDelete)}>Deletar Funcionario</button>
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
            <div className="details">{`Horario: ${turn?.inicio_turno} - ${turn?.termino_turno} / Intervalo: ${turn?.intervalo_turno}`}</div>
          </div>
          <div className="update-buttons">
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
          <button className="confirm-button">Atualizar Turno</button>
          </div>

        </div>
      </div>
    </div>
  )
}
export default EditEmployee
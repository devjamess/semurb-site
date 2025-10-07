import { useParams } from "react-router-dom"
import { useAuth } from '../hook/useAuth'
import { IoIosContact } from 'react-icons/io'
import CalendarProfile from '../components/CalendarProfile'
import { useState } from 'react'
import UpdateScale from "../components/modals/UpdateScale"
import AddEmployeeCard from '../components/modals/AddEmployee'

function Employee() {

  const { employees, user, teams, scales, regions } = useAuth()
  const { id } = useParams()
  
  const CurrentEmployee = employees?.result?.find(employee => String(employee.matricula_funcionario) === id)

  const [isOpenEmployeeUpdate, setIsOpenEmployeeUpdate] = useState(false)
  const [isOpenEmployeeAdd, setIsOpenEmployeeAdd] = useState(false)
  const [page, setPage] = useState(1)
  
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };

  return (
    <div className="body">
      <UpdateScale
        employee={CurrentEmployee?.matricula_funcionario}
        setIsOpenEmployee={setIsOpenEmployeeUpdate}
        isOpenEmployee={isOpenEmployeeUpdate}
      />
      <AddEmployeeCard 
        isOpenEmployee={isOpenEmployeeAdd}
        setIsOpenEmployee={setIsOpenEmployeeAdd}
        setPage={page}
        employee={CurrentEmployee}
      />


      <div className="container-profile-page">
        
          <div key={CurrentEmployee?.matricula_funcionario} className="profile-container">
            <div className="profile-card-up">
              <IoIosContact size={200} color={'#6B7280'} />



              <h2 className="profile-name">{CurrentEmployee?.nome}</h2>
            </div>
            <div className="profile-card-down">
              <p className="profile-info">Matricula: <span className="info-auth">{CurrentEmployee?.matricula_funcionario}</span> </p>
              <p className="profile-info">Telefone: <span className="info-auth">{CurrentEmployee?.telefone}</span></p>
              <p className="profile-info">Email: <span className="info-auth">{CurrentEmployee?.email}</span></p>
              <p className="profile-info">Escala: <span className="info-auth">{scales?.result?.id_escala == CurrentEmployee?.id_escala ? scales?.result?.tipo_escala : 'Desconhecido'}</span></p>
              <p className="profile-info">Equipe: <span className="info-auth">{teams?.result?.find(team => (team.id_equipe == CurrentEmployee?.id_equipe))?.nome_equipe}</span></p>
              <p className="profile-info">Regiao: <span className="info-auth">{regions?.result?.find(region => (region.id_regiao == CurrentEmployee?.id_regiao))?.nome_regiao}</span></p>
              <p className="profile-info">Setor: <span className="info-auth">{user?.setor?.nome_setor}</span></p>
            </div>
            <button className="confirm-button">Atualizar</button>
          </div>
 
        <div className="profile-escale">
          <CalendarProfile
            value={selectedDate}
            onDateChange={handleDateSelect}
            escala={scales?.result?.id_escala == CurrentEmployee?.id_escala ? scales?.result?.tipo_escala : 'Desconhecido'}
          />
          <div className="profile-escale-details">
            <div className="details">Folgas</div>
            <div className="details">Feriados</div>
            <div className="details">Trabalho</div>
          </div>
          <button className="confirm-button" onClick={() => {
            if(CurrentEmployee?.id_escala){
            setIsOpenEmployeeUpdate(!isOpenEmployeeUpdate)
          }
          if(!CurrentEmployee?.id_escala){
            setIsOpenEmployeeAdd(!isOpenEmployeeAdd)
            setPage(2)
          }
          }}>{CurrentEmployee?.id_escala ?  'Atualizar Escala' : 'Nova Escala'}
          </button>

        </div>

      </div>
    </div>
  )
}
export default Employee
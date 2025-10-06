import { useParams } from "react-router-dom"
import { useAuth } from '../hook/useAuth'
import { IoIosContact } from 'react-icons/io'
import CalendarProfile from '../components/CalendarProfile'
import { useState } from 'react'
import UpdateScale from "../components/modals/UpdateScale"

function Employee() {

    const { employees, user, teams, scales, regions } = useAuth()
    const { id } = useParams()
    employees?.result?.find(employee => String(employee.matricula_funcionario) === id)
    const CurrentEmployee = employees?.result?.find(employee => String(employee.matricula_funcionario) === id)

    const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState(false)
   
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
    };

    return (
        <div className="body">
            <UpdateScale
            employee={CurrentEmployee?.matricula_funcionario}
            setIsOpenEmployee={()=> setIsOpenEmployeeModal(!isOpenEmployeeModal)}
            isOpenEmployee={isOpenEmployeeModal}
            />

            <div className="container-profile-page">
                {employees?.result?.filter(employee => employee.matricula_funcionario == id).map((employee) => (
                    <div key={employee.matricula_funcionario }className="profile-container">
                        <div className="profile-card-up">
                            <IoIosContact size={200} color={'#6B7280'} />



                            <h2 className="profile-name">{employee.nome}</h2>
                        </div>
                        <div className="profile-card-down">
                            <p className="profile-info">Matricula: <span className="info-auth">{employee?.matricula_funcionario}</span> </p>
                            <p className="profile-info">Telefone: <span className="info-auth">{employee?.telefone}</span></p>
                            <p className="profile-info">Email: <span className="info-auth">{employee?.email}</span></p>
                            <p className="profile-info">Escala: <span className="info-auth">{scales?.resut?.find(scale => (scale.escala.id_escala == employee.id_escala))?.escala.tipo_escala}</span></p>
                            <p className="profile-info">Equipe: <span className="info-auth">{teams?.find(team => (team.id_equipe == employee.id_equipe))?.nome_equipe}</span></p>
                            <p className="profile-info">Regiao: <span className="info-auth">{regions?.find(region => (region.id_regiao == employee.id_regiao))?.nome_regiao}</span></p>
                            <p className="profile-info">Setor: <span className="info-auth">{user?.setor?.nome_setor}</span></p>
                        </div>
                        <button className="confirm-button">Atualizar</button>
                    </div>
                ))}

                <div className="profile-escale">
                    <CalendarProfile
                        value={selectedDate}
                        onDateChange={handleDateSelect}
                        escala={scales?.result?.find(scale => (scale.id_escala == CurrentEmployee?.id_escala))?.escala} 
                    />
                    <div className="profile-escale-details">
                        <div className="details">Folgas</div>
                        <div className="details">Feriados</div>
                        <div className="details">Trabalho</div>
                    </div>
                    <button className="confirm-button" onClick={()=>setIsOpenEmployeeModal(!isOpenEmployeeModal)}>Nova Escala</button>

                </div>

            </div>
        </div>
    )
}
export default Employee
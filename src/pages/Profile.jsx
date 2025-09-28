import { IoIosContact } from "react-icons/io";
import CalendarProfile from '../components/CalendarProfile'
import {useState} from 'react'
import { useAuth } from '../hook/useAuth'
import '../styles/Profile.css'

function Profile() {
    const { user } = useAuth()
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };
    
    return (
        <div className="body">

            <div className="container">

                <div className="profile-container">
                    <div className="profile-card-up">
                        <IoIosContact size={200} color={'#6B7280'} />
                        <h2 className="profile-name">{user?.funcionario.nome}</h2>
                    </div>
                    <div className="profile-card-down">
                        <p className="profile-info">Matricula: <span className="info-auth">{user?.funcionario.matricula_funcionario}</span> </p>
                        <p className="profile-info">Telefone: <span className="info-auth">{user?.funcionario.telefone}</span></p>
                        <p className="profile-info">Email: <span className="info-auth">{user ? user.funcionario.email : 'Desconhecido'}</span></p>
                        <p className="profile-info">Escala: <span className="info-auth">{user ? user.escala.tipo_escala : 'Desconhecido'}</span></p>
                        <p className="profile-info">Equipe: <span className="info-auth">{user.equipe ? user.equipe.nome_equipe : 'Desconhecido'}</span></p>
                        <p className="profile-info">Regiao: <span className="info-auth">{user.regiao ? user.regiao.nome_regiao : 'Desconhecido'}</span></p>
                        <p className="profile-info">Setor: <span className="info-auth">{user ? user.setor.nome_setor : 'Desconhecido'}</span></p>

                    </div>
                    <button className="confirm-button">Atualizar</button>
                </div>

                <div className="profile-escale">
                    <CalendarProfile

                        value={selectedDate}
                        onDateChange={handleDateSelect}
                        escala={user?.escala} // vem do backend junto do funcionário
                    />

                    <div className="profile-escale-details">
                        <div className="details">Folgas</div>
                        <div className="details">Feriados</div>
                        <div className="details">Trabalho</div>
                    </div>
                    <button className="confirm-button">Nova Escala</button>

                </div>

            </div>
        </div>
    )
}
export default Profile
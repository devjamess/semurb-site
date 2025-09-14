import { IoIosContact } from "react-icons/io";
import CalendarHome from '../components/Calendar'
import Header from '../components/Header'
import {useAuth} from '../hook/useAuth'
import '../styles/Profile.css'

function Profile(){
    const {user} = useAuth()
    return(
        <div className="body">
            <Header />
            <div className="container">
            <div className="profile-container">
                <div className="profile-card-up">
                <IoIosContact size={200} color={'#6B7280'} />
                <p className="profile-name"><strong >{user?.nome}</strong></p>
                </div>
                <div className="profile-card-down">
                <p className="profile-info">Matricula: <span className="info-auth">{user?.matricula_funcionario}</span> </p>
                <p className="profile-info">Telefone: <span className="info-auth">{user?.telefone}</span></p>
                <p className="profile-info">Email: <span className="info-auth">{user?.email}</span></p>
                <p className="profile-info">Escala: <span className="info-auth">{user?.id_escala}</span></p>
                <p className="profile-info">Equipe: <span className="info-auth">{user?.equipe}</span></p>
                </div>
                <button className="confirm-button">Atualizar</button>
            </div>

            <div className="profile-escale">
                <CalendarHome />
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
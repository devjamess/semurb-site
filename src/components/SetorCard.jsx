import '../styles/SetorCard.css'
import {useAuth} from '../hook/useAuth';
import {useNavigate} from 'react-router-dom'

export default function SetorCard(){

    const { user, teams } = useAuth();
    const route = useNavigate();
    

    return(
      <div className='container-setor'>
          <div className='title-setor'>
          <h2>Setor: {user? user.setor.nome_setor: 'Desconhecido'}</h2> <hr />

          </div>

          <div className='container-teams'>
            {teams.map((tm) => (
            <div className='team' key={tm.id_equipe} onClick={() => route(`/teams/${tm.id_equipe}`)} >
              <h3>{tm.nome_equipe}</h3>
            </div>
            ))}
            
           
          </div>
        </div>
    )
}
import '../styles/SectorCard.css'
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom'

export default function SectorCard() {

  const { admin, user, teams, allSectors } = useAuth();
  const route = useNavigate();


  if (user) return (
    <div className='container-setor'>
      <div className='setor'>
        <p className='title-setor'>
          Setor: {user ? user.setor.nome_setor : 'Desconhecido'}</p>
      </div>

      <div className='container-teams'>
        {teams?.map((tm) => (
          <div className='team' key={tm.id_equipe} onClick={() => route(`/teams/${tm.id_equipe}`)} >
            <p>{tm.nome_equipe}</p>
          </div>
        ))}


      </div>
    </div>
  );

  if (admin)
    return (
      <div className='container-setor'>
        <div className='setor'>
          <p className='title-setor'>
            Setores:</p>
        </div>

        <div className='container-teams'>
          {allSectors?.result?.setores?.map((sector) => (
            <div className='team' key={sector.id_setor} 
            onClick={() => route(`/sectors/${sector.id_setor}`)} >
              <p>{sector.nome_setor}</p>
            </div>
          ))}


        </div>
      </div>
    );
}
import { useParams } from "react-router-dom"
import { useAuth } from '../hook/useAuth'
import { IoIosContact } from 'react-icons/io'



function EditEmployee() {

  const { allEmployees, allSectors, teams, regions, turns, scales} = useAuth()
  const { id } = useParams()

  allEmployees?.result?.find(employee => String(employee.matricula_funcionario) === id)
  
  if (!allEmployees || !allEmployees.result) {
  return <p className='loading-text'>Carregando funcionário...</p>;
}

const currentEmployee = allEmployees.result.find(
  employee => String(employee.matricula_funcionario) === id
);

  const sector = allSectors.result?.setores?.find(sector => (
    currentEmployee?.id_setor == sector.id_setor))?.nome_setor
  const team = teams?.find(team => (
    currentEmployee?.id_equipe == team.id_equipe
  ))?.nome_equipe
  const region = regions?.find(region => (
    currentEmployee?.id_regiao == region.id_regiao
  ))?.nome_regiao
  const scale = scales?.result?.find(scale => (
    currentEmployee?.id_escala == scale.id_escala
  ))?.tipo_escala
  const turn = turns?.find(turn => (
    currentEmployee?.id_turno == turn.id_turno
  ))?.duracao_turno

if (!currentEmployee) {
  return <p className='loading-text'>Funcionário não encontrado.</p>;
}

  return (
    <div className="body">

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
            <button className="cancel-button">Deletar</button>
          </div>
      </div>
    </div>
  )
}
export default EditEmployee
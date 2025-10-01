import {useParams} from 'react-router-dom';
import {useAuth} from '../hook/useAuth'
function CurrentDay() {
    const {employees, teams, user, regions, scales} = useAuth()
    const { id } = useParams();
    console.log('ID da rota:', id);

  return (
    <div>
      <div className="table">
  <div className="table-header">
    <div>Matrícula</div>
    <div>Nome</div>
    <div>Email</div>
    <div>Telefone</div>
    <div>Setor</div>
    <div>Equipe</div>
    <div>Região</div>
    <div>Escala</div>
  </div>


     {employees.filter(employee => employee.id_equipe == id).map((employee) => (  
      <div className="table-row" key={employee.matricula_funcionario} onClick={() => route(`/employees/${employee.matricula_funcionario}`)}>
            <div className='matricula'>{employee.matricula_funcionario}</div>
            <div >{employee.nome}</div>
            <div >{employee.email}</div>
            <div >{employee.telefone}</div>
            <div >{user?.setor.nome_setor}</div>
            <div >{teams.find(team => (team.id_equipe == employee.id_equipe))?.nome_equipe}</div>
            <div >{regions.find(region =>(region.id_regiao == employee.id_regiao))?.nome_regiao}</div>
            <div >{scales.find(scale => (scale.escala.id_escala == employee.id_escala))?.escala.tipo_escala}</div>
      </div>
        ))}
  </div>

    </div>
  );
}
export default CurrentDay
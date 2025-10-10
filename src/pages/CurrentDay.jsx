import {useParams, useNavigate} from 'react-router-dom';
import {useAuth} from '../hook/useAuth'
import { useEffect, useState } from 'react';

function CurrentDay() {
    const {actives, user, teams, scales, regions} = useAuth()
    const route = useNavigate();
    const {date} = useParams();
    const [list, setList] = useState()  

    useEffect(()=>{
      const activesList = async() => {
        await actives(user, date)
      if(activesList.result){
        console.log(activesList.sucess)
        setList(activesList.result)
      } else {
        console.log(activesList.error)
        setList([])
      }
      }
    },[user, date])


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


     {list && list?.map((employee) => (  
      <div className="table-row" key={employee.matricula_funcionario} 
      onClick={() => route(`/employees/${employee.matricula_funcionario}`)}>
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
import {useAuth} from '../hook/useAuth'
import {useParams} from 'react-router-dom'
import {useState} from 'react'
import AddEmployeeCard from '../components/modals/AddEmployee'
import'../styles/EmployeeTable.css'
import '../styles/Teams.css'
function Teams() {
    
    const {teams, employees, user, regions, scales} = useAuth()
    const {id} = useParams()
    teams.find(tm => String(tm.id_equipe) === id)
    const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState(false)
    const [startPage, setStartPage] = useState(1); // New state to control starting page

    const handleOpenModal = (page) => {
        setStartPage(page);
        setIsOpenEmployeeModal(true);
    };

    return(
    <div className="body">
        <AddEmployeeCard 
            isOpenEmployee={isOpenEmployeeModal} 
            setIsOpenEmployee={() => setIsOpenEmployeeModal(false)}
            initialPage={startPage} // Pass the initial page
        />

      <div className="container-search-team">
        <button className='cancel-button' onClick={() => handleOpenModal(2)}> Atualizar Escala</button>
        <input type="search" placeholder='Buscar Funcionarios. . .' />
        <button className="confirm-button" onClick={() => handleOpenModal(1)}>Adicionar Funcionario</button>
      </div>

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
      <div className="table-row">
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
{/* 
        <div className="list">
        <table className='table'>
        
      <thead className='the'>
        <tr className='tr1'>
          <th className="th">Matricula</th>
          <th className="th">Nome</th>
          <th className="th">Email</th>
          <th className="th">Telefone</th>
          <th className="th">Setor</th>
          <th className="th">Equipe</th>
          <th className="th">Regiao</th>
          <th className="th">Escala</th>
        </tr>
      </thead>
      
        {employees.filter(employee => employee.id_equipe == id).map((employee) => (
            <div className='matricula'>{employee.matricula_funcionario}</div>
            <div >{employee.nome}</div>
            <div >{employee.email}</div>
            <div >{employee.telefone}</div>
            <div >{user?.setor.nome_setor}</div>
            <div >{teams.find(team => (team.id_equipe == employee.id_equipe))?.nome_equipe}</div>
            <div >{regions.find(region =>(region.id_regiao == employee.id_regiao))?.nome_regiao}</div>
            <div >{scales.find(scale => (scale.escala.id_escala == employee.id_escala))?.escala.tipo_escala}</div>
        ))}
      </tbody>
    </table>

        </div>*/}
      </div>
    )      

}
export default Teams
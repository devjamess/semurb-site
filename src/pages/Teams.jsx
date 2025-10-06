import {useAuth} from '../hook/useAuth'
import {useParams, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import AddEmployeeCard from '../components/modals/AddEmployee'
import'../styles/EmployeeTable.css'
import '../styles/Teams.css'

function Teams() {
    
    const route = useNavigate()
    
    const {teams, employees, user, regions, scales} = useAuth()
    const {id} = useParams()

    teams?.find(tm => String(tm.id_equipe) === id)
    
    const [search, setSearch] = useState('')
    const searchLowerCase = search.toLowerCase();
    const employeesList = !employees ? [] : employees?.result?.filter((employee) => 
    employee.nome.toLowerCase().includes(searchLowerCase))

    const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState(false)
 
    return(
    <div className="body">
        <AddEmployeeCard 
            isOpenEmployee={isOpenEmployeeModal} 
            setIsOpenEmployee={() => setIsOpenEmployeeModal(!isOpenEmployeeModal)}

        />

      <div className="container-search-team">
        <button className='alert-button'> Notificar Pendência</button>
        <input type="search" placeholder='Buscar Funcionarios. . .' value={search} onChange={(e)=> setSearch(e.target.value)} />
        <button className="confirm-button" onClick={() => setIsOpenEmployeeModal(!isOpenEmployeeModal)}>Adicionar </button>
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


     {employees === undefined ? <p className="loading-text">Loading...</p> : employeesList?.filter(employee => employee.id_equipe == id).map((employee) => (  
      <div className="table-row" key={employee.matricula_funcionario} onClick={() => route(`/employees/${employee.matricula_funcionario}`)}>
            <div className='matricula'>{employee.matricula_funcionario}</div>
            <div >{employee.nome}</div>
            <div >{employee.email}</div>
            <div >{employee.telefone}</div>
            <div >{user?.setor.nome_setor}</div>
            <div >{teams?.find(team => (team.id_equipe == employee.id_equipe))?.nome_equipe}</div>
            <div >{regions?.find(region =>(region.id_regiao == employee.id_regiao))?.nome_regiao}</div>
            <div >{scales?.result?.find(scale => (scale.id_escala == employee.id_escala))?.tipo_escala}</div>
      </div>
        ))}
  </div>

      </div>
    )      

}
export default Teams
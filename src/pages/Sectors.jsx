import {useAuth} from '../hook/useAuth'
import {useParams, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import'../styles/EmployeeTable.css'

function Sectors() {
    
    const route = useNavigate()
    
    const {allSectors, allEmployees} = useAuth()
    const {id} = useParams()
    console.log(allEmployees)

    allSectors.result?.setores?.find(sector => String(sector.id_setor) === id)
    
    const [search, setSearch] = useState('')
    const searchLowerCase = search.toLowerCase();
    const employeesList = !allEmployees ? [] : allEmployees?.result?.filter((employee) => 
    employee.nome.toLowerCase().includes(searchLowerCase))

    return(
    <div className="body">

      <div className="container-search-team">
        <input type="search" placeholder='Buscar Funcionarios. . .' value={search} 
        onChange={(e)=> setSearch(e.target.value)} />    
      </div>

<div className="table admin-table">
  <div className="table-header">
    <div>Matrícula</div>
    <div>Nome</div>
    <div>Email</div>
    <div>Telefone</div>
    <div>Setor</div>
  </div>


     {allEmployees === undefined ? <p className="loading-text">Loading...</p> 
     : employeesList?.filter(employee => employee.id_setor == id).map((employee) => (  
      <div className="table-row" key={employee.matricula_funcionario} 
      onClick={() => route(`/edit-employee/${employee.matricula_funcionario}`)}>
            <div className='matricula'>{employee.matricula_funcionario}</div>
            <div >{employee.nome}</div>
            <div >{employee.email}</div>
            <div >{employee.telefone}</div>
            <div >{allSectors.result?.setores?.find(sector => (
              sector.id_setor == employee.id_setor))?.nome_setor}</div>
      </div>
        ))}
  </div>

      </div>
    )      

}
export default Sectors
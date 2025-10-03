import SetorCard from '../components/SetorCard'
import MyChart from '../components/Graph'
import {useAuth} from '../hook/useAuth'
import '../styles/Admin.css'
import '../styles/EmployeeTable.css'
function Admin () {
    const {admin, allEmployees} = useAuth()
    console.log('ADMIN: ', admin)
    console.log('EMPLOYEES: ',allEmployees)
    return(
        <div className="body">
      
      <div className='adm-container-up'>
        
      <MyChart />


      <SetorCard />
        
      </div>

      <div className='adm-container-down'>
        <div className="table">
  <div className="table-header">
    <div>Matrícula</div>
    <div>Nome</div>
    <div>Email</div>
    <div>Telefone</div>    
    <div>Cargo</div>
    <div>Setor</div>
  </div>

     {Array.isArray(allEmployees) && allEmployees?.map(employee => (  
      <div className="table-row">
            <div className='matricula'>{employee.matricula_funcionario}</div>
            <div >{employee.nome}</div>
            <div >{employee.email}</div>
            <div >{employee.telefone}</div>
            <div >{employee.cargo}</div>
      </div>
        ))}
  </div>

      </div>
    </div>
    )
}

export default Admin;
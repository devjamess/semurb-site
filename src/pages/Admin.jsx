import SetorCard from '../components/SetorCard'
import MyChart from '../components/Graph'
import {useAuth} from '../hook/useAuth'
function Admin () {
    const {allEmployees, allSectors} = useAuth()
    console.log(allEmployees)
    return(
        <div className="body">
      
      <div className='container-up'>
        
      <MyChart />


      <SetorCard />
        
      </div>

      <div className='container-down'>
        <div className="table">
  <div className="table-header">
    <div>Matrícula</div>
    <div>Nome</div>
    <div>Email</div>
    <div>Telefone</div>    
    <div>Cargo</div>
    <div>Setor</div>
  </div>

     {allEmployees.map((employee) => (  
      <div className="table-row">
            <div className='matricula'>{employee.matricula_funcionario}</div>
            <div >{employee.nome}</div>
            <div >{employee.email}</div>
            <div >{employee.telefone}</div>
            <div >{employee.cargo}</div>
            <div >{allSectors.find(sector => (sector.id_setor == employee.id_setor))?.nome_setor}</div> 
                   
      </div>
        ))}
  </div>

      </div>
    </div>
    )
}

export default Admin;
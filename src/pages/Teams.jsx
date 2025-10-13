import {useAuth} from '../hook/useAuth'
import {useParams, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import AddEmployeeCard from '../components/modals/AddEmployee'
import { IoMdPersonAdd, IoIosNotifications } from "react-icons/io";
import'../styles/EmployeeTable.css'


function Teams() {
    
    const route = useNavigate()
    
    const {teams, employees, user, regions, scales} = useAuth()
    const {id} = useParams()

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

      <div className="container-search grid-3">
        <button className='alert-button'> 
          <IoIosNotifications size={25} /> Notificar Pendência</button>
        <input type="search" placeholder='Buscar funcionários...' value={search} onChange={(e)=> setSearch(e.target.value)} />
        <button className="confirm-button" onClick={() => setIsOpenEmployeeModal(!isOpenEmployeeModal)}>
          <IoMdPersonAdd  size={20}  />Adicionar </button>
      </div>

      <div className="type-table">
        <p className="type-title">Funcionarios da Equipe</p>
        <p className="type-subtitle">{teams?.result?.find(team => (team.id_equipe == id))?.nome_equipe}</p>
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

     {!employees ? <p className="loading-text">Carregando funcionários...</p> : 
     
     employeesList?.filter(employee => employee.id_equipe == id).map((employee) => (  
      <div className="table-row" key={employee.matricula_funcionario} 
      onClick={() => route(`/employees/${employee.matricula_funcionario}`)}>

            <div className='matricula'>{employee.matricula_funcionario}</div>
            <div >{employee.nome}</div>
            <div >{employee.email}</div>
            <div >{employee.telefone}</div>
            <div >{user?.setor?.id_setor == employee.id_setor ? user.setor?.nome_setor : ''}</div>
            <div >{teams?.result?.find(team => (team.id_equipe == employee.id_equipe))?.nome_equipe}</div>
            <div >{regions?.result?.find(region =>(region.id_regiao == employee.id_regiao))?.nome_regiao}</div>
            <div >{scales?.result?.find(scale => (scale.escala.id_escala ==  employee.id_escala))?.escala.tipo_escala }</div>
      </div>
        ))}
  </div>

      </div>
    )      

}
export default Teams
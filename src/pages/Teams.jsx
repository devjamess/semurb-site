import {useAuth} from '../hook/useAuth'
import {useParams} from 'react-router-dom'
import {useState} from 'react'
import AddEmployeeCard from '../components/modals/AddEmployee'

function Teams() {
    
    const {teams, employees} = useAuth()
    const {id} = useParams()
    const team = teams.find(tm => String(tm.id_equipe) === id)
    const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState(false)

    return(
    <div className="body">
        <AddEmployeeCard isOpenEmployee={isOpenEmployeeModal} setIsOpenEmployee={() => setIsOpenEmployeeModal(!isOpenEmployeeModal)}/>

        <div className="container-search">
        <input type="search" placeholder='Buscar Funcionarios. . .' />
        <button className="confirm-button" onClick={setIsOpenEmployeeModal}>Adicionar Funcionario</button>
      </div>

      <div className="list-card">
        <div className="header-card">
            <h2 className="">Equipe: { team?.nome_equipe }</h2>
        </div>

        <div className="list">
            <ul>
            {employees.map((em) =>(
                <li key={em.matricula_funcionario}>{em.nome}</li>
            ))}    
            </ul>
        </div>
      </div>
    </div>        
)
}
export default Teams
import {useAuth} from '../hook/useAuth'
import {useParams} from 'react-router-dom'
import {useState} from 'react'
import AddEmployeeCard from '../components/modals/AddEmployee'
import'../styles/EmployeeTable.css'

function Teams() {
    
    const {teams, employees, user, regions, scales} = useAuth()
    const {id} = useParams()
    const team = teams.find(tm => String(tm.id_equipe) === id)
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

        <div className="container-search">
        <button className='cancel-button' onClick={() => handleOpenModal(2)}> Atualizar Escala</button>
        <input type="search" placeholder='Buscar Funcionarios. . .' />
        <button className="confirm-button" onClick={() => handleOpenModal(1)}>Adicionar Funcionario</button>
      </div>


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
      <tbody className='tb'>
        {employees.filter(employee => employee.id_equipe == id).map((employee) => (
          <tr className='tr2' key={employee.matricula_funcionario}>
            <td className="td mf">{employee.matricula_funcionario}</td>
            <td className="td">{employee.nome}</td>
            <td className="td">{employee.email}</td>
            <td className="td">{employee.telefone}</td>
            <td className="td">{user?.setor.nome_setor}</td>
            <td className="td">{teams.find(team => (team.id_equipe == employee.id_equipe))?.nome_equipe}</td>
            <td className="td">{regions.find(region =>(region.id_regiao == employee.id_regiao))?.nome_regiao}</td>
            <td className="td">{scales.find(scale => (scale.id_escala == employee.id_escala))?.tipo_escala}</td>
          </tr>
        ))}
      </tbody>
    </table>

        </div>
      </div>
    )      

}
export default Teams
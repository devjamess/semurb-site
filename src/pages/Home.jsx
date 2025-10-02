import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../hook/useAuth'
import MyChart from '../components/Graph';
import CalendarHome from '../components/CalendarHome';
import AddEmployeeCard from '../components/modals/AddEmployee'
import SetorCard from '../components/SetorCard'
import '../styles/Home.css';
import '../styles/EmployeeList.css'

  function Home() { 
  const route = useNavigate()
  const {employees, teams} = useAuth()
  const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState(false)
    console.log(employees)
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };

   const [search, setSearch] = useState('')
    const searchLowerCase = search.toLowerCase();
    const employeesList = employees?.filter((employee) => 
    employee.nome.toLowerCase().includes(searchLowerCase))

  return (
    <div className='body'>
      <AddEmployeeCard isOpenEmployee={isOpenEmployeeModal} setIsOpenEmployee={() => setIsOpenEmployeeModal(!isOpenEmployeeModal)}/>
       
      
      <div className="container-search">
        <div className="search-list">
        <input type="search" placeholder='Buscar Funcionarios. . .' 
        value={search} onChange={(e) => setSearch(e.target.value)}/>
         {search? 
        <div className="list">
          {employeesList.map(employee => (
        <div className="list-content" key={employee.matricula_funcionario} 
        onClick={() => route(`/employees/${employee.matricula_funcionario}`)}>
          <p className="list-info">{employee.nome}</p>
          <p className="list-info-bottom">
            Equipe: {teams.find(team => (team.id_equipe == employee.id_equipe))?.nome_equipe}</p>
        </div>
      ) )}
        </div>
       : null
      }
        </div>
        <button className="confirm-button" onClick={setIsOpenEmployeeModal}>Adicionar Funcionario</button>
      </div>
      
     
      
      <div className='container-up'>
        
      <MyChart />


      <SetorCard />
        
      </div>

      <div className='container-down'>
          <CalendarHome 
            value={selectedDate}
            onDateChange={handleDateSelect}
          />
      </div>
    </div>
  )
}
export default Home;
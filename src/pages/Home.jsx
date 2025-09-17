import React, {useState} from 'react';
import Header from '../components/Header';
import MyChart from '../components/Graph';
import CalendarHome from '../components/Calendar';
import AddEmployeeCard from '../components/modals/AddEmployee'
import SetorCard from '../components/SetorCard'
import '../styles/Home.css';

  function Home() {
   const [selectedDate, setSelectedDate] = useState(null);
   const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState(false)
   
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };
  return (
    <div className='body'>
      <AddEmployeeCard isOpenEmployee={isOpenEmployeeModal} setIsOpenEmployee={() => setIsOpenEmployeeModal(!isOpenEmployeeModal)}/>
       

      <div className="container-search">
        <input type="search" placeholder='Buscar Funcionarios. . .' />
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
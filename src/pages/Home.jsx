import React, {useState} from 'react';
import Header from '../components/Header';
import MyChart from '../components/Graph';
import CalendarHome from '../components/Calendar';
import AddEmployeeCard from '../components/modals/AddEmployee'
import '../styles/Home.css';
import {useAuth} from '../hook/useAuth';

  function Home() {
   const [selectedDate, setSelectedDate] = useState(null);
   const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState(false)
   const { user } = useAuth();
   console.log(user)
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };
  return (
    <div className='body'>
      <AddEmployeeCard isOpenEmployee={isOpenEmployeeModal} setIsOpenEmployee={() => setIsOpenEmployeeModal(!isOpenEmployeeModal)}/>
      <Header /> 

      <div className="container-search">
        <input type="search" placeholder='Buscar Funcionarios. . .' />
        <button className="confirm-button" onClick={setIsOpenEmployeeModal}>Adicionar Funcionario</button>

      </div>
      <div className='container-up'>
        <div className='container-graph'>
          <MyChart />
        </div>

        <div className='container-setor'>
          <div className='title-setor'>
          <h2>Setor: {user? user.setor.nome_setor: 'Desconhecido'}</h2> <hr />

          </div>
          <div className='container-teams'>
            <div className='team'>
              <h3>Alpha</h3>
            </div>
            <div className='team'>
              <h3>Beta</h3>
            </div>
            <div className='team'>
              <h3>Charles</h3>
            </div>
            <div className='team'>
              <h3>Delta</h3>
            </div>
          </div>
        </div>
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
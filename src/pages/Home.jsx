import React, {useState} from 'react';
import Header from '../components/Header';
import MyChart from '../components/Graph';
import CalendarHome from '../components/Calendar';
import '../styles/Home.css';
function Home() {
   const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };
  return (
    <div className='body'>
      <Header />
      <div className='container-up'>
        <div className='container-graph'>
          <MyChart />
        </div>

        <div className='container-setor'>
          <div className='title-setor'>
          <h2>Setor: ADMINISTRAÇÃO</h2> <hr />
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
        <div className='container-calendar'>
          <CalendarHome 
            value={selectedDate}
            onDateChange={handleDateSelect}
          />
        </div>
      </div>
    </div>
  )
}
export default Home;
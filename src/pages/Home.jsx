import React from 'react';
import Header from '../components/Header';
import MyChart from '../components/Graph';
import '../styles/Home.css';
function Home() {
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
    </div>
  )
}
export default Home;
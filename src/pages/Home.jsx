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
          <h2>Setor: ADMINISTRAÇÃO</h2> <hr />
          <div className='setor-cards'>
            <div className='setor-card'>
              <h3>Setor 1</h3>
              <p>Descrição do setor 1</p>
            </div>
            <div className='setor-card'>
              <h3>Setor 2</h3>
              <p>Descrição do setor 2</p>
            </div>
            <div className='setor-card'>
              <h3>Setor 3</h3>
              <p>Descrição do setor 3</p>
            </div>
            <div className='setor-card'>
              <h3>Setor 4</h3>
              <p>Descrição do setor 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home;
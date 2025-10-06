import SectorCard from '../components/SectorCard'
import MyChart from '../components/Graph'
import { useAuth } from '../hook/useAuth'
import AddAdmin from '../components/AddAdmin'
import { useState } from 'react'
import '../styles/Admin.css'
import AddSector from '../components/AddSector'
import { useNavigate } from 'react-router-dom'

function Admin() {

  const { allEmployees, allSectors } = useAuth()
  const route = useNavigate()
  const [isOpenModalAdmin, setIsOpenModalAdmin] = useState(false)
  const [isOpenModalSector, setIsOpenModalSector] = useState(false)

  const [search, setSearch] = useState('')
  const searchLowerCase = search.toLowerCase();
 

   if (!allEmployees || !allEmployees.result || !allEmployees.sucess)
  return <p className='loading-text'>Carregando funcionários...</p>;
  

  const allEmployeesList = allEmployees?.result?.filter((employee) =>
  employee.nome.toLowerCase().includes(searchLowerCase))

  if(!allEmployeesList) return <p className="loading-text">Não foi possivel encontrar os funcionários</p>;
  
  return (
    <div className="body" >
      <AddAdmin isOpenModal={isOpenModalAdmin} setIsOpenModal={setIsOpenModalAdmin} />
      <AddSector isOpenModal={isOpenModalSector} setIsOpenModal={setIsOpenModalSector} />

      <div className="adm-container-search">
        <div className="adm-search-list">
          <input type="search" placeholder='Buscar Funcionarios. . .'
            value={search} onChange={(e) => setSearch(e.target.value)} />
          {search ?
            <div className="adm-list">
              {allEmployeesList?.map((employee, key) => (
                <div className="adm-list-content" key={key}
                  onClick={() => route(`/edit-employee/${employee.matricula_funcionario}`)}>
                  <p className="adm-list-info">{employee.nome}</p>
                  <p className="adm-list-info-bottom">
                    Equipe: {allSectors.result?.setores?.find(sector => (
                      sector.id_setor == employee.id_setor))?.nome_setor}</p>
                </div>
              ))}
            </div>
            : null
          }
        </div>
        <button className="confirm-button"
          onClick={() => setIsOpenModalAdmin(!isOpenModalAdmin)}>
          Adicionar Funcionario
        </button>
        <button className="confirm-button"
          onClick={() => setIsOpenModalSector(!isOpenModalSector)}>
          Adicionar Setor
        </button>
      </div>

      <div className='adm-container-up'>
        <MyChart />
        <SectorCard />
      </div>

      <div className='adm-container-down'>
        <div className="adm-table">
          <div className="adm-table-header">
            <div>Matrícula</div>
            <div>Nome</div>
            <div>Email</div>
            <div>Telefone</div>
          </div>

          <div className="adm-table-body">
            {allEmployees.result?.map((employee, key) => (
              <div className="adm-table-row" key={key}>
                <div className='adm-matricula'>{employee.matricula_funcionario}</div>
                <div>{employee.nome}</div>
                <div>{employee.email}</div>
                <div>{employee.telefone}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="adm-actions">
        </div>


      </div>
    </div>
  )
}

export default Admin;
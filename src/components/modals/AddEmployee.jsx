import '../../styles/AddEmployee.css'
import {useAuth} from '../../hook/useAuth'
import { useState } from 'react';

function AddEmployeeCard({isOpenEmployee, setIsOpenEmployee}) {

    const [currentPage, setCurrentPage] = useState(1)

    const pages = [
        <Page1 isOpenEmployee={isOpenEmployee} setIsOpenEmployee={setIsOpenEmployee} />,
        <Page2 />
    ];

    return isOpenEmployee && (
        <div className='form-container'>
            {pages[currentPage - 1]}
            <button onClick={() => {
                setCurrentPage((prev) => prev < pages.length ? prev + 1 : prev)
            }} style={{ zIndex: 999999999, position: "absolute", top: "50%", left: "50%"}}>Proximo</button>
        </div>
    )
}



function Page1({isOpenEmployee, setIsOpenEmployee}) {
    const equipes = ['aplha', 'bravo', 'charles', 'delta' ]
    const regioes = ['norte', 'sul']

    const {addEmployee, user} = useAuth();
    async function handleAddEmployee(e){
        e.preventDefault();

        const employee = await addEmployee({
            ...form, 
            matricula_funcionario: +form.matricula_funcionario})
        console.log(employee)
    }
       const [nome, setNome] = useState()
       const [matricula_funcionario, setMatricula] = useState()
       const [senha, setSenha] = useState()
       const [telefone, setTelefone] = useState()
       const [email, setEmail] = useState()
       const [cargo, setCargo] = useState()
       const [equipe, setEquipe] = useState()
       const [regiao, setRegiao] = useState()


    return (
    <div className=''>
        <div action="" className="form-card-position">
        <form onSubmit={handleAddEmployee} className="forms">            
            <p className="form-title">Adicionar Funcionario</p>
            <div className="form-card">
            <input type="text"  className="form-input" placeholder='Nome Completo' 
             value={nome} onChange={(e) => setNome(e.target.value) }))}/>
            <input type="number" className="form-input" placeholder='Matricula'
             value={matricula_funcionario} onChange={(e) => setMatricula(e.target.value) }))}/>
            <input type="tel" className="form-input" placeholder='Telefone'
             value={telefone} onChange={() => setNomealue }))}/>
            <input type="email" className="form-input" placeholder='Email'
             value={email} onChange={() => setNomee }))}/> 
            <input type="text" className="form-input" placeholder='Cargo'
            value={cargo} onChange={() => setNomee }))}/>
            <input type='password' className="form-input" 
            value={senha} onChange={() => setNomee }))}/>
            
            <select className="form-input"
            value={equipe} onChange={() => setNomeue }))}>
                <option value="" className="">Selecione a equipe</option>
                {equipes.map((equipe, i) => (
                    <option value={equipe} key={i}>{equipe}</option>
                ))}
            </select>
            <select  className="form-input"
            value={regiao} onChange={() => setNomeue }))}>
                <option value="" className="">Selecione a regiao</option>
                {regioes.map((regiao, i)=>
                    <option value={regiao} key={i} >{regiao}</option> )}
            </select>
            
            </div>
            <button type='submit' className='confirm-button' >Continuar</button>
            <button className='cancel-button' onClick={setIsOpenEmployee}>Fechar</button>
        </form>
        </div>
    </div>
   
  );
 } 

function Page2 () {
    return (
        <h2 style={{ backgroundColor: "rgb(255, 0, 255)"}}>Page 2</h2>
    )
}

export default AddEmployeeCard
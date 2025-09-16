import '../../styles/AddEmployee.css'
import {useAuth} from '../../hook/useAuth'
import { useState } from 'react';

function AddEmployeeCard({isOpenEmployee, setIsOpenEmployee}) {

  
    const [currentPage, setCurrentPage] = useState(1);
    const [form, setForm] = useState({
        nome: '',
        matricula_funcionario ,
        telefone: '',
        email: '',
        cargo: '',
        regiao: '',
        equipe: ''


    })
 

    const pages = [
        <Page1 setForm ={setForm} form={form} isOpenEmployee={isOpenEmployee} setIsOpenEmployee={setIsOpenEmployee} />,
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

    
 return null
}

function Page1({isOpenEmployee, setIsOpenEmployee, form, setForm}) {
    const equipes = ['aplha', 'bravo', 'charles', 'delta' ]
    const regioes = ['norte', 'sul']

    const {addEmployee, user} = useAuth();
    async function handleAddEmployee(e){
        e.preventDefault();

        const employee = await addEmployee(form)
        console.log(employee)
    }
    
    return (
    <div className=''>
        <div action="" className="form-card-position">
        <form onSubmit={handleAddEmployee} className="forms">            
            <p className="form-title">Adicionar Funcionario</p>
            <div className="form-card">
            <input type="text"  className="form-input" placeholder='Nome Completo' 
             value={form.nome} onChange={(ev) => setForm(values => ({...values, nome: ev.target.value }))}/>
            <input type="number" className="form-input" placeholder='Matricula'
             value={form.matricula_funcionario} onChange={(ev) => setForm(values => ({...values, matricula_funcionario: ev.target.value }))}/>
            <input type="tel" className="form-input" placeholder='Telefone'
             value={form.telefone} onChange={(ev) => setForm(values => ({...values, telefone: ev.target.value }))}/>
            <input type="email" className="form-input" placeholder='Email'
             value={form.email} onChange={(ev) => setForm(values => ({...values, email: ev.target.value }))}/> 
            <input type="text" className="form-input" placeholder='Cargo'
            value={form.cargo} onChange={(ev) => setForm(values => ({...values, cargo: ev.target.value }))}/>
            <select className="form-input"
            value={form.equipe} onChange={(ev) => setForm(values => ({...values, equipe: ev.target.value }))}>
                <option value="" className="">Selecione a equipe</option>
                {equipes.map((equipe, i) => (
                    <option value={equipe} key={i}>{equipe}</option>
                ))}
            </select>
            <select  className="form-input"
            value={form.regiao} onChange={(ev) => setForm(values => ({...values, regiao: ev.target.value }))}>
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
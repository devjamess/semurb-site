import '../../styles/AddEmployee.css'

function AddEmployeeCard({isOpenEmployee, setIsOpenEmployee}) {

if(isOpenEmployee){
    
    return (
    <div className="form-container">
        <div action="" className="form-card-position">
        <form action="method" className="forms">            
            <p className="form-title">Adicionar Funcionario</p>
            <div className="form-card">
            <input type="text" className="form-input" placeholder='Nome Completo' />
            <input type="number" className="form-input" placeholder='Matricula'/>
            <input type="tel" className="form-input" placeholder='Telefone'/>
            <input type="email" className="form-input" placeholder='Email'/>
            <select name="" id="" className="form-input">
                <option value="" className="">Selecione a escala</option>
            </select>
            <select name="" id="" className="form-input">
                <option value="" className="">Selecione a equipe</option>
            </select>
            <select name="" id="" className="form-input">
                <option value="" className="">Selecione a regiao</option>
            </select>
            <select name="" id="" className="form-input">
                <option value="" className="">Selecione a setor</option>
            </select>           
            
            <input type="password" className="form-input" placeholder='Senha' value={'123456789'}/>
            </div>
            <button type='submit' className='confirm-button' onClick={setIsOpenEmployee}>Fechar</button>
        </form>
        </div>
    </div>
   
  );
 } 
 return null
}

export default AddEmployeeCard
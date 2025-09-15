import '../../styles/AddEmployee.css'
import {useNavigate} from 'react-router-dom'
function AddEmployeeCard({isOpenEmployee, setIsOpenEmployee}) {
    const route = useNavigate();
if(isOpenEmployee){
    return (
    <div className="form-container">
        <form action="" className="form-card">
            <p className="form-title">Adicionar Funcionario</p>
            <input type="text" className="form-input" />
            <input type="text" className="form-input" />
            <input type="text" className="form-input" />
            <input type="text" className="form-input" />
            <button onClick={setIsOpenEmployee}>Fechar</button>
        </form>
    </div>
   
  );
 } 
 return null
}

export default AddEmployeeCard
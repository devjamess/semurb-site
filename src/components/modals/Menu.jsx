import '../../styles/Menu.css'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import AddEmployeeCard from './AddEmployee';
function MenuHeader({isOpen, setIsOpen}) {
    const route = useNavigate();
    const [isOpenEmployeeModal, setIsOpenEmployeeModal] = useState(false)
if(isOpen){
    return (
    <div className="container">
        <div className="options"> 
            <button className="option" onClick={() => route('/profile')}>Perfil</button>
            <button className="option">Configurações</button>
            <button className="option">Sair</button>
            <button className="option" onClick={setIsOpenEmployeeModal}>Adicionar Funcionario</button>
            <button className="option" onClick={setIsOpen}>Fechar Menu</button>
        </div>
        <AddEmployeeCard isOpenEmployee={isOpenEmployeeModal} setIsOpenEmployee={() => setIsOpenEmployeeModal(!isOpenEmployeeModal)}/>

    </div>
   
  );
 } 
 return null
}

export default MenuHeader
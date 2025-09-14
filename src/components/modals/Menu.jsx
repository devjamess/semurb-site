import '../../styles/Menu.css'
import {useNavigate} from 'react-router-dom'
function MenuHeader({isOpen, setIsOpen}) {
    const route = useNavigate();
if(isOpen){
    return (
    <div className="container">
        <div className="options"> 
            <button className="option" onClick={() => route('/profile')}>Perfil</button>
            <button className="option">Configurações</button>
            <button className="option">Sair</button>
            <button className="option" onClick={setIsOpen}>Fechar Menu</button>
        </div>
    </div>
   
  );
 } 
 return null
}

export default MenuHeader
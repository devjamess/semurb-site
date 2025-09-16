import '../../styles/Menu.css'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../hook/useAuth'
function MenuHeader({isOpen, setIsOpen }) {
    const logout = useAuth();
    const route = useNavigate();
    
if(isOpen){
    return (
    <div className="menu-container">
        <div className="options"> 
            <button className="option" onClick={() => route('/profile')}>Perfil</button>
            <button className="option" onClick={()=> route('/config')}>Configurações</button>
            <button className="option" onClick={logout}>Sair</button>
            <button className="option" onClick={setIsOpen}>Fechar Menu</button>
        </div>
        
    </div>
   
  );
 } 
 return null
} 

export default MenuHeader
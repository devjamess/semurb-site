import '../../styles/Menu.css'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../hook/useAuth'
function MenuHeader({isOpen, setIsOpen }) {
    const {logout, user, admin} = useAuth();
    const route = useNavigate();
    async function handleLogout(){
        logout()
    }

if(user && isOpen)
    return (
    <div className="menu-container">
        <div className="options"> 
            <button className="option" onClick={() => route('/profile')}>Perfil</button>
            <button className="option" onClick={()=> route('/config')}>Configurações</button>
            <button className="option" onClick={handleLogout}>Sair</button>
            <button className="option" onClick={setIsOpen}>Fechar Menu</button>
        </div>
        
    </div>
   
  );

if(admin && isOpen)
    return(
    <div className="menu-container">
            <div className="options"> 
                <button className="option" onClick={handleLogout}>Sair</button>
                <button className="option" onClick={setIsOpen}>Fechar Menu</button>
            </div>
        
    </div>
    );
 
} 

export default MenuHeader
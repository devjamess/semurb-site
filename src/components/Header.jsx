import { IoMdArrowBack, IoIosHome, IoIosNotifications, IoMdMenu } from "react-icons/io";
import './Header.css'
function Header() {
  return (
    <header>
        <div className='header-part-left'> 
            <IoMdArrowBack size={30} color="yellow"/>  
            <IoIosHome size={30} color="yellow"/>
            <h3 className='painel'>PAINEL PRINCIPAL</h3>  
        </div>

        <div className='header-part-right'>
                <img alt='SEMURB' src='../assets/images/semurb-logo-header.png'></img>
                <IoIosNotifications size={30} color="yellow"/>
                <IoMdMenu size={30} color="yellow"/>
        </div>
    </header>
  )
}
export default Header;

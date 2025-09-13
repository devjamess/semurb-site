import { IoMdArrowBack, IoIosHome, IoIosNotifications, IoMdMenu } from "react-icons/io";
import '../styles/Header.css'
import logo from '../assets/images/semurb-logo-header.png'
function Header() {
  return (
    <header>
        <div className='header-part-left'> 
            <IoMdArrowBack size={30} color='#F4D03F'/>  
            <IoIosHome size={30} color='#F4D03F'/>
            <p className='painel'>Secretaria Da Mobilidade Urbana</p>  
        </div>

        <div className='header-part-right'>
                <img alt='SEMURB' src={logo}></img>
                <IoIosNotifications size={30} color="#F4D03F"/>
                <IoMdMenu size={30} color="#F4D03F"/>
        </div>
    </header>
  )
}
export default Header;

import { IoMdArrowBack, IoIosHome, IoIosNotifications, IoMdMenu } from "react-icons/io";
import '../styles/Header.css'
import {useState} from 'react'
import logo from '../assets/images/semurb-logo-header.png'
import MenuHeader from './modals/Menu';
function Header() {
    const [isOpenModal, setIsOpenModal] = useState(false)
  return (
    <header className='header'>
        <div className='header-part-left'> 
            <IoMdArrowBack size={30} color='#F4D03F'/>  
            <IoIosHome size={30} color='#F4D03F'/>
            <p className='painel'>Secretaria Da Mobilidade Urbana</p>  
        </div>

        <div className='header-part-right'>
                <img className='img' alt='SEMURB' src={logo}></img>
                <IoIosNotifications size={30} color="#F4D03F"/>
                <button className='menu' onClick={setIsOpenModal} >
                    <IoMdMenu size={30} color="#F4D03F" />
                </button>
                 
        </div>
         <MenuHeader isOpen={isOpenModal} setIsOpen={() => setIsOpenModal(!isOpenModal)}/>
        </header>
    )
}
export default Header;

import {useState, useffect} from 'react'
import {useAuth} from '../../hook/useAuth'
import Alert from './Alert'

export default function UpdateTurn({isOpen, setIsOpen, employee}){

  const {user, updateTurn, turns} = useAuth()

  const [form, setForm] = useState({})
  useEffect(()=>{
    if(employee && isOpen){
      setForm({
        data_inicio: employee.id_turno === turns.turno
      })
    }
  },[])
  const handleSubmit = async(e) => {
    e.preventDefault()

    
  }
}
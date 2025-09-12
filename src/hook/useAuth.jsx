import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

export const useAuth =() => {
    const {user, signIn} = useContext(AuthContext);

    return{
        user,
        signIn
    }
}
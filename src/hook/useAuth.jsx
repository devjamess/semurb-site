import {useContext} from 'react'
import AuthContext from '../context/authContextImport'

export const useAuth =() => {
    const {user, signIn} = useContext(AuthContext);

    return{
        user,
        signIn
    }
}
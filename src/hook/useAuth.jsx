import {useContext} from 'react'
import AuthContext from '../context/authContextImport'

export const useAuth =() => {
    const {user, inUser, signIn, logout} = useContext(AuthContext);

    return{
        user,
        signIn,
        logout,
        inUser
    }
}
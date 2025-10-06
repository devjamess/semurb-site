import {useContext} from 'react'
import AuthContext from '../context/authContextImport'

export const useAuth =() => {
    const {
        user, inUser, signIn, logout, addEmployee, addScale,
        findTeams, teams, findRegions, regions, findEmployees, employees, 
        findScales, scales, admin, inAdmin, adminSignIn, allEmployees,allSectors,
        addSector, updateScale, addTurn, addAdmin
    } = useContext(AuthContext);

    return{
        user,
        signIn,
        logout,
        inUser,
        addEmployee,
        addScale,
        addTurn,
        updateScale,
        addAdmin,
        
        findTeams,
        teams,
        findRegions,
        regions,
        findEmployees,
        employees,
        findScales,
        scales,

        admin,
        inAdmin,
        adminSignIn,
        addSector,
        allEmployees,            
        allSectors,       
    }
}
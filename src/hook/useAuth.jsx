import {useContext} from 'react'
import AuthContext from '../context/authContextImport'

export const useAuth =() => {
    const {
        user, inUser, signIn, logout, addEmployee, addScale,
        findTeams, teams, findRegions, regions, findEmployees, employees, 
        findScales, scales, admin, inAdmin, adminSignIn, allEmployees,allSectors,
        addSector, updateScale, addTurn, addAdmin, deleteEmployee, getAllEmployees,
        findTurns, turns, updateAdmin, actives, findActives, deleteSector, updateSector,
        forgotPassword, codeVerify, resetPassword, scalesEmployees
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
        deleteEmployee,
        getAllEmployees,
        updateAdmin,
        deleteSector, updateSector,
        forgotPassword, codeVerify, resetPassword,
        scalesEmployees,
        
        findTeams,
        teams,
        findRegions,
        regions,
        findEmployees,
        employees,
        findScales,
        scales,
        findTurns,
        turns,
        findActives,
        actives,

        admin,
        inAdmin,
        adminSignIn,
        addSector,
        allEmployees,            
        allSectors,       
    }
}
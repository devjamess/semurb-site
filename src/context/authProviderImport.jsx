import { useState, useEffect } from "react";
import api from '../api/api';
import AuthContext from "./authContextImport";

import { addEmployee, addEmployeeAdmin, findEmployees, findAllEmployees } from "../services/employeesServices";
import { addScale, findScales, updateScale } from "../services/scalesServices";
import { findAllSectors, addSector } from "../services/sectorsServices";
import { addAdmin } from "../services/adminsServices"

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(true)
    const [teams, setTeams] = useState([])
    const [regions, setRegions] = useState([])
    const [employees, setEmployees] = useState(undefined)
    const [scales, setScales] = useState([])
    const [allEmployees, setAllEmployees] = useState([])
    const [allSectors, setAllSectors] = useState([])

    //const [turns, setTurns] = useState([])

    const signIn = async (matricula_funcionario, senha) => {
        try {
            if (!matricula_funcionario || !senha) {
                const erro = 'Preencha todos os campos'
                return { result: null, error: erro };
            }
            if (!/^\d+$/.test(matricula_funcionario)) {
                const erro = 'Creedenciais Invalidas'
                return { result: null, error: erro }
            }
            const { data } = await api.post('/loginAdm', {
                matricula_funcionario,
                senha
            })

            if (data?.token) {
                localStorage.setItem('authToken', data.token);
                setUser(data);
                localStorage.setItem('user_data', JSON.stringify(data));
                return { result: data, error: null };
            }
            return { result: data, error: null };
        } catch (error) {
            const erro = error.response?.data?.mensagem ||
                "Erro Desconhecido"
            console.error('Erro ao fazer login: ', erro)
            return { result: null, error: erro }
        }
    };
    const logout = async () => {
        setUser(null)
        setAdmin(null)
        localStorage.removeItem('user_data')
        localStorage.removeItem('authToken')
        localStorage.removeItem('admin_data')

    };


    const addTurn = async (
        matricula_funcionario,
        inicio_turno,
        termino_turno,
        duracao_turno,
        intervalo_turno,

    ) => {
        try {
            const { data } = await api.post('/cadastrarTurno', {
                matricula_adm: user?.funcionario.matricula_funcionario,
                matricula_funcionario,
                inicio_turno,
                termino_turno,
                duracao_turno,
                intervalo_turno
            })
            const sucess = "Cadastro do Turno realizado com sucesso"
            return { result: data.turno, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao cadastrar turno', erro)
            return { result: null, error: erro, sucess: null }
        }
    }


    const adminSignIn = async (registration, password) => {
        try {
            const { data } = await api.post('/loginMaster', {
                registration,
                password
            })
            if (data?.token) {
                setAdmin(data);
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('admin_data', JSON.stringify(data));
                return data;
            }
            return { result: data, error: null };
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error("Erro ao fazer login como admin", erro)
            return { result: null, error: erro }
        }
    };



    //PUT


    //GET
    const findTeams = async () => {
        try {
            const { data } = await api.get('/equipes');
            setTeams(data || [])
            return { result: data, error: null }
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error("Erro ao buscar equipes:", erro);
            return { result: null, error: erro }
        }
    };
    const findRegions = async () => {
        try {
            const { data } = await api.get('/regiao');
            setRegions(data || [])
            return data
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error("Erro ao buscar regiões:", erro);
            return { result: null, error: erro }
        }
    };


    // const findTurns = async () => {
    //     try{
    //         const {data} = await api.get('/listarTurnos')
    //         setTurns(data || [])
    //         return {result: data, error: null}
    //     } catch(error){
    //         const erro = error.response?.data?.mensagem
    //         console.error('Erro ao listar turnos', erro)
    //         return {result: null, error: erro}
    //     }
    // }

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = localStorage.getItem('user_data');
            if (typeof storedUser === 'string' && storedUser.trim() !== '') {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (e) {
                    // Se o JSON estiver corrompido, limpe o localStorage
                    console.error("Erro ao fazer parse do JSON do usuário:", e);
                    localStorage.removeItem('user_data');
                }
            }

            setLoading(false);

        };
        loadUser();


    }, []);

    useEffect(() => {
        const loadAdmin = async () => {
            const storedAdmin = localStorage.getItem('admin_data');
            if (typeof storedAdmin === 'string' && storedAdmin.trim() !== '') {
                try {
                    setAdmin(JSON.parse(storedAdmin));
                } catch (e) {
                    // Se o JSON estiver corrompido, limpe o localStorage
                    console.error("Erro ao fazer parse do JSON do usuário:", e);
                    localStorage.removeItem('admin_data');
                }
            }

            setLoading(false);

        };
        loadAdmin();

    }, []);

    useEffect(() => {
        if (user?.funcionario?.matricula_funcionario) {
            (async () => {
                await findTeams();
                await findRegions();
                //await findTurns();
                setEmployees(await findEmployees(user));
                setScales(await findScales(user));
            })();
        }
    }, [user])

    useEffect(() => {
        if (admin) {
            (async () => {
                await findTeams();
                await findRegions();
                setScales(await findScales());
                setAllSectors(await findAllSectors());
                setAllEmployees(await findAllEmployees());
            })();
        }
    }, [admin])



    const [token, setToken] = useState(false);

   function isTokenExpired(token) {
    try {
        const [, payload] = token.split('.');
        const { exp } = JSON.parse(atob(payload));
        return Date.now() >= exp * 1000;
    } catch {
        return true;
    }
}

useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && isTokenExpired(token)) {
        setUser(null);
        setAdmin(null);
        setToken(true);
        localStorage.removeItem('user_data');
        localStorage.removeItem('authToken');
        localStorage.removeItem('admin_data');
    }
}, []);

    useEffect(() => {
        if (token) {
            const timer = setTimeout(() => {
                window.location.href = '/';
            }, 2000); // 2 segundos para mostrar a mensagem
            return () => clearTimeout(timer);
        }
    }, [token]);

    if (token) {
        setTimeout(() => window.location.href = '/', 2000);
        return <p className="loading-text">Sua sessão expirou. Redirecionando para o login...</p>
    }



    if (loading) {
        return <p className="loading-text">Carregando...</p>
    };

    return (
        <AuthContext.Provider value={{
            user,
            inUser: !!user,
            signIn, logout,
            addEmployee, addScale,
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
            // findTurns,
            //turns,

            admin,
            inAdmin: !!admin,
            adminSignIn,
            addSector,
            addEmployeeAdmin,

            findAllEmployees,
            allEmployees,
            findAllSectors,
            allSectors,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

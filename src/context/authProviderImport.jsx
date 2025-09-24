
import { useState, useEffect } from "react";
import api from '../api/api';
import AuthContext from "./authContextImport";
import Alert from "../components/modals/Alert";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(true)
    const [teams, setTeams] = useState([])
    const [regions, setRegions] = useState([])
    const [employees, setEmployees] = useState([])
    const [scales, setScales] = useState([])
    const [allEmployees, setAllEmployees] = useState([])
    const [allSectors, setAllSectors] = useState([])

    const signIn = async (matricula_funcionario, senha) => {
        try {
            if (!matricula_funcionario || !senha) {
                const erro = 'Preencha todos os campos'
                return {result: null, error: erro};
            }
            if (!/^\d+$/.test(matricula_funcionario)) {
                const erro = 'Creedenciais Invalidas'
                return{result: null, error: erro}
            }
            const { data } = await api.post('/loginAdm', {
                matricula_funcionario,
                senha
            })

            if (data) {
                setUser(data);
                localStorage.setItem('user_data', JSON.stringify(data));
                return {result: data, error: null};
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
        localStorage.removeItem('user_data')

    };
    const addEmployee = async (
        nome,
        matricula_funcionario,
        telefone,
        email,
        cargo,
        nome_regiao,
        nome_equipe,
        senha
    ) => {
        try {
            const { data } = await api.post('/cadastrarFuncionario', {
                matricula_adm: user?.funcionario.matricula_funcionario,
                nome,
                matricula_funcionario,
                telefone,
                email,
                cargo,
                nome_regiao,
                nome_equipe,
                senha
            })
            const sucess = 'Cadastro do funcionario realizado com sucesso'
            return { result: data.funcionario, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem
                || "Erro Desconhecido"
            console.error('erro ao cadastrar :', erro)
            return { result: null, error: erro, secess: null };
        }

    };
    const addScale = async (
        matricula_funcionario,
        data_inicio,
        dias_trabalhados,
        dias_n_trabalhados,
        tipo_escala
    ) => {
        try {
            const { data } = await api.post('/cadastrarEscala', {
                matricula_adm: user?.funcionario.matricula_funcionario,
                matricula_funcionario,
                data_inicio,
                dias_trabalhados,
                dias_n_trabalhados,
                tipo_escala
            })
            const sucess = "Cadastro da escala realizado com sucesso"
            return { result: data.escala, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao cadastrar escala', erro)
            return { result: null, error: erro, sucess: null }
        }
    };



    const adminSignIn = async (registration, password) => {
        try {
            const { data } = await api.post('/loginMaster', {
                registration,
                password
            })
            if (data) {
                setAdmin(data);
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
    const addSector = async (nome_setor) => {
        try {
            const { data } = await api.post('/cadastrarSetor', {
                nome_setor
            })
            return { result: data, error: null };
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao criar setor', erro)
        }
    };
    const addEmployeeAdmin = async (
        matricula_funcionario,
        nome,
        email,
        senha,
        telefone,
        cargo,
        status_permissao,
    ) => {
        try {
            const { data } = await api.post('cadastrarFuncioanrio_master', {
                matricula_funcionario,
                nome,
                email,
                senha,
                telefone,
                cargo,
                status_permissao
            })
            return { result: data, error: null }
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error("Erro ao cadastrar Administrador", erro)
            return { result: null, error: erro }
        }
    }


    //GET
    const findTeams = async () => {
        try {
            const { data } = await api.get('/equipes');
            setTeams(data || [])
            return {result: data, error: null}
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error("Erro ao buscar equipes:", erro);
            return {result: null, error: erro}
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
            return {result: null, error: erro}
        }
    };
    const findEmployees = async () => {
        try {
            console.log(user)
            const { data } = await api.get(`/funcionariosSetor/${user?.funcionario.matricula_funcionario}`)
            setEmployees(data || [])
            return {result: data, error: null}
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao listar funcionarios', erro)
            return {result: null, error: erro}
        }
    };
    const findScales = async () => {
        try {
            const { data } = await api.get(`/escalasSetor/${user?.funcionario.matricula_funcionario}`)
            setScales(data || [])
            return {result: data, error: null}
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao listar escalas', erro)
            return {result: null, error: erro}
        }
    };



    const findAllEmployees = async () => {
        try {
            const { data } = await api.get('/listarFuncionarios_master')
            setAllEmployees(data || [])
            return {result: data, error: null}
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao buscar funcionarios', erro)
            return {result: null, error: erro}
        }
    };
    const findAllSectors = async () => {
        try {
            const { data } = await api.get('/listarSetores')
            setAllSectors(data || [])
            return {result: data, error: null}
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao buscar setores', erro)
            return {result: null, error: erro}
        }
    };



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
        findScales();
        findTeams();
        findRegions();
        findEmployees();
    }, [user])

    useEffect(() => {

        findAllSectors();
        findAllEmployees();
    }, [admin])

    if (loading) return;

    return (
        <AuthContext.Provider value={{
            user,
            inUser: !!user,
            signIn, logout,
            addEmployee, addScale,
            findTeams,
            teams,
            findRegions,
            regions,
            findEmployees,
            employees,
            findScales,
            scales,

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

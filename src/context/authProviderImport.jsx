
import { useState, useEffect } from "react";
import api from '../api/api';
import  AuthContext  from "./authContextImport";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const signIn = async (matricula_funcionario, senha) => {
        try{
            if(!matricula_funcionario || !senha){
                alert('Preencha todos os campos');
                return;
            }
            if (!/^\d+$/.test(matricula_funcionario)){
                alert('Mátricula Inválida');
                return;
            }

            const {data} = await api.post('/loginAdm' ,{
                matricula_funcionario,
                senha
            })

            if(data &&data){
                setUser(data);
                localStorage.setItem('user_data', JSON.stringify(data));
                return data;
            }
            return;
            

        } catch(error){
            console.error('Erro ao fazer login: ', error.message)
        }
    }

    const logout = async() => {
        setUser(null)
        localStorage.removeItem('user_data')
       
    }

    const addEmployee = async(
        nome,
        matricula_funcionario,
        telefone,
        email,
        cargo,
        regiao,
        equipe
    ) =>{
        try{
            const {data} = await api.post('/cadastrarFuncionario', {
                matricula_adm: user?.funcionario.matricula_funcionario,
                nome,
                matricula_funcionario,
                telefone,
                email,
                cargo,
                regiao,
                equipe,
            })
        }catch(error){
            console.error('erro ao cadastrar :', error.message)
        }
    } 


    useEffect (() => {
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

    if (loading) return;

    return(
        <AuthContext.Provider value={{
            user, inUser: !!user, signIn, logout, addEmployee
        }}>
            {children}
        </AuthContext.Provider>
    )
}

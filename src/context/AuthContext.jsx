
import React,{createContext, useState, useEffect} from "react";
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

            if(data){
                setUser(data);
                localStorage.setItem(user, JSON.stringify(data));
                return data;
            }
            return;

        } catch(error){
            console.error('Erro ao fazer login: ', error.message)
        }
    }

    useEffect (() => {
        const loadUser = async () => {
            const storedUser = localStorage.getItem(user);
            if(storedUser){
                setUser(JSON.stringify(storedUser))
            }
            setLoading(false)
        };

        loadUser();
    }, []);

    if (loading) return;

    return(
        <AuthContext.Provider value={{
            user, signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

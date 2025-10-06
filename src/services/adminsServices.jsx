import api from '../api/api'

export const addAdmin = async (payload) => {
    try {
        const { data } = await api.post('cadastrarFuncionario_master', {...payload})
        const sucess = "Administrador cadastrado com sucesso"
        return { result: data, error: null, sucess: sucess }
    }catch(error){
         const erro = error.response?.data?.mensagem
        console.error('Erro ao cadastrar administrador', erro)
        return { result: null, error: erro, sucess: null }
    }}
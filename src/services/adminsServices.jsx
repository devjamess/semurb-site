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
export const deleteEmployee = async(matricula_funcionario) => {
    try{
        const {data} = await api.delete(`/deletarFuncionario_master/${matricula_funcionario}`,{
            matricula_funcionario
        })
        const sucess = "Funcionário deletado com sucesso"
        return { result: data, error: null, sucess: sucess }
    }catch(error){
         const erro = error.response?.data?.mensagem
        console.error('Erro ao deletar funcionário', erro)
        return { result: null, error: erro, sucess: null }
    }
}
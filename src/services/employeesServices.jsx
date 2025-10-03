 import api from "../api/api";
 
 export const addEmployee = async (
    user, payload
    ) => {
        try {
            const { data } = await api.post('/cadastrarFuncionario', {
                matricula_adm: user?.funcionario.matricula_funcionario,
                ...payload
            })
            const sucess = 'Cadastro do funcionario realizado com sucesso'
            return { result: data.funcionario, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem
                || "Erro Desconhecido"
            console.error('erro ao cadastrar :', erro)
            return { result: null, error: erro, sucess: null };
        }
    }

    export const findAllEmployees = async () => {
        try {
            const { data } = await api.get('/listarFuncionarios_master')
            return {result: data.funcionarios, error: null}
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao buscar TODOS funcionarios', erro)
            return {result: null, error: erro}
        }
    };

    export const addEmployeeAdmin = async (payload) => {
        try {
            const { data } = await api.post('cadastrarFuncionario_master', {
                ...payload
            })
            const sucess = "Administrador cadastrado com sucesso"
            return { result: data, error: null, sucess: sucess }
        }catch(error){
             const erro = error.response?.data?.mensagem
            console.error('Erro ao cadastrar administrador', erro)
            return { result: null, error: erro, sucess: null }
        }
    }

    export const findEmployees = async (user) => {
        try {
            const { data } = await api.get(`/funcionariosSetor/${user?.funcionario.matricula_funcionario}`)
            return {result: data, error: null}
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao listar funcionarios', erro)
            return {result: null, error: erro}
        }
    };
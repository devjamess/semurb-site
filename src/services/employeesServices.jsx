 import api from "../api/api";
 
 export const addEmployee = async (user, payload) => {
        try {
            const { data } = await api.post('/cadastrarFuncionario', {
                matricula_adm: user?.funcionario.matricula_funcionario,
                ...payload
            })
            const sucess = 'Cadastro do funcionario realizado com sucesso'
            return { result: data.funcionario, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem || 
            error.message ||
            "Erro Desconhecido"
            console.error('erro ao cadastrar :', erro)
            return { result: null, error: erro, sucess: null };
        }
    }

    export const findAllEmployees = async () => {
        try {
            const { data } = await api.get('/listarFuncionarios_master')
             const sucess = "TODOS funcionarios listados com sucesso"
        return { result: data.funcionarios, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao buscar TODOS funcionarios', erro)
            return {result: null, error: erro, sucess: null}
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
             const sucess = "funcionarios listados com sucesso"
        return { result: data, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao listar funcionarios', erro)
            return {result: null, error: erro, sucess: null}
        }
    };
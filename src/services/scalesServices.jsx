import api from "../api/api";

export const addScale = async (
        payload, user
    ) => {
        try {
            const { data } = await api.post('/cadastrarEscala', {
                matricula_adm: user?.funcionario.matricula_funcionario,
                ...payload
            })
            const sucess = "Cadastro da escala realizado com sucesso"
            return { result: data.escala, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao cadastrar escala', erro)
            return { result: null, error: erro, sucess: null }
        }
    };

export const updateScale = async(
        user, payload
    ) => {
        try{
        const {data} = await api.put('alterarEscala', {
        matricula_adm: user?.funcionario.matricula_funcionario,
        ...payload
            })
        const sucess = "Escala atualizada com sucesso"
            return { result: data.escala, error: null, sucess: sucess }
        }catch(error){
             const erro = error.response?.data?.mensagem
            console.error('Erro ao atualizar escala', erro)
            return { result: null, error: erro, sucess: null }
        }
    }

export const findScales = async () => {
        try {
            const { data } = await api.get(`/escalas`)
            return {result: data, error: null}
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao listar escalas', erro)
            return {result: null, error: erro}
        }
    };
import api from '../api/api'

export const findAllSectors = async () => {
        try {
            const { data } = await api.get('/listarSetores')
             const sucess = "Setores listados com sucesso"
        return { result: data, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao buscar TODOS setores', erro)
            return {result: null, error: erro}
        }
    };                                                                           
export const addSector = async (nome_setor) => {
        try {
            const { data } = await api.post('/cadastrarSetor', {
                nome_setor
            })
             const sucess = "Setor cadastrado com sucesso"
        return { result: data, error: null, sucess: sucess }
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao criar setor', erro)
        }
    };
import api from '../api/api'

export const findAllSectors = async () => {
        try {
            const { data } = await api.get('/listarSetores')
            return {result: data, error: null}
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao buscar TODOS setores', erro)
            return {result: null, error: erro}
        }
    };
export const addSector = async (payload) => {
        try {
            const { data } = await api.post('/cadastrarSetor', {
                ...payload
            })
            return { result: data, error: null };
        } catch (error) {
            const erro = error.response?.data?.mensagem
            console.error('Erro ao criar setor', erro)
        }
    };
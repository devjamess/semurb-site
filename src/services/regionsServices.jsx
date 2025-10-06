import api from '../api/api'

 export const findRegions = async (user) => {
    try {
      const { data } = await api.get(`/regiaoSetor/${user?.funcionario?.matricula_funcionario}`);
      const sucess = 'Regiões listadas com sucesso'
      return { result: data, error: null, sucess: sucess }
    } catch (error) {
      const erro = error.response?.data?.mensagem
      console.error("Erro ao buscar regiões:", erro);
      return { result: null, error: erro }
    }
  };
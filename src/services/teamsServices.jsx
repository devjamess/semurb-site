import api from '../api/api'

  export const findTeams = async (user) => {
    try {
      const { data } = await api.get(`/equipesSetor/${user?.funcionario?.matricula_funcionario}`);
      const sucess = 'Equipes listadas com sucesso'
      return { result: data, error: null, sucess: sucess }
    } catch (error) {
      const erro = error.response?.data?.mensagem
      console.error("Erro ao buscar equipes:", erro);
      return { result: null, error: erro, sucess: null }
    }
  };
 
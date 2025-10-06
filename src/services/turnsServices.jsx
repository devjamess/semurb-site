import api from '../api/api'

  export const findTurns = async (user) => {
      try{
          const {data} = await api.get(`/turnosSetor/${user?.funcionario?.matricula_funcionario}`)
          const sucess = 'Turnos listados realizado com sucesso'
           return { result: data, error: null, sucess: sucess }
      } catch(error){
          const erro = error.response?.data?.mensagem
          console.error('Erro ao listar turnos', erro)
          return {result: null, error: erro, sucess: null}
      }
  };
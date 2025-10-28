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

  export const addTurn = async (user, payload) => {
    try {
      const { data } = await api.post('/cadastrarTurno', {
        matricula_adm: user?.funcionario.matricula_funcionario,
        ...payload
      })
      const sucess = "Cadastro do Turno realizado com sucesso"
      return { result: data.turno, error: null, sucess: sucess }
    } catch (error) {
      const erro = error.response?.data?.mensagem
      console.error('Erro ao cadastrar turno', erro)
      return { result: null, error: erro, sucess: null }
    }
  }

  export const updateTurn = async (user, payload) => {
    try{
      const {data} = await api.put('/',{
        matricula_adm: user?.funcionario?.matricula_funcionario,
        ...payload
      })
      const sucess = 'Turno alterado com sucesso'
      return {result: data, error: null, sucess: sucess}
    }catch (error){
      const erro = error?.response?.data?.mensagem || error.message
      console.error('Erro ao alterar turno ', erro)
      return { result: null, error: erro, sucess: null}
    }
  }
import api from '../api/api'

export const forgotPassword = async(email) =>{
  try{
      const {data} = await api.post('/envioVerificacaoAdm_email',{
        email
      })
    const sucess = "Codigo enviado com sucesso"
    return {result: data, error: null, sucess: sucess}
  } catch(error){
    const erro = error?.response?.data?.mensagem
    return {result: null, error: erro || error?.message, sucess: null}
  }
}

export const codeVerify = async(codigo, matricula_funcionario) =>{
  try{
    const {data} = await api.post('/verificacaoCodigoAdm',{
      codigo, matricula_funcionario
    })
    const sucess = "Codigo verificado com sucesso"
    return {result: data, error: null, sucess: sucess}
  } catch(error){
    const erro = error?.response?.data?.mensagem
    return {result: null, error: erro || error?.message, sucess: null}
  }
}

export const resetPassword = async(matricula_funcionario, codigo, nova_senha, confirmar_senha) =>{
  try{
    const {data} = await api.put('/redefinirSenhaAdm',{
      nova_senha, confirmar_senha, matricula_funcionario, codigo
    })
    const sucess = "Senha redefinida com sucesso"
    return {result: data, error: null, sucess: sucess}
  } catch(error){
    const erro = error?.response?.data?.mensagem
    return {result: null, error: erro || error?.message, sucess: null}
  }
}
import api from '../api/api'

export const forgotPassword = async(email) =>{
  try{
    const {data} = await api.post('envioVerificacaoAdm_email')
    const sucess = "Codigo enviado com sucesso"
    return {result: data, error: null, sucess: sucess}
  } catch(error){
    const erro = error?.response?.data?.mensagem
    return {result: null, error: erro || error?.message, sucess: null}
  }
}

export const codeVerify = async(code) =>{
  try{
    const {data} = await api.post('verificacaoCodigoAdm')
    const sucess = "Codigo verificado com sucesso"
    return {result: data, error: null, sucess: sucess}
  } catch(error){
    const erro = error?.response?.data?.mensagem
    return {result: null, error: erro || error?.message, sucess: null}
  }
}

export const resetPassword = async(senha) =>{
  try{
    const {data} = await api.post('redefinirSenhaAdm')
    const sucess = "Senha redefinida com sucesso"
    return {result: data, error: null, sucess: sucess}
  } catch(error){
    const erro = error?.response?.data?.mensagem
    return {result: null, error: erro || error?.message, sucess: null}
  }
}
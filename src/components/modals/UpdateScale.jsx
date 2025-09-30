import {useAuth} from '../../hook/useAuth'
import {useState} from 'react'

export default function UpdateScale ({employee, setIsOpenEmployee}) { 
    const { addScale, scales} = useAuth();
    const [erroMessage, setErroMessage] = useState() 
    const [response, setResponse] = useState('Erro')
    const [save, setSave] = useState()
  const [matricula_funcionario, setMatriculaFuncionario] = useState(employee?.matricula_funcionario || currentEmployee?.matricula_funcionario)
  const [data_inicio, setDataInicio] = useState("");
  const [tipo_escala, setTipoEscala] = useState("");
  const [dias_trabalhados, setDiasTrabalhados] = useState("");
  const [dias_n_trabalhados, setDiasNTrabalhados] = useState("");
  

  async function handleAddScale(e) {
    e.preventDefault();
      const scale = await addScale(
        matricula_funcionario,
        data_inicio, 
        dias_trabalhados,
        dias_n_trabalhados, 
        tipo_escala
    )
      if (scale.result) {
        setResponse('Sucesso')
        setErroMessage(scale.sucess)
        setSave(scale)// fecha modal depois de cadastrar
      } else {
        setResponse(response)
        setErroMessage(scale.error)
      }
  }

  return (
    <div>
      {erroMessage && 
      <Alert response={response}
      text='ao Cadastrar Escala'
      error={erroMessage}
      onClose={() => {setErroMessage("")
        if(response === 'Sucesso' && save){
          setIsOpenEmployee(false)
        }}
      }/>
      }
    <div className="form-card-position">
      

      <form onSubmit={handleAddScale} className="forms">
        <p className="form-title">Atualizar Escala</p>
        <div className="form-card">
          <input type="number" className="form-input" placeholder='Matricula'
            value={matricula_funcionario} onChange={(e) => setMatriculaFuncionario(e.target.value)} />
          <input type="date" className="form-input"
            value={data_inicio} onChange={(e) => setDataInicio(e.target.value)} />
          <input type="number" className="form-input" placeholder="Dias trabalhados"
            value={dias_trabalhados} onChange={(e) => setDiasTrabalhados(e.target.value)} />
          <input type="number" className="form-input" placeholder="Dias de folga"
            value={dias_n_trabalhados} onChange={(e) => setDiasNTrabalhados(e.target.value)} />
             <input 
            id="escala-input"
            list="escalas-list"
            className="form-input"
            placeholder="Escala"
            value={tipo_escala}
            onChange={(e) => setTipoEscala(e.target.value)}
            
            />
            <datalist id="escalas-list">
            {scales.map(scalel => (
                <option key={scalel.escala.id_escala} value={scalel.escala.tipo_escala} />
            ))}
            </datalist>
        </div>
        <div className="buttons-form">
        <button type="submit" className="confirm-button"> Concluir </button>
        <button  className="cancel-button" onClick={() => setIsOpenEmployee(false)}>Fechar</button>
      </div>
      </form>
    </div>
    </div>
  );

    
}
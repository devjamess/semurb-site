import { useAuth } from '../../hook/useAuth'
import { useState } from 'react'
import Alert from '../modals/Alert'
export default function UpdateScale({ employee, setIsOpenEmployee, isOpenEmployee }) {
    const { updateScale, scales } = useAuth();
    const [erroMessage, setErroMessage] = useState()
    const [response, setResponse] = useState('Erro')
    const [save, setSave] = useState()
   
     const [form, serForm] = useState({
      matricula_funcionario: employee,
      data_inicio: '',
      tipo_escala: '',
      dias_trabalhados: '',
      dias_n_trabalhados: '',
    })
    const handleChange = (e) => {
      const { name, value } = e.target;
        serForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    async function handleAddScale(e) {
        e.preventDefault();
        const newScale = await updateScale(form)
        if (newScale.result) {
            setResponse('Sucesso')
            setErroMessage(newScale.sucess)
            setSave(newScale)// fecha modal depois de cadastrar
        } else {
            setResponse(response)
            setErroMessage(newScale.error)
        }
    }

    if (isOpenEmployee) {
        return (
            <div className='form-container'>
                {erroMessage &&
                    <Alert response={response}
                        text='ao Atualizar Escala'
                        error={erroMessage}
                        onClose={() => {
                            setErroMessage("")
                            if (response === 'Sucesso' && save) {
                                setIsOpenEmployee(false)
                            }
                        }
                        } />
                }
                <div className="form-card-position">


                    <form onSubmit={handleAddScale} className="forms">
                        <p className="form-title">Atualizar Escala</p>
                        <div className="form-card">
                            <input name='matricula_funcionario' type="number" className="form-input" placeholder='Matricula'
                                value={form.matricula_funcionario} onChange={handleChange} />
                            <input name='data_inicio' type="date" className="form-input"
                                value={form.data_inicio} onChange={handleChange} />
                            <input name='dias_trabalhados' type="number" className="form-input" placeholder="Dias trabalhados"
                                value={form.dias_trabalhados} onChange={handleChange} />
                            <input name='dias_n_trabalhados' type="number" className="form-input" placeholder="Dias de folga"
                                value={form.dias_n_trabalhados} onChange={handleChange} />
                            <input name ='tipo_escala'
                                id="escala-input"
                                list="escalas-list"
                                className="form-input"
                                placeholder="Escala"
                                value={form.tipo_escala}
                                onChange={handleChange}

                            />
                            <datalist id="escalas-list">
                                {scales?.result?.map(scalel => (
                                    <option key={scalel.id_escala} value={scalel.tipo_escala} />
                                ))}
                            </datalist>
                        </div>
                        <div className="buttons-form">
                            <button type="submit" className={`confirm-button 
                            ${Object.values(form).some(value => value === '') ? 'disable' : '' }`}
                            disabled={Object.values(form).some(value => value === '')}> Concluir </button>
                            
                            <button className="cancel-button" onClick={() => setIsOpenEmployee(!isOpenEmployee)}>Fechar</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } return null

}
import { useAuth } from '../../hook/useAuth'
import { useState } from 'react'
import Alert from '../modals/Alert'
export default function UpdateScale({ employee, setIsOpenEmployee, isOpenEmployee }) {
    const { updateScale, scales } = useAuth();
    const [erroMessage, setErroMessage] = useState()
    const [response, setResponse] = useState('Erro')
    const [save, setSave] = useState()
    const [matricula_funcionario, setMatriculaFuncionario] = useState(employee)
    const [data_inicio, setDataInicio] = useState("");
    const [tipo_escala, setTipoEscala] = useState("");
    const [dias_trabalhados, setDiasTrabalhados] = useState("");
    const [dias_n_trabalhados, setDiasNTrabalhados] = useState("");


    async function handleAddScale(e) {
        e.preventDefault();
        const newScale = await updateScale(
            matricula_funcionario,
            data_inicio,
            dias_trabalhados,
            dias_n_trabalhados,
            tipo_escala
        )
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
            <div>
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
                            <button type="submit" className="confirm-button"
                                disabled={
                                    !matricula_funcionario ||
                                    !data_inicio ||
                                    !dias_trabalhados ||
                                    !dias_n_trabalhados ||
                                    !tipo_escala
                                }> Concluir </button>
                            <button className="cancel-button" onClick={() => setIsOpenEmployee(!isOpenEmployee)}>Fechar</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } return null

}
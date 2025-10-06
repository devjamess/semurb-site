import {useState} from 'react';
import {useAuth} from '../hook/useAuth'
import Alert from './modals/Alert';

export default function AddAdmin({isOpenModal, setIsOpenModal}) {

  const { addAdmin, allSectors } = useAuth()
  
  const [erroMessage, setErroMessage] = useState()
  const [response, setResponse] = useState('Erro')



    const [form, setForm] = useState({
      matricula_funcionario: '',
      nome: '',
      email: '',
      telefone: '',
      cargo: '',
      setor: '',
      status_permissao: '',
    })
    const handleChange = (e) => {
      const { name, value } = e.target;
        setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const admin =await addAdmin(form)
        
        if(admin.result){
          setResponse('Sucesso')
          setErroMessage(admin.sucess)
        } else {
          setResponse('Erro')
          setErroMessage(admin.error)
        }
    }
    if (isOpenModal) return(
      <div className="form-container">
        {erroMessage && (
        <Alert
          response={response}
          text="ao Cadastrar Funcionario"
          error={erroMessage}
          onClose={() => {
            setErroMessage("")
            setIsOpenModal(!isOpenModal)
          }}
          
        />
      )}
        <div className="form-card-position admin-card">
        <form onSubmit={handleSubmit} className="forms admin-form">
          <p className="form-title">Adicionar Funcionario</p>
          <div className="form-card">
            <input name="matricula_funcionario" type="number" className="form-input" placeholder="Matricula"
              value={form.matricula_funcionario} onChange={handleChange} />

            <input name="nome" type="text" className="form-input" placeholder="Nome Completo"
              value={form.nome} onChange={handleChange} />

            <input name="email" type="email" className="form-input" placeholder="Email"
              value={form.email} onChange={handleChange} />

            <input name="telefone" type="tel" className="form-input" placeholder="Telefone"
              value={form.telefone} onChange={handleChange} />

            <input name="cargo" type="text" className="form-input" placeholder="Cargo"
              value={form.cargo} onChange={handleChange} />

            <input name="status_permissao" type="text" className="form-input" placeholder="Administrador (Sim/Não)"
              value={form.status_permissao} onChange={handleChange} id='permissao-input' list="permissao-list" />
            <datalist id="permissao-list">
              <option value="Sim" className=""></option>
              <option value="Não" className=""></option>
            </datalist>

            <input name="setor" id="setor-input" list="setores-list" className="form-input"
              placeholder="Setor" value={form.setor} onChange={handleChange} />
            <datalist id="setores-list">
              {allSectors.result?.setores?.map((sector, key) => (
                <option key={key} value={sector.nome_setor} />
              ))}
            </datalist>
          </div>

          <div className="buttons-form">
            <button type="submit" className="confirm-button"
              disabled={Object.values(form).some(value => value === '')}
        >
              Continuar
            </button>
            <button className="cancel-button" onClick={() => setIsOpenModal(!isOpenModal)}>Cancelar</button>
          </div>
        </form>
      </div>
      </div>

    );
}
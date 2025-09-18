import '../../styles/AddEmployee.css'
import {useAuth} from '../../hook/useAuth'
import { useState, useEffect } from 'react'; // Import useEffect

function AddEmployeeCard({isOpenEmployee, setIsOpenEmployee, initialPage = 1}) {

    const [currentPage, setCurrentPage] = useState(initialPage)
    const [createdEmployee, setEmployee] = useState(null)

    // Use useEffect to update currentPage when the modal opens with a new initialPage
    useEffect(() => {
        if (isOpenEmployee) {
            setCurrentPage(initialPage);
        }
    }, [isOpenEmployee, initialPage]);

     const goNextPage = (employee) => {
        setEmployee(employee)
     setCurrentPage(2);
  };

    const pages = [
        <Page1 goNextPage={goNextPage} isOpenEmployee={isOpenEmployee} setIsOpenEmployee={setIsOpenEmployee} />,
        <Page2 employee={createdEmployee} setIsOpenEmployee={setIsOpenEmployee}/>
    ];

    return isOpenEmployee && (
        <div className='form-container'>
            {pages[currentPage - 1]}
        </div>
    )
}

// ... Page1 and Page2 components remain unchanged


function Page1({setIsOpenEmployee, goNextPage}) {

    const {addEmployee, teams, regions} = useAuth();
    
 

    async function handleAddEmployee(e){
        e.preventDefault();

        const employee = await addEmployee(
            nome, matricula_funcionario, telefone,
            email, cargo, nome_regiao, nome_equipe, senha)
       
        if(employee){
            goNextPage(employee)
        }
    }
       const [nome, setNome] = useState()
       const [matricula_funcionario, setMatricula] = useState()
       const [senha, setSenha] = useState()
       const [telefone, setTelefone] = useState()
       const [email, setEmail] = useState()
       const [cargo, setCargo] = useState()
       const [nome_equipe, setEquipe] = useState()
       const [nome_regiao, setRegiao] = useState()


    return (
    <div>
        <div action="" className="form-card-position">
        <form onSubmit={handleAddEmployee} className="forms">            
            <p className="form-title">Adicionar Funcionario</p>
            <div className="form-card">
            <input type="text" className="form-input" placeholder='Nome Completo' 
             value={nome} onChange={(e) => setNome(e.target.value)} />

            <input type="number" className="form-input" placeholder='Matricula'
             value={matricula_funcionario} onChange={(e) => setMatricula(e.target.value) }/>

            <input type="tel" className="form-input" placeholder='Telefone'
             value={telefone} onChange={(e) => setTelefone(e.target.value)} />

            <input type="email" className="form-input" placeholder='Email'
             value={email} onChange={(e) => setEmail(e.target.value) }/> 

            <input type="text" className="form-input" placeholder='Cargo'
            value={cargo} onChange={(e) => setCargo(e.target.value) }/>

            <input type='password' className="form-input" placeholder='Senha'
            value={senha} onChange={(e) => setSenha(e.target.value) }/>
            
            <input 
            id="equipe-input"
            list="equipes-list"
            className="form-input"
            placeholder="Equipe"
            value={nome_equipe}
            onChange={(e) => setEquipe(e.target.value)}
            
            />
            <datalist id="equipes-list">
            {teams.map((eq) => (
                <option key={eq.id_equipe} value={eq.nome_equipe} />
            ))}
            </datalist>

           
            <input 
            id="regiao-input"
            list="regiões-list"
            className="form-input"
            placeholder="Regiao"
            value={nome_regiao}
            onChange={(e) => setRegiao(e.target.value)}
            
            />
            <datalist id="regiões-list">
            {regions.map((eq) => (
                <option key={eq.id_regiao} value={eq.nome_regiao} />
            ))}
            </datalist>
            
            </div>
            <button type='submit' className='confirm-button' >Continuar</button>
            <button className='cancel-button' onClick={setIsOpenEmployee}>Fechar</button>
        </form>
        </div>
    </div>
   
  );
 } 

function Page2 ({employee, setIsOpenEmployee}) { 
    const { addScale, scales, employees} = useAuth();
    

  const [data_inicio, setDataInicio] = useState("");
  const [tipo_escala, setTipoEscala] = useState("");
  const [dias_trabalhados, setDiasTrabalhados] = useState("");
  const [dias_n_trabalhados, setDiasNTrabalhados] = useState("");
  const [matricula_funcionario, setMatriculaFuncionario] = useState(employee?.matricula_funcionario || "")

  async function handleAddScale(e) {
    e.preventDefault();
    try {
      const scale = await addScale(matricula_funcionario, {
        data_inicio, dias_trabalhados,
        dias_n_trabalhados, tipo_escala
    })
      if (scale) {
        alert("Escala cadastrada com sucesso!");
        setIsOpenEmployee(false); // fecha modal depois de cadastrar
      }
    } catch (err) {
      console.error("Erro ao cadastrar escala", err);
    }
  }

  return (
    <div className="form-card-position">
      <form onSubmit={handleAddScale} className="forms">
        <p className="form-title">Cadastrar Escala</p>
        <div className="form-card">
          <input type="number" className="form-input"
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
                <option key={scalel.id_escala} value={scalel.tipo_escala} />
            ))}
            </datalist>
        </div>
        <button type="submit" className="confirm-button"> Concluir </button>
        <button  className="cancel-button" onClick={() => setIsOpenEmployee(false)}>Fechar</button>
      </form>
    </div>
  );

    
}

export default AddEmployeeCard
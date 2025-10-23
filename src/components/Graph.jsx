import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import "../styles/Graph.css";
import {useAuth} from '../hook/useAuth'
import { BeatLoader } from "react-spinners";


function MyChart() {
  const [data, setData] = useState([]);
  const {scalesEmployees} = useAuth()
  
  useEffect(() => {
    if(scalesEmployees?.result){
   const dataChart = [
      ["Escala", "Funcionarios", { role: "style" }],
      //...retira o array extra
      ...scalesEmployees.result.map(info =>[
        info?.tipo_escala, 
        Number(info?.quantidade), 
        "#F4D03F"
      ])
    ];
    setData(dataChart)
  }}, [scalesEmployees]); 

  const options = {
    backgroundColor: "transparent",
    title: "Funcionários por Escala",
    titleTextStyle: { color: "#F4D03F" },
    chartArea: { width: "80%" },
    hAxis: {
      title: "Escalas",
      minValue: 0,
      textStyle: { color: "#F4D03F" },
      titleTextStyle: { color: "#F4D03F" },
    },
    vAxis: {
      title: "Total de Funcionarios",
      textStyle: { color: "#F4D03F" },
      titleTextStyle: { color: "#F4D03F" },
    },
    legend: { textStyle: { color: "#F4D03F" } },
  };

  if (data.length === 0) return <p className="loading-text">Carregando dados...</p>

  return (
    <div className="container-graph">
      <Chart
        chartType="ColumnChart"
        data={data}
        options={options}
        width="100%"
        height="400px"
        legendToggle
      />
    </div>
  );
}

export default MyChart;

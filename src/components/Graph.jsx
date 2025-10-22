import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import "../styles/Graph.css";


function MyChart() {
  const [data, setData] = useState([]);
  


  useEffect(() => {
    setData([
      ["Escala", "Funcionarios", { role: "style" }],
      ["6x1", 10, "#F4D03F"],
      ["5x2", 29, "#F4D03F"],
      ["4x3", 18, "#F4D03F"],
      ["3x4", 15, "#F4D03F"],
      ["2x5", 23, "#F4D03F"],
      ["1x6", 7, "#F4D03F"],
    ]);
  }, []); 

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

  if (data.length === 0) return null

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

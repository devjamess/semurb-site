import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import "../styles/Graph.css";


function getCssVar(variable) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable);
}

function MyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      ["Escala", "Funcionarios", { role: "style" }],
      ["6x1", 10, getCssVar("--fix-yellow")],
      ["5x2", 29, getCssVar("--fix-yellow")],
      ["4x3", 18, getCssVar("--fix-yellow")],
      ["3x4", 15, getCssVar("--fix-yellow")],
      ["2x5", 23, getCssVar("--fix-yellow")],
      ["1x6", 7, getCssVar("--fix-yellow")],
    ]);
  }, []); 

  const options = {
    backgroundColor: "transparent",
    title: "Funcionários por Escala",
    titleTextStyle: { color: getCssVar("--text") },
    chartArea: { width: "80%" },
    hAxis: {
      title: "Escalas",
      minValue: 0,
      textStyle: { color: getCssVar("--text") },
      titleTextStyle: { color: getCssVar("--text") },
    },
    vAxis: {
      title: "Total de Funcionarios",
      textStyle: { color: getCssVar("--text") },
      titleTextStyle: { color: getCssVar("--text") },
    },
    legend: { textStyle: { color: getCssVar("--text") } },
  };

  if (data.length === 0) return null; // evita renderizar antes

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

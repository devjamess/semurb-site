import { Chart } from "react-google-charts";
const data =[
    ['Escala', 'Funcionarios', {role : 'style'}],
    ['6x1', 10, '#F4D03F'],
    ['5x2', 29, '#F4D03F'],
    ['4x3', 18, '#F4D03F'],
    ['3x4', 15, '#F4D03F'],
    ['2x5', 23, '#F4D03F'],
    ['1x6', 7, '#F4D03F'],
]
function MyChart() {
  return (
    <Chart
      // Try different chart types by changing this property with one of: LineChart, BarChart, AreaChart...
      chartType="ColumnChart"
      data={data}
      options={{
        title: 'Funcionários por Escala',
        chartArea: { width: '100%' },
        hAxis: {
          title: 'Escalas',
          minValue: 0,
        },
        vAxis: {
          title: 'Total de Funcionarios',
        },
      }}
      width="100%"
      height="300px"
      legendToggle
    />
  );
}

export default MyChart;
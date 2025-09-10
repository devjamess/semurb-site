import { Chart } from "react-google-charts";
const data =[
    ['Escala', 'Funcionarios', {role : 'style'}],
    ['6x1', 10, 'barueri-yellow'],
    ['5x2', 29, 'barueri-yellow'],
    ['4x3', 18, 'barueri-yellow'],
    ['3x4', 15, 'barueri-yellow'],
    ['2x5', 23, 'barueri-yellow'],
    ['1x6', 7, 'barueri-yellow'],
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
      height="400px"
      legendToggle
    />
  );
}

export default MyChart;
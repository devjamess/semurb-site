import { Chart } from "react-google-charts";
const data =[
    ['Escala', 'Funcionarios', {role : 'style'}],
    ['6x1', 10, 'yellow'],
    ['5x2', 29, 'yellow'],
    ['4x3', 18, 'yellow'],
    ['3x4', 15, 'yellow'],
    ['2x5', 23, 'yellow'],
    ['1x6', 7, 'yellow'],
]
function MyChart() {
  return (
    <Chart
      // Try different chart types by changing this property with one of: LineChart, BarChart, AreaChart...
      chartType="ColumnChart"
      data={data}
      legendToggle
    />
  );
}

export default MyChart;
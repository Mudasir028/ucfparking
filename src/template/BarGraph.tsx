import { useSelector } from 'react-redux'
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Cell
} from 'recharts'
import { ChartCard } from '../chart/ChartCard'

const colors = [
  '#3694da',
  '#0d9252',
  '#556d8c',
  '#674ea7',
  '#dc1010',
  '#b7950c',
  '#433737'
]

const BarGraph = () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const state = useSelector((state: any) => state.chart)
  // console.log("state", state)

  return (
    <ChartCard title="Current Spaces Available">
      <BarChart
        data={state.barChartData}
        barCategoryGap="5%"
        margin={{
          top: 0,
          right: 28,
          left: 25,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <CartesianGrid stroke="#E5E7EB" strokeDasharray="15" vertical={false} />
        <Tooltip cursor={{ fill: 'rgb(156, 163, 175, 0.2)' }} />
        {/* <Bar dataKey="spaces" name="Page View" fill="#667EEA" fillOpacity={0.6}> */}
        <Bar dataKey="spaces" name="Available Spaces" fill="#667EEA">
          {state.barChartData.map((_entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % 7]} />
          ))}
        </Bar>
      </BarChart>
    </ChartCard>
  )
}

export { BarGraph }

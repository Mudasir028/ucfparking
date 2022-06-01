import { useSelector } from 'react-redux'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'

import { ChartCard } from '../chart/ChartCard'

const LineGraph = () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const state = useSelector((state: any) => state.chart);
  return (
    <ChartCard title="Parking Data">
      <AreaChart
        data={state.lineChartData}
        margin={{
          top: 0,
          right: 28,
          left: 0,
          bottom: 0
        }}
      >
        <XAxis dataKey="time" tickLine={false} axisLine={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          ticks={[0, 500, 1000, 1500, 2000]}
        />
        <CartesianGrid stroke="#E5E7EB" strokeDasharray="15" vertical={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="A"
          name="Garage A Available Spaces"
          strokeWidth={5}
          stroke="#3694da"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="B"
          name="Garage B Available Spaces"
          strokeWidth={5}
          stroke="#0d9252"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="C"
          name="Garage C Available Spaces"
          strokeWidth={5}
          stroke="#556d8c"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="D"
          name="Garage D Available Spaces"
          strokeWidth={5}
          stroke="#674ea7"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="H"
          name="Garage H Available Spaces"
          strokeWidth={5}
          stroke="#dc1010"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="I"
          name="Garage I Available Spaces"
          strokeWidth={5}
          stroke="#b7950c"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="Libra"
          name="Garage Libra Available Spaces"
          strokeWidth={5}
          stroke="#433737"
          fillOpacity={0}
        />
      </AreaChart>
    </ChartCard>
  )
}

export { LineGraph }

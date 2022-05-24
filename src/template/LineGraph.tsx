import { useSelector } from "react-redux";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area
} from "recharts";

import { ChartCard } from "../chart/ChartCard";

// import { Welcome } from '../types';
// import moment from 'moment'

// interface Props {
//   graphData: Welcome
// }

const LineGraph = () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const state = useSelector((state: any) => state.chart);
  console.log("state", state.lineChartData);

  //   const data = [];
  // const lineData = [];

  // graphData.forEach((timeSpecificData) => {
  //   const { date_and_time, garages } = timeSpecificData;
  //   // console.log("moment", moment(date_and_time).format("hh:mm"))
  //   // console.log("moment", moment(date_and_time))
  //   // const lineHourlyData = { time: date_and_time.substr(11, 5), spaces: 0 };
  //   const lineHourlyData = { time: date_and_time.substr(11, 5) };

  //   for (let garageName in garages) {
  //     const index = data.findIndex((d) => d.name === garageName);
  //     // lineHourlyData.spaces += garages[garageName].spaces_left;
  //     lineHourlyData[garageName] = garages[garageName].spaces_left;
  //     // console.log("lineHourlyData", lineHourlyData)

  //     // if (index !== -1) {
  //     //   // Update existing garage object
  //     //   data[index].max_spaces += garages[garageName].max_spaces;
  //     //   data[index].spaces_filled += garages[garageName].spaces_filled;
  //     //   data[index].spaces_left += garages[garageName].spaces_left;
  //     // } else {
  //     //   // Create garage object
  //     //   data.push({
  //     //     name: garageName,
  //     //     max_spaces: garages[garageName].max_spaces,
  //     //     spaces_filled: garages[garageName].spaces_filled,
  //     //     spaces_left: garages[garageName].spaces_left,
  //     //   });
  //     // }
  //   }
  //   lineData.push(lineHourlyData);
  // });

  // console.log("");
  // console.log("data");
  // console.log(data);
  // console.log(lineData);

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
          name="Available Spaces"
          strokeWidth={5}
          stroke="#3694da"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="B"
          name="Available Spaces"
          strokeWidth={5}
          stroke="#0d9252"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="C"
          name="Available Spaces"
          strokeWidth={5}
          stroke="#556d8c"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="D"
          name="Available Spaces"
          strokeWidth={5}
          stroke="#674ea7"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="H"
          name="Available Spaces"
          strokeWidth={5}
          stroke="#dc1010"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="I"
          name="Available Spaces"
          strokeWidth={5}
          stroke="#b7950c"
          fillOpacity={0}
        />
        <Area
          type="monotone"
          dataKey="Libra"
          name="Available Spaces"
          strokeWidth={5}
          stroke="#433737"
          fillOpacity={0}
        />
      </AreaChart>
    </ChartCard>
  );
};

export { LineGraph };

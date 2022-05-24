import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { BarGraph } from "./BarGraph";
import { LineGraph } from "./LineGraph";
import { PieGraph } from "./PieGraph";
// import { FiltersGraph } from "./FiltersGraph";
// import { Welcome } from '../types';
// import {
//   // getTodayData,
//   getLastDayData,
//   getBarChartData,
//   getPieChartData } from '../redux/action-creators';

// interface Props {
//   graphData: Welcome
// }
const Charts = () => {
  // const state = useSelector((state: any) => state.chart)

  // console.log("ststtstst", state)
  const dispatch = useDispatch();

  const {
    // getTodayData
    getLastDayData,
    getBarChartData,
    getPieChartData
  } = bindActionCreators(actionCreators, dispatch);

  function callEveryHour() {
    // get the mins of the current time
    const mins = new Date().getMinutes();
    console.log("minnnn", mins);
    if (mins === 0o0) {
      getLastDayData();
      getBarChartData();
      getPieChartData();
    }
    console.log(`Tick ${mins}`);
  }

  useEffect(() => {
    // dispatch(getTodayData())
    getLastDayData();
    getBarChartData();
    getPieChartData();
    setInterval(callEveryHour, 1000);
  }, []);
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* <div className='col-span-12'>
        <FiltersGraph />
      </div> */}
      <div className="col-span-12">
        <LineGraph />
      </div>
      <div className="col-span-12 lg:col-span-8">
        <BarGraph />
      </div>
      <div className="col-span-12 lg:col-span-4">
        <PieGraph />
      </div>
    </div>
  );
};

export { Charts };

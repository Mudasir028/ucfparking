import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";

const FiltersGraph = () => {
  const dispatch = useDispatch();

  const {
    // getTodayData
    getLastDayData,
    getLastWeekData,
    getLastMonthData,
    getLastYearData
    // handelAllData,
  } = bindActionCreators(actionCreators, dispatch);
  return (
    <div className="stats-card flex items-center border border-gray-200 bg-white rounded-md p-4">
      {/* <button className='m-4 p-2 btn btn-primary border ' onClick={() => getTodayData()}>
      Today
    </button> */}
      <button
        className="m-4 p-2 btn btn-primary border "
        onClick={() => getLastDayData()}
      >
        Last Day
      </button>
      <button
        className="m-4 p-2 btn btn-primary border "
        onClick={() => getLastWeekData()}
      >
        Last Week
      </button>
      <button
        className="m-4 p-2 btn btn-primary border "
        onClick={() => getLastMonthData()}
      >
        Last Month
      </button>
      <button
        className="m-4 p-2 btn btn-primary border "
        onClick={() => getLastYearData()}
      >
        Last Year
      </button>
      {/* <button className='m-4 p-2 btn btn-primary border ' onClick={() => handelAllData()}>
      All Data
    </button> */}
    </div>
  );
};

export { FiltersGraph };

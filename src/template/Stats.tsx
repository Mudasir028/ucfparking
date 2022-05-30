/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { useSelector } from 'react-redux'
import { StatsCard } from '../stats/StatsCard'
import momentTZ from 'moment-timezone'
import moment from 'moment'
import {  useState } from 'react'

const Stats = () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const state = useSelector((state: any) => state)
  const [updatedtime, setUpdatedTime] = useState('00:02:01')

  // useEffect(async() => {
  //   const res = await fetch("http://worldtimeapi.org/api/timezone/Etc/UTC");

  // }, [])
  

  const { parking, chart } = state
  const { barChartData } = chart
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { total_data_rows, last_date_and_time } = parking
  let spaces: number = 0

  for (const space in barChartData) {
    spaces += barChartData[space].spaces
  }

  let date = new Date()
  let prevHour = moment(date).subtract(1, 'hour')

  let prevUpdate = `${momentTZ(prevHour).tz('Est').format('ha')}`
  console.log(prevUpdate)

  const convertServerToTimeZone = (utcTime: any) => {
    const estTime = moment
      .utc(utcTime)
      .tz('America/New_York')
      .format('YYYY-MM-DD HH:mm:ss')

    let hour = new Date(estTime).getHours()
    // console.log("estTime")
    // console.log(estTime)
    let nextPrediction = ''

    if (hour > 0 && hour <= 6) {
      nextPrediction = '06:01:00'
    } else if (hour > 6 && hour <= 12) {
      nextPrediction = '12:01:00'
    } else if (hour > 12 && hour <= 18) {
      nextPrediction = '18:01:00'
    } else if (hour > 18) {
      nextPrediction = '00:01:00'
    }
    return nextPrediction
  }

  //agr last data update ak hour phlay ka ho ga then ya work kray ga. or user ka current time b thek hona chahia.

  function nextDataUpdate(utcTime: string) {
  

    // const lastUpdatedTime = '2022-05-29 10:01:00';
    // console.log('utcTime', utcTime);
    
    // console.log(new Date())
    // console.log((new Date).toUTCString());

    const lastUpdatedTimeString = utcTime + 'Z';
    var date = new Date(); 
   var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    console.log("now_utc")
    console.log(now_utc)
    
    // const currentTimeString = (new Date).toUTCString();
    // const currentTimeString = (new Date).toISOString();
    // const currentTimeString = (new Date()); // current zone time
    // http://worldtimeapi.org/api/timezone/Etc/UTC


    // const currentTimeString = '2022-05-29 10:59:00'; // Bug
    // const currentTimeString = '2022-05-29 10:59:10';
    // const currentTimeString = '2022-05-29 10:59:59';
    // const currentTimeString = '2022-05-29 11:00:00'; // Bug
    // const currentTimeString = '2022-05-29 11:00:50';
    // const currentTimeString = '2022-05-29 11:01:00'; // Bug

    // START
    // const nextDeployment = new Date((new Date(lastUpdatedTimeString)).valueOf() + (60*60*1000));
    // const currentTimeObj = new Date(currentTimeString);
    // const milliSeconds = nextDeployment.valueOf() - currentTimeObj.valueOf();
    const lastUpdatedMilliSeconds = (new Date(lastUpdatedTimeString)).getTime() + (60*1000);
    const nextDeploymentMilliSeconds = lastUpdatedMilliSeconds + (60*60*1000);
    const currentTimeMilliSeconds = (new Date()).getTime();
    console.log('currentTimeMilliSeconds')
    console.log(currentTimeMilliSeconds)
    const milliSeconds = nextDeploymentMilliSeconds - currentTimeMilliSeconds;

    const seconds = Math.floor(milliSeconds / 1000);
    
    let MM:any = Math.floor(seconds / 60);
    let SS:any = seconds - MM * 60;
    // END

    // let nowDateAndTime = new Date(currentTimeString)
    // nowDateAndTime = new Date(nowDateAndTime.valueOf() - (60*1000));
    // // let MM = nowDateAndTime.getMinutes()
    // // let SS = nowDateAndTime.getSeconds()
    // let MM:any = 60 - nowDateAndTime.getMinutes()
    // let SS:any = 60 - nowDateAndTime.getSeconds()

    // if (SS !== 0) MM--;

    MM = MM < 10 ? `0${MM}` : MM;
    SS = SS < 10 ? `0${SS}` : SS;

    // var target = `${HH}:${MM}:${SS} `
    var target = `00:${MM}:${SS}`;

    // console.log(currentTimeString, target);
    // console.log(currentTimeString);
    // console.log(currentTimeObj);

    setUpdatedTime(target)
    return target
  }
  setInterval(nextDataUpdate, 1000, last_date_and_time)
  // setInterval(nextDataUpdate, 1000, '2022-05-30 04:00:00');

 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatsCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        }
        text="Available Spaces"
      >
        {spaces}
      </StatsCard>
      <StatsCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        }
        text="Rows of Parking Data"
      >
        {total_data_rows}
      </StatsCard>
      <StatsCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        text="Next Data Update"
      >
        {updatedtime}
      </StatsCard>
      <StatsCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        text="Next Prediction Update"
      >
        {convertServerToTimeZone(last_date_and_time)}
      </StatsCard>
    </div>
  )
}
export { Stats }

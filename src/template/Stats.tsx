/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { useSelector } from 'react-redux'
import { StatsCard } from '../stats/StatsCard'
import momentTZ from 'moment-timezone'
import moment from 'moment'
import { useState } from 'react'

const Stats = () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const state = useSelector((state: any) => state)
  const [updatedtime, setUpdatedTime] = useState('00:02:01')

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

  function nextDataUpdate(utcTime: string) {
    const estTime = moment
      .utc(utcTime)
      .tz('America/New_York')
      .format('YYYY-MM-DD HH:mm:ss')

    let HH = new Date(estTime).getHours()
    const nowDateAndTime = new Date()
    let MM = nowDateAndTime.getMinutes()
    let SS = nowDateAndTime.getSeconds()

    var target = `${HH}:${MM}:${SS} `

    setUpdatedTime(target)
    return target
  }
  setInterval(nextDataUpdate, 10, last_date_and_time)

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

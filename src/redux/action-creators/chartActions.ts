/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */
import moment from 'moment'

export const handelChartData = (data: any, type: string) => {
  let chartData: any[] = []
  let timebaseLineData: any = {}

  data.forEach((chart: any) => {
    const { date_and_time, garages } = chart
    if (type === 'lastday') {
      // if (type === "today" || type === "lastday") {
      // timebaseLineData = date_and_time
      timebaseLineData = {
        time: moment.utc(date_and_time).tz('America/New_York').format('ha')
      }
    } else {
      timebaseLineData = { time: moment(date_and_time).format('DD/MM') }
    }

    for (let garageName in garages) {
      // const index = data.findIndex((d) => d.name === garageName);
      timebaseLineData[garageName] = garages[garageName].spaces_left
    }

    chartData.push(timebaseLineData)
  })
  chartData.reverse()
  // console.log('chartData')
  // console.log(chartData)

  return chartData
}
export const handleBarChart = (data: any, type: string) => {
  const barChartData = []
  let garages = {}

  for (const garageName in data) {
    if (type === 'barchart') {
      garages = {
        name: `Garage ${garageName}`,
        spaces: data[garageName].spaces_left
      }
    } else {
      garages = {
        name: `Garage ${garageName}`,
        value: data[garageName].spaces_left
      }
    }
    barChartData.push(garages)
  }
  return barChartData
}

const getUniquArray = (data: any) => {
  const arr = []
  let uniqArr: any = []
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < data.length; index++) {
    const date = moment(data[index].date_and_time).format('DD MM')
    arr.push(date)
    uniqArr = arr.filter(function (x, i, a) {
      return a.indexOf(x) === i
    })
  }

  return uniqArr
}

const sumArray = (data: any) => {
  // let space;
  let weeklyData: any = {}
  const grgs: any[] = []
  data.forEach((item: any) => {
    const { date, garages } = item
    // let arr = []
    weeklyData = { time: `${moment(date).format('DD/MM')}` }
    for (const garage in garages) {
      for (const grageName in garages[garage]) {
        weeklyData[grageName] = garages[garage][grageName].spaces_left
      }
    }
    grgs.push(weeklyData)
  })
  return grgs
}
export const filterByWeek = (data: any) => {
  const chartData = []
  let obj = {}

  const days = getUniquArray(data)

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < days.length; i++) {
    const res = data.filter(
      (item: any) => moment(item.date_and_time).format('DD MM') === days[i]
    )

    const garages = res.map((item: any) => item.garages)

    obj = { date: res[0].date_and_time, garages: { ...garages } }
    chartData.push(obj)
  }
  const space_left = sumArray(chartData)
  space_left.reverse()
  return space_left
}

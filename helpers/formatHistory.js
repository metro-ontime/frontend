import { lines, linesByName } from './LineInfo.js';


const dateToString = (diff) => {
  let d = new Date();
  d.setDate(d.getDate() - diff);
  
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();

  return [month,day].join('/');
}

const deriveLine = (data, line, allLineData) => {
    if (line === "All Lines") {
      return allLineData;
    } else {
      const lineNum = linesByName[line].id;
      return data.map(datum => datum[`${lineNum}_lametro-rail`]);
    }
}

const deriveXAxis = (data, axisLabel) => {
  switch(axisLabel) {
    case "Weekday Average":
      let weekDayArr = [[],[],[],[],[],[],[]]
      for (let item of data) {
        weekDayArr[new Date(item.date).getDay()].push(item);
      }
      const formattedWeekDayArr = weekDayArr.map(item => getAverageStats(item));
      return formattedWeekDayArr;
    case "Last 30 Days":
      const lastThirtyArr = data.slice(data.length-30, data.length);
      const formattedLastThirtyArr = lastThirtyArr.map(currItem => ({
        wait: currItem.mean_time_between / 60,
        oneMin: currItem.ontime["1_min"] / currItem.total_arrivals_analyzed * 100,
        fiveMin: currItem.ontime["5_min"] / currItem.total_arrivals_analyzed * 100,
      }))
      return formattedLastThirtyArr;
    case "Weekly Average":
      const weeklyArr = [];
      let d = new Date(data[0].date);
      d.setDate(d.getDate() + 1);
      let firstNum = d.getDay();
      let firstArrLength = 7 - firstNum;
      weeklyArr.push(data.slice(0, firstArrLength));
      for (let i = firstArrLength; i < data.length; i+=7) {
        weeklyArr.push(data.slice(i, i+7));
      }
      const formattedWeeklyArr = weeklyArr.map(item => getAverageStats(item))
      return formattedWeeklyArr;
    case "All Daily Data":
      const dailyArr = data.map(currItem => ({
        wait: currItem.mean_time_between / 60,
        oneMin: currItem.ontime["1_min"] / currItem.total_arrivals_analyzed * 100,
        fiveMin: currItem.ontime["5_min"] / currItem.total_arrivals_analyzed * 100,
      }))
      return dailyArr;
    default:
       return data;
  }
}

const getAverageStats = (arr) => {
  const wait = arr.reduce((acc, currItem) => acc + currItem.mean_time_between, 0) / arr.length / 60;
  const oneMin = arr.reduce((acc, currItem) => acc + currItem.ontime["1_min"] / currItem.total_arrivals_analyzed, 0) / arr.length * 100;
  const fiveMin = arr.reduce((acc, currItem) => acc + currItem.ontime["5_min"] / currItem.total_arrivals_analyzed, 0) / arr.length * 100;
  return {
    wait,
    oneMin,
    fiveMin
  }
}

const deriveYAxis = (data, axisLabel) => {
  switch(axisLabel) {
    case "Average Wait Time":
      return data.map((item, i) => {
        return item.wait;
      });
    case "% Within 1 Minute":
      return data.map((item, i) => {
        return item.oneMin;        
      });
    case "% Within 5 Minutes":
    return data.map((item, i) => {
        return item.fiveMin;
      });
    default:
       return data;
  }
}

const prepareTableData = (data) => {
    return data.slice(0,data.length).reverse().map((item,i) => Object.assign(item,{ id: i }))
}

export { dateToString, deriveLine, deriveXAxis, deriveYAxis, prepareTableData };

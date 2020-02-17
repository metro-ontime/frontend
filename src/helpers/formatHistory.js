import { linesByName } from './LineInfo';


const dateToString = (diff) => {
  const d = new Date();
  d.setDate(d.getDate() - diff);

  const month = `${d.getMonth() + 1}`;
  const day = `${d.getDate()}`;

  return [month, day].join('/');
};

const getAverageStats = (arr) => {
  const wait = arr.reduce((acc, currItem) => acc + currItem.mean_time_between, 0) / arr.length / 60;
  const oneMin = arr.reduce((acc, currItem) => acc + currItem.ontime['1_min'] / currItem.total_arrivals_analyzed, 0) / arr.length * 100;
  const fiveMin = arr.reduce((acc, currItem) => acc + currItem.ontime['5_min'] / currItem.total_arrivals_analyzed, 0) / arr.length * 100;
  return {
    wait,
    oneMin,
    fiveMin,
  };
};

const deriveLine = (data, line, allLineData) => {
  if (line === 'All Lines') {
    return allLineData;
  }
  const lineNum = linesByName[line].id;
  return data.map(datum => datum[`${lineNum}_lametro-rail`]);
};

const organizeByWeekday = (data) => {
  const weekDayArr = [[], [], [], [], [], [], []];
  data.map((item) => {
    weekDayArr[new Date(item.date).getDay()].push(item);
    return null;
  });
  return weekDayArr.map(item => getAverageStats(item));
};

const organizeByLast30Days = (data) => {
  const lastThirtyArr = data.slice(data.length - 30, data.length);
  return lastThirtyArr.map(currItem => ({
    wait: currItem.mean_time_between / 60,
    oneMin: currItem.ontime['1_min'] / currItem.total_arrivals_analyzed * 100,
    fiveMin: currItem.ontime['5_min'] / currItem.total_arrivals_analyzed * 100,
  }));
};

const organizeByWeeklyAverage = (data) => {
  const weeklyArr = [];
  const d = new Date(data[0].date);
  d.setDate(d.getDate() + 1);
  const firstNum = d.getDay();
  const firstArrLength = 7 - firstNum;
  weeklyArr.push(data.slice(0, firstArrLength));
  for (let i = firstArrLength; i < data.length; i += 7) {
    weeklyArr.push(data.slice(i, i + 7));
  }
  return weeklyArr.map(item => getAverageStats(item));
};

const organizeByDaily = data => data.map(currItem => ({
  wait: currItem.mean_time_between / 60,
  oneMin: currItem.ontime['1_min'] / currItem.total_arrivals_analyzed * 100,
  fiveMin: currItem.ontime['5_min'] / currItem.total_arrivals_analyzed * 100,
}));

const deriveXAxis = (data, axisLabel) => {
  switch (axisLabel) {
    case 'Weekday Average':
      return organizeByWeekday(data);
    case 'Last 30 Days':
      return organizeByLast30Days(data);
    case 'Weekly Average':
      return organizeByWeeklyAverage(data);
    case 'All Daily Data':
      return organizeByDaily(data);
    default:
      return data;
  }
};

const deriveYAxis = (data, axisLabel) => {
  switch (axisLabel) {
    case 'Average Wait Time':
      return data.map(item => item.wait);
    case '% Within 1 Minute':
      return data.map(item => item.oneMin);
    case '% Within 5 Minutes':
      return data.map(item => item.fiveMin);
    default:
      return data;
  }
};

const prepareTableData = data => data.slice(0, data.length).reverse().map(
  (item, i) => Object.assign(item, { id: i, })
);

export {
  dateToString, deriveLine, deriveXAxis, deriveYAxis, prepareTableData,
};

import DataFrame from 'dataframe-js';
import stopPositions from './StopPositions.js';
import moment from 'moment-timezone';


const collectObservedTrip = (trip) => {
  const theTrip = trip.group
    .toCollection()
    .map(row => {
      return (
        {
          x: row.relative_position, 
          y: new Date(row.datetime).getTime(),
          name: null
        }
      )
    });
  return { data: theTrip, color: '#f00', enableMouseTracking: false };
};


const prepareObservations = (url, updateFunction) => {
  DataFrame.fromCSV(url).then((df) => {
    df = df.cast('relative_position', Number);
    df = df.cast('direction_id', Number);
    let direction0 = df.where(row => row.get('direction_id') == 0);
    let direction1 = df.where(row => row.get('direction_id') == 1);

    direction0 = direction0.groupBy('trip_id').toCollection();
    direction1 = direction1.groupBy('trip_id').toCollection();

    const trips0 = direction0.map(collectObservedTrip);
    const trips1 = direction1.map(collectObservedTrip);
    updateFunction(trips0, trips1);
  });
};

const getStations = (line) => {
  DataFrame.fromCSV(``)
}

const prepareSchedule = (url, line, updateFunction) => {
  DataFrame.fromCSV(url).then((df) => {
    df = df.cast('stop_id', String);
    df = df.cast('direction_id', Number);
    df = df.map(row => row.set('ts', new Date(row.get('datetime')).getTime()));
    const minTime = df.stat.min('ts');
    const maxTime = df.stat.max('ts');

    let direction0 = df.where(row => row.get('direction_id') == 0);
    let direction1 = df.where(row => row.get('direction_id') == 1);

    const stops0 = stopPositions[`${line}_0`];
    const stops1 = stopPositions[`${line}_1`];

    const collectScheduleTrip0 = (trip) => {
      const theTrip = trip.group
        .toCollection()
        .map(row => {
          return (
            {
              // This conditional exists because of an upstream bug,
              // sometimes stops on other lines end up in the CSV
              x: stops0[row.stop_id] ? stops0[row.stop_id]["relative_position"] : 0,
              y: new Date(row.datetime).getTime(),
              name: stops0[row.stop_id] ? stops0[row.stop_id]["stop_name"] : "Error"
            }
          )
        });
      return { data: theTrip, color: '#aaaaaa' };
    };
    const collectScheduleTrip1 = (trip) => {
      const theTrip = trip.group
        .toCollection()
        .map(row => {
          return (
            {
              // This conditional exists because of an upstream bug,
              // sometimes stops on other lines end up in the CSV
              x: stops1[row.stop_id] ? stops1[row.stop_id]["relative_position"] : 0,
              y: new Date(row.datetime).getTime(),
              name: stops1[row.stop_id] ? stops1[row.stop_id]["stop_name"] : "Error"
            }
          )
        });
      return { data: theTrip, color: '#aaaaaa' };
    };

    direction0 = direction0.groupBy('trip_id').toCollection();
    direction1 = direction1.groupBy('trip_id').toCollection();

    const trips0 = direction0.map(collectScheduleTrip0);
    const trips1 = direction1.map(collectScheduleTrip1);
    updateFunction(trips0, trips1, minTime, maxTime);
  });
};

const prepareHistoryData = (data) => {
    return data.slice(0,data.length).reverse().map((item,i) => Object.assign(item,{ id: i }))
}

const prepareNetworkData = data => {
  const dataObjects = Object.keys(data).map((key) => {
    return data[key]
  });
  const windows = Array.from({length: 5}, (k, n) => n + 1);

  let totalsOntime = windows.map(windowSize => {
    const totalOntimeForWindow = dataObjects.reduce((acc, currentValue) => {
      return currentValue["ontime"][`${windowSize}_min`] + acc
    }, dataObjects[0]["ontime"][`${windowSize}_min`]);
    return { window: windowSize, n: totalOntimeForWindow }
  });

  totalsOntime = totalsOntime.reduce((map, obj) => {
    map[`${obj.window}_min`] = obj.n;
    return map
  }, {});

  const totalArrivals = dataObjects.reduce((acc, currentValue) => {
    return currentValue["total_arrivals_analyzed"] + acc
  }, dataObjects[0]["total_arrivals_analyzed"]);

  const totalScheduled = dataObjects.reduce((acc, currentValue) => {
    return currentValue["total_scheduled_arrivals"] + acc
  }, dataObjects[0]["total_scheduled_arrivals"]);

  const sumMeanTimeBetween = dataObjects.reduce((acc, currentValue) => {
    return currentValue["mean_time_between"] + acc
  }, dataObjects[0]["mean_time_between"]);
  const overallMeanTimeBetween = sumMeanTimeBetween / dataObjects.length;

  const timestamp = dataObjects[0]["timestamp"];

  const overallData = {
    ontime: totalsOntime,
    total_arrivals_analyzed: totalArrivals,
    total_scheduled_arrivals: totalScheduled,
    mean_time_between: overallMeanTimeBetween,
    timestamp: timestamp
  };
  return overallData;
};

export { prepareObservations, prepareSchedule, prepareHistoryData, prepareNetworkData };

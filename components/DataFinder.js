import S3 from 'aws-sdk/clients/s3';
const s3 = new S3();

const getAllObjects = (type, line, callback) => {
  const params = {Bucket: 'h4la-metro-performance', Prefix: `data/${type}/${line}_lametro-rail`};
  s3.makeUnauthenticatedRequest('listObjects', params, function (err, data) {
    if (err) console.log(err);
    else {
      const objects = data.Contents.map(file => file.Key).sort();
      callback(objects);
    };
  });
};

const getMostRecentObjects = (type, line, callback) => {
  getAllObjects(type, line, (objects) => {
    const mostRecent = objects[objects.length - 1];
    const params = {Bucket: 'h4la-metro-performance', Key: mostRecent};
    s3.makeUnauthenticatedRequest('getObject', params, function (err, data) {
      if (err) console.log(err);
      else {
        callback(data.Body.toString());
      };
    });
  })
};

const getMostRecentSummary = (line, callback) => {
  getMostRecentObjects('summaries', line, (data) => {
    callback(JSON.parse(data));
  });
};

const getMostRecentSchedulePath = (line, callback) => {
  getAllObjects('schedule', line, (objects) => {
    const mostRecent = objects[objects.length - 1];
    callback(mostRecent);
  });
};

const getMostRecentVehiclesPath = (line, callback) => {
  getAllObjects('vehicle_tracking/processed', line, (objects) => {
    const mostRecent = objects[objects.length - 1];
    callback(mostRecent);
  });
};

export { getMostRecentSummary, getMostRecentSchedulePath, getMostRecentVehiclesPath };

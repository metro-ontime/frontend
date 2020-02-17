import S3 from 'aws-sdk/clients/s3';

const s3 = new S3();

const whenListAllObjects = params => new Promise((resolve) => {
  s3.makeUnauthenticatedRequest('listObjects', params, (err, data) => {
    if (err) console.log(err);
    else {
      const objects = data.Contents.map(file => file.Key).sort();
      resolve(objects);
    }
  });
});

const whenGotS3Object = params => new Promise((resolve) => {
  s3.makeUnauthenticatedRequest('getObject', params, (err, data) => {
    if (err) console.log(err);
    else {
      resolve(JSON.parse(data.Body.toString()));
    }
  });
});

export { whenGotS3Object, whenListAllObjects };

import React from 'react';
import DataLoader from './DataLoader';

const TrainDetails = () => (
  <div>
    <p>METRO LINE</p>
    <div className="content">
      <h2 className="subtitle">Logged Trains compared to the Schedule</h2>
      <p>
        This diagram shows 3 hours of trains running northbound on the Gold line
        between 6am & 9am on October 30, 2018.
        <br />
        Light grey lines show the schedule, while blue lines are the actual
        paths trains took during that time period,
        <br />
        at least according to vehicle position data logged once per minute from
        NextBus.
      </p>
    </div>

    <div className="diagram">
      <DataLoader />
    </div>

    <style jsx>
      {`
        .subtitle {
          display: block;
          font-weight: 200;
          font-family: 'Raleway', sans-serif;
        }
        .content {
          font-family: 'Raleway', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 100%;
          font-size: 0.75em;
          padding: 10px;
        }
      `}
    </style>
  </div>
);

export default TrainDetails;

import React from 'react';
import { Typography } from '@material-ui/core';
import DataLoader from './components/DataLoader';

const TrainDetails = () => (
  <div>
    <div>
      <Typography variant="h4">Marey Diagrams</Typography>
      <Typography variant="body1">
        These diagrams show observed train positions directly compared to scheduled train positions.
      </Typography>
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

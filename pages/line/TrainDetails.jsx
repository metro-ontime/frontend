import React from 'react';
import { Typography } from '@material-ui/core';
import Highchart from '../../components/charts/Highchart';
import DataParser from '../../components/DataParser';

const TrainDetails = () => (
  <div>
    <div>
      <Typography variant="h4">Marey Diagrams</Typography>
      <Typography variant="body1">
        These diagrams show observed train positions directly compared to scheduled train positions.
      </Typography>
    </div>

    <div className="diagram">
      <DataParser />
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

import Head from 'next/head';
import React from 'react';
import DataLoader from '../components/DataLoader';

const Index = () => (
  <div>
    <Head>
      <title>Metro OnTime</title>
      <link rel="icon" type="image/x-icon" href="static/favicon.ico" />
    </Head>
    <div className="logo_header">
      <img className="logo" src="static/images/mot-logo.svg" alt="" />
      <h1 className="logo_title">LA Metro - Performance Monitor</h1>
    </div>
    <h2 className="subtitle">Logged Trains compared to the Schedule</h2>
    <p>
      This diagram shows 3 hours of trains running northbound
      on the Gold line between 6am & 9am on October 30, 2018.
      <br />
      Light grey lines show the schedule, while blue lines are the actual
      paths trains took during that time period,
      <br />
      at least according to vehicle position data logged once per minute from NextBus.
    </p>
    <DataLoader />
    <style jsx>
      {`
        .logo_header {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .logo_title {
          display: inline;
          font-weight: 200;
        }
        .logo {
          display: inline;
          width: 75px;
          padding: 10px;
        }  
        .subtitle {
          display: block;
          font-weight: 200;
        }
      `}
    </style>
  </div>
);

export default Index;

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import DataLoader from '../components/DataLoader';
import MenuBar from '../components/MenuBar';
import TrainList from '../components/TrainList';

const Index = () => (
  <div>
    <Head>
      <title>Metro OnTime</title>
      <link rel="icon" type="image/x-icon" href="static/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500"
        rel="stylesheet"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        {`
          html {
            margin: 0;
            padding: 0;
            width: 100%;
            max-width: 100%;
            font-size: 20px;
          }
          body {
            padding: 0;
            margin: 0;
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
          }
        `}
      </style>
    </Head>
    <MenuBar />
    <TrainList />
    <div className="content">
      <h2 className="subtitle">Logged Trains compared to the Schedule</h2>
      <p>
        This diagram shows 3 hours of trains running northbound on the Gold line between 6am & 9am
        on October 30, 2018.
        <br />
        Light grey lines show the schedule, while blue lines are the actual paths trains took during
        that time period,
        <br />
        at least according to vehicle position data logged once per minute from NextBus.
      </p>
      <p>
        <Link href="/train/0">
          <div>Go to Train Detail for Train 0</div>
        </Link>
      </p>
      <div className="diagram">
        <DataLoader />
      </div>
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

export default Index;

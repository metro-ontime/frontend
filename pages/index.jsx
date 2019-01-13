import React from 'react';
import Head from 'next/head';
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
  </div>
);

export default Index;

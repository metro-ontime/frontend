import Head from 'next/head';
import Marey from '../components/charts/Marey';
import { Fetch } from 'react-request';
import axios from 'axios';
import DataLoader from '../components/DataLoader';

const dataFile = [
  [0.05, 0.07, 0.1, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
  [0.02, 0.021, 0.03, 0.033, 0.05, 0.06, 0.2, 0.5, 0.7, 0.75, 0.77, 0.8]
];

const schedule = [
  [
    {datetime: '2018-10-30 06:00:35', relative_position: '0.43'},
    {datetime: '2018-10-30 06:02:38', relative_position: '0.63'},
    {datetime: '2018-10-30 06:06:15', relative_position: '0.83'},
    {datetime: '2018-10-30 06:08:35', relative_position: '0.93'},
  ],
  [
    {datetime: '2018-10-30 06:03:35', relative_position: '0.32'},
    {datetime: '2018-10-30 06:07:38', relative_position: '0.64'},
    {datetime: '2018-10-30 06:09:15', relative_position: '0.69'},
    {datetime: '2018-10-30 06:10:35', relative_position: '0.83'},
  ]
];

const Index = () => (
  <div>
    <Head>
      <title>Metro OnTime</title>
      <link rel="icon" type="image/x-icon" href="static/favicon.ico" />
    </Head>
    <div className="logo_header">
      <img className="logo" src="static/images/mot-logo.svg" alt=""/>
      <h1 className="logo_title">LA Metro - Performance Monitor</h1>
    </div>
    <h2 className="subtitle">Logged Trains compared to the Schedule</h2>
    <p>This diagram shows 3 hours of trains running northbound on the Gold line between 6am & 9am on October 30, 2018.<br/>
      Light grey lines show the schedule, while blue lines are the actual paths trains took during that time period,<br/>
      at least according to vehicle position data logged once per minute from NextBus.
    </p>
    <DataLoader />
    <style jsx>{`
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
    `}</style>
  </div>
)

export default Index

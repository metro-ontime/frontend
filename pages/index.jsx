import Head from 'next/head';
import Marey from '../components/charts/Marey';

const dataFile = [
  [0.05, 0.07, 0.1, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
  [0.02, 0.021, 0.03, 0.033, 0.05, 0.06, 0.2, 0.5, 0.7, 0.75, 0.77, 0.8]
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
    <h2 className="subtitle">Sample Marey Diagram</h2>
    <Marey data={dataFile} size={[400, 400]} />
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

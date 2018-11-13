import Head from 'next/head';

const Index = () => (
  <div>
    <Head>
      <title>Metro OnTime</title>
      <link rel="icon" type="image/x-icon" href="static/favicon.ico" />
    </Head>
    <div className="logo_header">
      <img className="logo" src="static/images/mot-logo.svg" alt=""/>
      <h1 className="logo_title">LA Metro - Performance Monitor</h1>
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
      `}</style>
    </div>
  </div>
)

export default Index

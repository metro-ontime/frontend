import React from 'react';

const MenuBar = () => (
  <div>
    <div className="logo_header">
      <img className="logo" src="static/images/mot-logo.svg" alt="" />
      <h1 className="logo_title">LA Metro Health Monitor</h1>
    </div>
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
          font-size: 1em;
          font-family: 'Raleway', sans-serif;
        }
        .logo {
          display: inline;
          width: 45px;
          padding: 10px;
        }
        @media (min-width: 700px) {
          .logo_title {
            font-size: 1.5em;
          }
        }
      `}
    </style>
  </div>
);

export default MenuBar;

import React, { Fragment } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
// import TooltipCustom from './TooltipCustom.jsx';
import { linesByName } from '../helpers/LineInfo.jsx';
import './LogoAndTitle.scss'

const LogoAndTitle = (props) => {
  const {
    classes, timestamp, line, date, altImg, width, altText,
  } = props;
  let defaultText = '';
  if (line === 'All') {
    defaultText = 'LA Metro Rail - Network Performance'
  } else {
    defaultText = `LA Metro Rail - ${line} Line Performance`;
  }
  return (
    <div className="logoAndTitle">
      <img src={linesByName[line] ? `/public/images/logo_${linesByName[line].id}.svg` : '/public/images/logo_network.svg' } />
      <div className="text">
        <h1>{ defaultText }</h1>
        <p>
          Rail performance on the selected date was last updated at
          {' '}
          {
            timestamp
              ? <Moment format="D MMMM YYYY, h:mma" tz="America/Los_Angeles">{timestamp}</Moment>
              : <span>---</span>
          }
        </p>
      </div>
  </div>
  )
};

export default LogoAndTitle;

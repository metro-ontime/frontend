import React, { Fragment } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
// import TooltipCustom from './TooltipCustom.jsx';
import { linesByName } from '../helpers/LineInfo.jsx';
import './LogoAndTitle.scss';
import logoNetwork from '~/static/images/logo_network.svg';
import logo801 from '~/static/images/logo_801.svg';
import logo802 from '~/static/images/logo_802.svg';
import logo803 from '~/static/images/logo_803.svg';
import logo804 from '~/static/images/logo_804.svg';
import logo805 from '~/static/images/logo_805.svg';
import logo806 from '~/static/images/logo_806.svg';

const logos = {
  All: logoNetwork,
  Blue: logo801,
  Red: logo802,
  Green: logo803,
  Gold: logo804,
  Purple: logo805,
  Expo: logo806
};

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
      <img src={logos[line]} />
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

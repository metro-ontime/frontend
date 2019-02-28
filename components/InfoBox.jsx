import React, { Fragment } from 'react';
import {
  Typography
} from '@material-ui/core';
import Moment from 'react-moment';
import {withStyles} from '@material-ui/core/styles';
import TooltipCustom from '~/components/TooltipCustom';

const InfoBox = (props) => {
  const timestamp = props.timestamp;
  return (
    <TooltipCustom title={(<Fragment>
        <Typography color="inherit">Update Timing</Typography>
        Latest statistics are provided roughly every 30 minutes between 5am and 10pm PST.
      </Fragment>)}>
      <Typography variant="body2">
        <b>Latest Update:
        </b>
        {
          timestamp
            ? <Moment format="D MMMM YYYY, h:mma" tz="America/Los_Angeles">{timestamp}</Moment>
            : <span>---</span>
        }
      </Typography>
    </TooltipCustom>
  )
}

export default InfoBox;

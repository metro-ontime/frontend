import React, {Component, Fragment} from 'react';
import {
  Grid,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import LogoAndTitle from '~/components/LogoAndTitle';
import InfoBox from '~/components/InfoBox';
import ScoreCard from '~/components/ScoreCard';
import SimpleScoreCard from '~/components/SimpleScoreCard';

const styles = theme => ({
});

const TrainStats = (props) => {
  const {classes} = props;
  const data = props.data;
  return (
    <Fragment>
      <Grid container="container" spacing={24} justify="space-around">
        <Grid item="item" xs={4} md={4} lg={6}>
          <LogoAndTitle line={props.line} />
        </Grid>
        <Grid item="item" xs={8} md={12}>
          <InfoBox timestamp={ data.timestamp } />
        </Grid>
        <Grid container="container" item="item" xs={12} sm={8} md={6}>
          <Grid item="item" xs={12}>
            <ScoreCard data={ data } width={ props.width } />
          </Grid>
          <Grid item="item" xs={12}>
            <SimpleScoreCard width={props.width} data={ data }/>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default flowRight([withStyles(styles), withWidth()])(TrainStats);

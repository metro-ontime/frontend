import React, {Component, Fragment} from 'react';
import {
  Grid,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import LogoAndTitle from '~/components/LogoAndTitle';
import ScoreCard from '~/components/ScoreCard';
import SimpleScoreCard from '~/components/SimpleScoreCard';
import LineSelector from '~/components/LineSelector';

const styles = theme => ({
});

const TrainStats = (props) => {
  const {classes} = props;
  const data = props.data;
  return (
    <Fragment>
      <Grid container spacing={24} justify="space-around">
        <Grid container item xs={12} md={8} justify="center" alignItems="center">
          <Grid item xs={12} md={10}>
            <LogoAndTitle line={props.line} timestamp={ data.timestamp }/>
          </Grid>
        </Grid>
        <Grid container item spacing={16} xs={12} lg={8} justify="space-between" alignItems="center">
          <Grid item xs={12} md={6}>
            <ScoreCard data={ data } width={ props.width } />
          </Grid>
          <Grid item xs={12} md={5}>
            <SimpleScoreCard width={props.width} data={ data }/>
          </Grid>
          <Grid item xs={12}>
            <LineSelector />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default flowRight([withStyles(styles), withWidth()])(TrainStats);

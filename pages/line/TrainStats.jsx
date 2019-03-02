import React, {Component, Fragment} from 'react';
import {
  Grid,
  Hidden
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import LogoAndTitle from '~/components/LogoAndTitle';
import ScoreCard from '~/components/ScoreCard';
import SimpleScoreCard from '~/components/SimpleScoreCard';
import LineSelector from '~/components/LineSelector';
import DiagramLink from '~/components/DiagramLink';

const styles = theme => ({
  spaceTop: {
    marginTop: '1em'
  }
});

const TrainStats = (props) => {
  const {classes} = props;
  const data = props.data;
  const switchTab = props.switchTab;
  return (
    <Fragment>
      <Grid container spacing={24} justify="space-around">
        <Grid container item xs={12} md={8} justify="center" alignItems="center">
          <Grid item xs={12}>
            <LogoAndTitle line={props.line} timestamp={ data.timestamp }/>
          </Grid>
        </Grid>
        <Grid container item spacing={16} xs={12} lg={8} justify="space-between" alignItems="center">
          <Grid item xs={12} md={6}>
            <ScoreCard data={ data } width={ props.width } />
          </Grid>
          <Grid container item xs={12} md={5}>
            <Grid item xs={12}>
              <SimpleScoreCard width={props.width} data={ data }/>
            </Grid>
            <Hidden smDown>
              <Grid item xs={12} className={ classes.spaceTop }>
                <DiagramLink action={ switchTab } line={ props.line }/>
              </Grid>
            </Hidden>
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

import React from 'react';
import { Typography, Grid, Toolbar, Paper, Divider } from '@material-ui/core';
import Highchart from '../../components/charts/Highchart';
import DataParser from '../../components/DataParser';
import { withStyles } from '@material-ui/core/styles';
import SimpleMenu from '../../components/SimpleMenu';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    margin: '20px 0'
  }
});

const TrainDetails = (props) => {
  const { classes } = props;
  return (
    <Grid container spacing={40}>
      <Grid item xs={12}>
        <Paper elevation={1} className={ classes.paper }>
          <Typography variant="h2">Marey Diagrams</Typography>
          <Divider className={ classes.root } />
          <Typography variant="body1" component="p">
            Grey lines depict scheduled train journeys, while colored lines show the observed paths of trains over this time frame. Therefore, colored lines above grey lines depict early trains and colored lines below grey lines depict late trains.
          </Typography>
      </Paper>
      </Grid>

      <Grid container justify="center" alignItems="center" spacing={24}>
        <Grid item xs={12}>
          <Toolbar color="primary">
            <SimpleMenu label="Select Direction" menuItems={['Azusa / APU', 'Atlantic']} />
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <DataParser />
        </Grid>
      </Grid>
    </Grid>
  )
};

export default withStyles(styles)(TrainDetails);

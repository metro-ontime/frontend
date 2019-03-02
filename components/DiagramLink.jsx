import React, {Fragment} from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import { linesById } from '~/helpers/LineInfo.js';

const styles = theme => ({
  padding: {
    padding: '0.5em'
  }
});

const DiagramLink = (props) => {
  const { classes } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" align="center" className={ classes.padding }>
          View today's Marey Diagram
        </Typography>
        <Typography variant="h5" align="center" className={ classes.padding }>
          <Button variant="outlined" onClick={ () => { props.action({}, 1) } }>
            { linesById[props.line]["name"] } Line Visualizer
          </Button>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(DiagramLink);

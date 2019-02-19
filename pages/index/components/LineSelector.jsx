import React, { Component, Fragment } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { lines } from '../../../helpers/LineInfo.js';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  buttonWrapper: {
    padding: 0,
    width: 200,
    background: 'transparent',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


class LineSelector extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    const lineButton = (line) => {
      return (
        <Button href={`/line/${line.id}`} variant="outlined" className={classes.button}>
          <div className={classes.buttonWrapper} style={{ position: 'relative' }}>
            <div
              style={{
                backgroundColor: line.color,
                width: '25px',
                padding: 0,
                height: '25px',
                margin: 0,
                borderRadius: '25px',
                float: 'left',
              }}
            />
            <div>
              <Typography component="h4">{line.name} Line</Typography>
            </div>
          </div>
        </Button>
      )
    };

    const lineButtons = () => {
      const allLines = lines.map((line) => {
        return (
            <div key={line.name}>
              { lineButton(line) }
            </div>
      )});
      return (
        <Card>
          <CardHeader title="Select a line:" />
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              { allLines }
            </div>
          </CardContent>
        </Card>
      )
    };
    return (
      <Fragment>
        { lineButtons() }
      </Fragment>
    )
  }
}


export default withStyles(styles)(LineSelector);

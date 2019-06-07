import React, { Component, Fragment } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { lines } from '~/helpers/LineInfo.js';
import Circle from '~/components/Circle';
import Link from 'next/link';

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
  title: {
    fontWeight: 200,
  },
});


const LineSelector = (props) => {
  const { classes } = props;
  const lineButton = line => (
    <Link prefetch href={{ pathname: '/line', query: { id: line.id } }} as={`/line/${line.id}`}>
      <Button variant="outlined" className={classes.button}>
        <div className={classes.buttonWrapper} style={{ position: 'relative' }}>
          <Circle color={line.color} />
          <div>
            <Typography component="h4">
              {line.name}
              {' '}
Line
            </Typography>
          </div>
        </div>
      </Button>
    </Link>
  );

  const lineButtons = () => {
    const allLines = lines.map(line => (
      <div key={line.name}>
        { lineButton(line) }
      </div>
    ));
    return (
      <Card>
        <CardContent>
          <Typography variant="body2" className={classes.title}>
            Select below to filter by line:
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            { allLines }
          </div>
        </CardContent>
      </Card>
    );
  };
  return (
    <Fragment>
      { lineButtons() }
    </Fragment>
  );
};

export default withStyles(styles)(LineSelector);

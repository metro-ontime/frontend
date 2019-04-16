import React from 'react';
import { AppBar, Button, Tab, Tabs, Grid, Typography, Card, Select, MenuItem, ListItemAvatar, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { lineLinks, linesByName } from '../helpers/LineInfo.js';

const styles = theme => ({
  card: {
    maxWidth: 1200,
    margin: 'auto',
    marginTop: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: ".5em",
    marginBottom: '-.25em',
  },
  header: {
    marginLeft: "1.6em",
    fontSize: 16,
  },
  avatar: {
    width: 16,
    height: 16,
    marginRight: ".5em"
  },
  headerContainer: {
    paddingBottom: "1em",
    display: "flex",
    alignItems: "flex-end",
    flexWrap: "wrap"
  }
});

class HistoryMenu extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { classes, line, handleLineChange, dataFormat, xAxis, handleXAxisChange, yAxis, handleYAxisChange  } = this.props;
		return (
			<Card className={classes.card}>
	          <div className={classes.headerContainer}>
	          <div>
	          <Typography className={classes.header} inline={true}>View Data for
	          </Typography>
	          <Select
	            value={line}
	            onChange={handleLineChange}
	            name="line"
	            className={classes.selectEmpty}
	          >
	            <MenuItem value={"All Lines"}>
	              <div style={{display: "flex", alignItems: "center"}}>
	              <ListItemAvatar>
	                <Avatar className={ classes.avatar }>
	                  <div
	                    style={{
	                      backgroundColor: '#dddddd',
	                      width: '100%',
	                      padding: 0,
	                      height: '100%',
	                      margin: 0,
	                      borderRadius: '50%',
	                    }}
	                  />
	                </Avatar>
	              </ListItemAvatar>
	              All Lines
	              </div>
	            </MenuItem>
	            {lineLinks(classes)}
	          </Select>
	          </div>
	          { dataFormat === "chart" ?
	          <React.Fragment>
	          <div>
	          <Typography className={classes.header} inline={true}>X-Axis:
	          </Typography>
	          <Select
	            value={xAxis}
	            onChange={handleXAxisChange}
	            name="xAxis"
	            className={classes.selectEmpty}
	          >
	            <MenuItem value={"Last 30 Days"}>Last 30 Days
	            </MenuItem>
	            <MenuItem value={"Weekday Average"}>Weekday Average
	            </MenuItem>
	          </Select>
	          </div>
	          <div>
	          <Typography className={classes.header} inline={true}>Y-Axis:
	          </Typography>
	          <Select
	            value={yAxis}
	            onChange={handleYAxisChange}
	            name="yAxis"
	            className={classes.selectEmpty}
	          >
	            <MenuItem value={"Average Wait Time"}>Average Wait Time
	            </MenuItem>
	            <MenuItem value={"% Within 1 Minute"}>% Within 1 Minute
	            </MenuItem>
	            <MenuItem value={"% Within 5 Minutes"}>% Within 5 Minutes
	            </MenuItem>
	          </Select>
	          </div>
	          </React.Fragment>
	          : ""
	          }
	        </div>
	        </Card>
		)
	}
}

export default withStyles(styles)(HistoryMenu);
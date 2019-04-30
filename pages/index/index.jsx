import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Tooltip
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import flowRight from 'lodash/flowRight';
import Layout from '~/components/Layout';
import LineSelector from '~/components/LineSelector';
import SimpleMenu from '~/components/SimpleMenu';
import { lines } from '~/helpers/LineInfo';
import { whenListAllObjects, whenGotS3Object } from '~/helpers/DataFinder';
import LogoAndTitle from '~/components/LogoAndTitle';
import ScoreCard from '~/components/ScoreCard';
import SimpleScoreCard from '~/components/SimpleScoreCard';
import FilterPanel from '~/components/FilterPanel';
import CONFIG from '~/config'

const styles = theme => ({
  cardImage: {
    width: '100%',
  },
  container: {
  },
  item: {
    height: '75%'
  }
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLine: 'All',
      arrivalWindow: '1_min',
      date: 'Today'
    };
    this.handleLineChange = this.handleLineChange.bind(this);
    this.handleArrivalWindow = this.handleArrivalWindow.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  static async getInitialProps({ query, res }) {
    const { data } = await axios.get(CONFIG.RAILSTATS_API);
    const timestamp = data.timestamp;
    return { query, data, timestamp };
  }

  handleLineChange(e) {
    const selectedLine = e.target.value;
    this.setState({ currentLine: selectedLine });
  }

  handleArrivalWindow(e) {
    const newValue = e.target.value;
    this.setState({ arrivalWindow: newValue });
  }

  handleDate(e) {
    const newValue = e.target.value;
    console.log(newValue);
    this.setState({ date: newValue });
  }

  render() {
    const { classes, data, timestamp } = this.props;
    const state = this.state;
    return (
      <Layout
        pageTitle="Network Summary"
        toolbarTitle="Network Summary"
      >
        <Grid container spacing={24} justify="space-around" className={ classes.container }>
          <Grid container item xs={12} md={8} justify="center" alignItems="center" className={ classes.container }>
            <LogoAndTitle altText="How reliable is the LA Metro Network today?" timestamp={ timestamp } altImg="/static/images/logo_network.svg"/>
          </Grid>
          <Grid container spacing={16} item xs={12} lg={8} justify="space-between" alignItems="center">
            <Grid item xs={12}>
              <FilterPanel
                line={ state.currentLine }
                handleLineChange={ this.handleLineChange }
                arrivalWindow={ state.arrivalWindow }
                handleArrivalWindow={ this.handleArrivalWindow }
                date={ state.date }
                dates={["Today", "Yesterday"]}
                handleDate={ this.handleDate }
              />
            </Grid>
            <Grid item xs={12} md={6} classes={ classes }>
              <ScoreCard data={ data } width={ this.props.width } />
            </Grid>
            <Grid item xs={12} md={5} classes={ classes }>
              <SimpleScoreCard width={this.props.width} data={ data }/>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default flowRight([withStyles(styles), withWidth()])(Index);

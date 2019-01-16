import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TrainDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        Hi Train#
        {id}
      </div>
    );
  }
}

TrainDetails.defaultProps = {
  id: 0,
};
TrainDetails.propTypes = {
  id: PropTypes.number,
};
export default TrainDetails;

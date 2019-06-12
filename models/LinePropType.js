import PropTypes from 'prop-types';

const LinePropType = PropTypes.shape({
  coverage: PropTypes.number,
  date: PropTypes.string,
  mean_secs: PropTypes.number,
  mean_time_between: PropTypes.number,
  ontime: PropTypes.object,
  std_secs: PropTypes.number,
  timestamp: PropTypes.string,
  total_arrivals_analyzed: PropTypes.number,
  total_scheduled_arrivals: PropTypes.number,
});

export default LinePropType;

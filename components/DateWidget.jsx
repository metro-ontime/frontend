import React from "react";
import PropTypes, { string, array, arrayOf } from 'prop-types';
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";

const DateWidget = (props) =>{
	const { date, dates, onChange, } = props;
  return(
	<MuiPickersUtilsProvider utils={ DateFnsUtils }>
	  <Grid container>
			<DatePicker
				margin = "normal"
				label = "Date"
				value = { date }
				onChange = { onChange }
				minDate={ dates[0] }
				maxDate={ dates[dates.length - 1]}
			/>
	  </Grid>
	</MuiPickersUtilsProvider>		
  )
}

DateWidget.propTypes = {
	date: PropTypes.string.isRequired,
	dates: arrayOf(PropTypes.string).isRequired,
	onChange: PropTypes.func.isRequired,
}

export default React.memo(DateWidget);
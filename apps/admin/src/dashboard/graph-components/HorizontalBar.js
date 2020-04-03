import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { HorizontalBar } from 'react-chartjs-2';

const useStyles = makeStyles({
    main: {
        flex: '1',
        marginRight: '1em',
        marginTop: 20,
    },
});

const HorizontalBarChart = ({ data, width, height, options }) => {

	const classes = useStyles();
	return (
		<div className={classes.main}>
			<HorizontalBar
				data={data}
				width={width}
				height={height}
				options={options}
			/>
		</div>
		)
		
}
  
export default HorizontalBarChart;
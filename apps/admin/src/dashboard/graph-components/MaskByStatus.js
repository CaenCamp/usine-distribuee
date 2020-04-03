import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { HorizontalBar } from 'react-chartjs-2';
import Chart from 'chart.js';

const useStyles = makeStyles({
    main: {
        flex: '1',
        marginRight: '1em',
        marginTop: 20,
    },
});

const MaskByStatus = ({ data, width, height }) => {

	const classes = useStyles();

	var barOptions_stacked = {
		tooltips: {
			enabled: true,
			position: 'nearest'
		},
		hover :{
			animationDuration:0
		},
		scales: {
			xAxes: [{
				ticks: {
					beginAtZero:true,
					fontFamily: "'Open Sans Bold', sans-serif",
					fontSize:11
				},
				scaleLabel:{
					display:false
				},
				gridLines: {
				}, 
				stacked: true
			}],
			yAxes: [{
				gridLines: {
					display:false,
					color: "#fff",
					zeroLineColor: "#fff",
					zeroLineWidth: 0
				},
				ticks: {
					fontFamily: "'Open Sans Bold', sans-serif",
					fontSize:12
				},
				stacked: true
			}]
		},
		legend:{
			display:true
		},
		
		animation: {
			onComplete: function () {
				var chartInstance = this.chart;
				var ctx = chartInstance.ctx;
				ctx.textAlign = "left";
				ctx.font = "12px Open Sans";
				ctx.fillStyle = "#000";
	
				Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
					var meta = chartInstance.controller.getDatasetMeta(i);
					Chart.helpers.each(meta.data.forEach(function (bar, index) {
						data = dataset.data[index];
						if(i===0){
							ctx.fillText(data, bar._model.x-40, bar._model.y+4);
						} else {
							ctx.fillText(data, bar._model.x-40, bar._model.y+4);
						}
					}),this)
				}),this);
			}
		},
		pointLabelFontFamily : "Quadon Extra Bold",
		scaleFontFamily : "Quadon Extra Bold",
		maintainAspectRatio: false
	};

	return (
		<div className={classes.main}>
			<HorizontalBar
				data={data}
				width={width}
				height={height}
				options={barOptions_stacked}
			/>
		</div>
		)
		
}
  
export default MaskByStatus;
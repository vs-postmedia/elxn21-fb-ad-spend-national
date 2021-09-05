import React, { useEffect } from 'react';
import DrawChart from '../DrawChart/DrawChart';
import './DailyCharts.css';

const DailyCharts = (props) => {
	// this is called once the dom element has rendered
	useEffect(()=> {
		DrawChart(props);
	});

	return (
		<div className="daily-charts">
			<h2>Daily Facebook ad spend <span className="h2-small">($000’s)</span></h2>
			<div id="charts"></div>
		</div>
	);
}




export default DailyCharts;


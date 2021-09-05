import React from 'react';
import StatBox from '../StatBox/StatBox';
import helper from '../../js/helper-functions';
import './SummaryBox.css';

const SummaryBox = (props) => {
	const stats = props.data

	const date = props.lastUpdate.split('-');
	// not zero-based. ugh.
	const month = helper.getPostmediaMonth(parseInt(date[1]) - 1);
	const day = date[2];

	return (
		<div className="summary-box">
			<div className="stat-box">
				{
					stats.map((d,i) => {
						return (
							<StatBox data={d} key={i}></StatBox>
						)
					})
				}
			</div>
			<p className="last-update">{`From Aug. 15 to ${month} ${day}`}</p>
		</div>
	);
}


export default SummaryBox;


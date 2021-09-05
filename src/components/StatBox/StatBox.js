import React from 'react';
import helper from '../../js/helper-functions';
import './StatBox.css';


const StatBox = (props) => {

	return (
		<div className="stat">
			<p className={`big-num ${props.data.party.toLowerCase()}`}>{`$${helper.numberWithCommas(props.data.total)}`}</p>
			<p className="label">{props.data.party}</p>
		</div>
	);
}	

export default StatBox;
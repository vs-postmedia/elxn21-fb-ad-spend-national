import * as d3 from 'd3-time-format';
import helper from '../../js/helper-functions';
import './tooltip-template.css';

const formatTime = d3.timeFormat('%B %d');

function tooltip(data) {
	const total = data.target.__data__.total;
	const date = data.target.__data__.date;
	const template = `
		<div class="tooltip-content">
			<p class="date">${formatTime(date)}</p>
			<p class="total-amount">$${helper.numberWithCommas(total)}</p>
		</div>
	`;

	return template;
};

export default tooltip;


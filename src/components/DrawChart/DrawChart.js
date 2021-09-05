import * as d3 from 'd3';
import Popup from '@flourish/popup';
import helper from '../../js/helper-functions';
import tooltipTemplate from '../TooltipTemplate/tooltip-template';
import './DrawChart.css';


// THE GOOD STUFF
let height, width, x, y;
const yTicks = 2;
const breakpoint = 400;
const popup = Popup();
const margin = {
	top: 15,
	right: 15,
	bottom: 40,
	left: 25
};

async function DrawChart(props) {
	height = 150;
	// let chartCount = props.data.length;
	let chartRowCount = 2;
	// convert dates into something useful
	const data = await parseData(props);

	// get container element & determine dimensions
	const chart = d3.select('#charts');
	const dims = chart.node().getBoundingClientRect();

	// height = (dims.height - margin.bottom - margin.top) / chartRowCount;

	// stacked on mobile
	if (window.innerWidth > breakpoint) {
		chartRowCount = 3;
		// height = dims.height / 2;
		// width = dims.width - margin.left;
		// width = (dims.width / chartRowCount) - margin.left - margin.right;
	}
	width = (dims.width / chartRowCount) - margin.left - margin.right;

	// setup our svg
	const svg = chart.selectAll('svg')
		.data(data)
		.enter().append('svg')
			.attr('class', d => d.party.toLowerCase())
			.style('height', `${height}px`)
			.style('width', `${width + margin.left + margin.right}px`)
			.append('g')
				.attr('transform', `translate(${margin.left}, ${margin.top})`);
			
	// label charts
	svg.append('text')
		.text(d => d.party)
		.attr('class', d => `${d.party.toLowerCase()} label-text`);


    // Add axes
	x = xSetup(data[0].values);
	y = ySetup(data[0].values);
    svg.append('g')
    	.call(xAxis);
    svg.append('g')
    	.call(yAxis);

    // draw the bars
    svg.append('g')
    	.selectAll('rect')
    	.data(d => d.values)
    	.enter().append('rect')
    		.attr('x', d => x(d.date))
    		.attr('y', d => y(d.total))
    		.attr('height', d => y(0) - y(d.total))
    		.attr('width', x.bandwidth())
    		.on('mouseover touchstart', handleMouseOver)
    		.on('mouseout touchend', handleMouseOut);
}

const handleMouseOut = () => {
	popup.hide();
}
const handleMouseOver = (e) => {
	// e.preventDefault();
	// e.stopPropagation();

	const xPos = (e.touches) ? e.touches[0].clientX : e.clientX;
	const yPos = (e.touches) ? e.touches[0].clientY : e.clientY;

	popup.point(xPos, yPos);
	popup.html(tooltipTemplate(e));
	popup.draw();
}

const parseData = (props) => {
	const data = props.data;
	const order = props.order;

	data.forEach(party => {
		party.values.forEach(d => {
			d.date = d3.timeParse('%Y-%m-%d')(d.date);
		});
	});

	// sort so it matches the order in the big numbers section
	return [
		...data.filter(d => d.party === order[0]),
		...data.filter(d => d.party === order[1]),
		...data.filter(d => d.party === order[2]),
		...data.filter(d => d.party === order[3]),
		...data.filter(d => d.party === order[4])
	];
};


const xAxis = g => {
	const xScale = x.domain();
	g.attr('transform', `translate(0, ${height - margin.bottom})`)
		.attr('class', 'x-axis axis')
		.call(d3.axisBottom(x)
			.tickSize(0)
			.tickFormat(d3.timeFormat('%b. %d'))
			.tickPadding([10])
			.tickValues([xScale[0], xScale[xScale.length - 1]])
		)
};

const yAxis = g => {
	g.attr('class', 'y-axis axis')
		.call(d3.axisLeft(y)
			.ticks(yTicks)
			.tickSize(-width)
			.tickFormat(d => `${helper.numberWithCommas(d / 1000)}`)
		)
		.call(g => g.select('.domain').remove()); // removed the line
};

const ySetup = (data) => {
	return d3.scaleLinear()
		.domain([0, d3.max(data, d => parseInt(d.total))]).nice()
		.range([height - margin.bottom, margin.top])
};

const xSetup = (data) => {
	return d3.scaleBand()
		.rangeRound([0, width], 0.5).padding(0.1)
		.domain(data.map(d => d.date))
};

export default DrawChart;
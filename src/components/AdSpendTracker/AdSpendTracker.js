import Axios from 'axios';
import React, { Component, Fragment } from 'react';
import SummaryBox from '../SummaryBox/SummaryBox';
import DailyCharts from '../DailyCharts/DailyCharts';
import './AdSpendTracker.css';

import * as collection from 'd3-collection';
import * as array from 'd3-array';


export default class AdSpendTracker extends Component {
	state = {
		party_data: [],
		party_daily: []
	}

	componentDidMount() {
		Axios.get(this.props.dataUrl)
			.then(resp => {
				this.setState({
					last_update: resp.data.lastUpdate,
					party_data: resp.data.party_total,
					party_daily: partyDaily_d3(resp.data.party_daily),
					party_order: resp.data.party_total.map(d => d.party)
				});
			});
	}

	render() {
		if (this.state.party_data.length > 0) {
			return (
				<Fragment>
					<SummaryBox className="summary-box"
						data={this.state.party_data}
						lastUpdate={this.state.last_update}>
					</SummaryBox>

					{<DailyCharts
						data={this.state.party_daily}
						order={this.state.party_order}>
					</DailyCharts>}
				</Fragment>
			);
		} else {
			return (
				<Fragment />
			)
		}
	}
}


function partyDaily_d3(data) {
	if (!data) return null;

	return collection.nest()
		.key(d => d['party'])
		.key(d => d.date)
		.rollup(v => {
			return {
				total: array.sum(v, d => d.total_spend)
			}
		})
		.entries(data)
		.map(group => {
			return {
				party: group.key,
				values: group.values.map(d => {
					return {
						date: d.key,
						timestamp: new Date(d.key).getTime(),
						total: d.value.total
					}
				})
				// sort by date, ascending
				.sort((a, b) => a.timestamp - b.timestamp)
			}
		});
}





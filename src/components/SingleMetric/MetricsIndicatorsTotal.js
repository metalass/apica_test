import React from 'react'
import { connect } from 'react-redux'


function MetricsIndicatorsTotal(props) {
	const { metrics } = props;

	let total = { I: 0, W: 0, E: 0, F: 0 };
	metrics && metrics.map((item) => { if (!item.severity) return; total[ item.severity ]++ });

	const indicators = Object.keys(total).map((type) => <div key={type} className={`top-panel__indicator  top-panel__indicator_${type}`}>{total[type]}</div>);

	return (
		<div className="top-panel__indicators">
			{indicators}
		</div>
	)
}

export default connect((state) => {
	return {
		metrics: state.metrics.entities
	}
})(MetricsIndicatorsTotal)
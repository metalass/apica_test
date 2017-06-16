import React, { Component } from 'react'
import { connect } from 'react-redux'
import MetricForm from './MetricForm'
import Metric from './Metric'
import { getMetricsLocal } from '../../utils/metrics'
import { addNewMetric } from '../../actions'
import ModalContainer from '../Modal/ModalContainer';
import ModalDialog from '../Modal/ModalDialog';
import { getMetricId } from '../../utils/metrics'

import './style.less'

class SingleMetric extends Component {
	state = {
		newMetricDialogIsOpen: false
	}

	componentWillMount() {
		// restore metrics from localStorage only if needed

		const { addNewMetric, metrics } = this.props;
		const storageMetrics = getMetricsLocal();

		if (storageMetrics && storageMetrics.length) {
			for (let i = 0; i < storageMetrics.length; i++) {
				const metric = storageMetrics[i];
				if (!metrics.get(getMetricId(metric))) {
					addNewMetric(metric);
				}
			}
		}
	}

	render() {
		const { metrics } = this.props;
		const { newMetricDialogIsOpen } = this.state;
		const metricsElements = metrics && metrics.valueSeq().map((item, index) => <Metric key={index} item={item}/>);

		return (
			<div>
				<div className="metric">
					{metricsElements}
					<a href="javascript:void(0);" className="metric__item  metric__item_add" onClick={this.updateDialog(true)}></a>
				</div>

				{ newMetricDialogIsOpen &&
					<ModalContainer onClose={this.updateDialog(false)}>
						<ModalDialog onClose={this.updateDialog(false)}>
							<MetricForm closeDialog={this.updateDialog(false)} />
						</ModalDialog>
					</ModalContainer>
				}
			</div>
		)
	}

	updateDialog = newVal => ev => {
		this.setState({
			newMetricDialogIsOpen: newVal
		});
		ev && ev.preventDefault();
	}
}

export default connect((state) => {
	return {
		metrics: state.metrics.entities
	}
}, { addNewMetric })(SingleMetric)
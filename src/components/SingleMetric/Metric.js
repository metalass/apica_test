import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { deleteMetric, updateMetricValue } from '../../actions'
import ModalContainer from '../Modal/ModalContainer';
import ModalDialog from '../Modal/ModalDialog';
import MetricForm from './MetricForm'
import ReactTooltip from 'react-tooltip'

function deleteConfirm(deleteMetric, item) {
	if (confirm('Are you sure want to delete metric?')) {
		deleteMetric(item);
	}
}

class Metric extends Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	state = {
		editDialogIsOpen: false,
		valueUpdating: false
	}

	componentDidMount() {
		this.componentWillReceiveProps(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// set timeout for update the current metric value and indicator

		const { item, updateMetricValue } = this.props;
		const { item: nextItem } = nextProps;
		const { interval } = nextItem;
		if (item.interval != interval && this.state.interval) {
			clearTimeout(this.state.interval);
		}
		if ((item.interval != interval || !this.state.interval || item.last_update != nextItem.last_update) && nextItem.url) {
			this.setState({
				interval: setTimeout(() => {
					updateMetricValue({
						api_key: nextItem.api_key,
						check_id: nextItem.check_id,
						interval: nextItem.interval
					});
					this.setState({ valueUpdating: true });
				}, interval * 1000),
				valueUpdating: false
			});
		}
	}

	componentWillUnmount() {
		if (this.state.interval) {
			clearTimeout(this.state.interval);
		}
	}

	render() {
		const { deleteMetric, item } = this.props;
		const { url, name, value, severity, location } = item;
		const { editDialogIsOpen, valueUpdating } = this.state;

		if (!value && !url) {
			return (
				<div className="metric__item">
					<div className="metric__item-value">Loading...</div>
				</div>
			)
		}

		return (
			<div className="metric__item">
				<div className="metric__item-info" data-tip={`Location: ${location}`}><i className="fa fa-info-circle" aria-hidden="true"></i></div>
				<ReactTooltip place="bottom" />
				<div className="metric__item-edit" onClick={this.updateDialog(true)}><i className="fa fa-gear" aria-hidden="true"></i></div>
				<div className="metric__item-delete" onClick={() => deleteConfirm(deleteMetric, item)}><i className="fa fa-trash-o" aria-hidden="true"></i></div>
				<div className={`metric__item-indicator  metric__item-indicator_${severity}`}>!</div>
				<div className={'metric__item-value' + (valueUpdating ? ' metric__item-value_updating' : '')}>{value ? value + " ms" : 'N/A'}</div>
				{name}<br/>
				{url}

				{ editDialogIsOpen &&
					<ModalContainer onClose={this.updateDialog(false)}>
						<ModalDialog onClose={this.updateDialog(false)}>
							<MetricForm item={item} closeDialog={this.updateDialog(false)} />
						</ModalDialog>
					</ModalContainer>
				}
			</div>
		)
	}

	updateDialog = newVal => ev => {
		this.setState({
			editDialogIsOpen: newVal
		});
		ev && ev.preventDefault();
	}
}

export default connect(null, { deleteMetric, updateMetricValue })(Metric)
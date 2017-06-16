import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { checkNewMetric, updateMetric } from '../../actions'
import { getMetricId } from '../../utils/metrics'

class MetricForm extends Component {
	static propTypes = {
		closeDialog: PropTypes.func,
		item: PropTypes.object
	}

	componentWillMount() {
		// set initial values (for edit form)

		const { item } = this.props;
		if (item) {
			const { api_key, check_id, interval } = item;
			this.setState({ api_key, check_id, interval });
		}
	}

	componentWillReceiveProps(nextProps) {
		// close dialog on success while adding new metric

		if (this.props.isLoading && !nextProps.isLoading && !nextProps.serverErrorText) {
			this.props.closeDialog();
		}
	}

	state = {
		api_key: '',
		check_id: '',
		interval: '5',
		errorText: ''
	}

	render() {
		const { isLoading, serverErrorText, closeDialog, item } = this.props;
		const { api_key, check_id, interval, errorText } = this.state;

		return (
			<div className={"form-block" + ( isLoading ? "  form-block__loading" : "" )}>
				<form onSubmit={this.saveMetric}>
					<h2 className="form-block__header">{ item ? 'Edit Single Metric' : 'Create Single Metric' }</h2>
					<div className="form-block__row">
						<label>API Key</label>
						<input type="text" name="api_key" onChange={this.handleInputChange("api_key")} value={api_key} disabled={!!item} />
					</div>
					<div className="form-block__row">
						<label>Check ID</label>
						<input type="text" name="check_id" onChange={this.handleInputChange("check_id")} value={check_id} disabled={!!item} />
					</div>
					<div className="form-block__row">
						<label>Refresh Interval</label>
						<select onChange={this.handleInputChange("interval")} value={interval}>
							<option value="5">5s</option>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="30">30</option>
						</select>
					</div>
					{ (errorText || serverErrorText) && <div className="form-block__row"><div className="form-block__error">{errorText || ('Server returned an error: ' + serverErrorText)}</div></div> }
					<div className="form-block__btns">
						<input type="submit" className="form-block__btn" value="Save"/>
						<button onClick={closeDialog} className="form-block__btn  form-block__btn_cancel">Cancel</button>
					</div>
				</form>
			</div>
		)
	}

	handleInputChange = name => ev => {
		this.setState({
			[name]: ev.target.value,
			errorText: ''
		})
	}

	saveMetric = ev => {
		ev.preventDefault();
		const { checkNewMetric, updateMetric, closeDialog, isLoading, entities, item } = this.props;
		const { api_key, check_id, interval } = this.state;
		if (isLoading) {
			return;
		}
		if (!api_key) {
			return this.setState({
				errorText: 'No API key provided'
			})
		}

		if (!check_id) {
			return this.setState({
				errorText: 'No Check ID provided'
			})
		}

		if (entities.get(getMetricId(this.state)) && !item) {
			return this.setState({
				errorText: 'Duplicate metric'
			})
		}

		if (!item) {
			checkNewMetric({ api_key, check_id, interval });
		} else {
			updateMetric({ api_key, check_id, interval });
			closeDialog();
		}
	}
}

export default connect((state) => {
	return {
		isLoading: state.metrics.newMetricIsLoading,
		serverErrorText: state.metrics.newMetricErrorText,
		entities: state.metrics.entities
	}
}, { checkNewMetric, updateMetric })(MetricForm)
import { CHECK_NEW_METRIC, DELETE_METRIC, UPDATE_METRIC, UPDATE_METRIC_VALUE, START, SUCCESS, FAIL } from '../constants'
import { Record, Map, OrderedMap } from 'immutable'
import { getMetricId } from '../utils/metrics'

const defaultState = Record({
	newMetricIsLoading: false,
	newMetricErrorText: '',
	entities: new OrderedMap({})
})();

const MetricModel = Record({
	url: '',
	id: 0,
	name: '',
	value: '',
	severity: '',
	location: '',
	api_key: '',
	interval: '',
	check_id: '',
	last_update: 0
});


export default (state = defaultState, action) => {
	const { type, payload, response } = action;

	switch (type) {
		case CHECK_NEW_METRIC + START:
			if (!payload.add) {
				state = state.set('newMetricIsLoading', true);
			} else {
				state = state.setIn(['entities', getMetricId(payload)], MetricModel(payload));
			}
			return state;
		case CHECK_NEW_METRIC + FAIL:
			return state.set('newMetricIsLoading', false).set('newMetricErrorText', response);
		case CHECK_NEW_METRIC + SUCCESS:
			return state.set('newMetricIsLoading', false).set('newMetricErrorText', '').setIn(['entities', getMetricId(payload)], MetricModel(Object.assign({}, response, payload)));
		case DELETE_METRIC:
			return state.deleteIn(['entities', getMetricId(payload)]);
		case UPDATE_METRIC:
			return state.set('newMetricIsLoading', false).set('newMetricErrorText', '').setIn(['entities', getMetricId(payload), 'interval'], payload.interval);
		case UPDATE_METRIC_VALUE + SUCCESS:
			return state.setIn(['entities', getMetricId(payload)], MetricModel(Object.assign({}, state.entities.get(getMetricId(payload)), response, payload, { last_update: +new Date() })))
		case UPDATE_METRIC_VALUE + FAIL:
			return state.setIn(['entities', getMetricId(payload)], MetricModel(Object.assign({}, state.entities.get(getMetricId(payload)), { last_update: +new Date() })))
	}

	return state
}
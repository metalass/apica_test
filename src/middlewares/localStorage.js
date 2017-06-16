import { START, SUCCESS, FAIL, CHECK_NEW_METRIC, DELETE_METRIC, UPDATE_METRIC } from '../constants'
import { addMetricLocal, removeMetricLocal, updateMetricLocal } from '../utils/metrics'

export default store => next => action => {
	const { type, payload } = action;

	if (type == CHECK_NEW_METRIC + SUCCESS) {
		if (!payload.add) {
			addMetricLocal(payload);
		}
	} else if (type == DELETE_METRIC) {
		removeMetricLocal(payload);
	} else if (type == UPDATE_METRIC) {
		updateMetricLocal(payload);
	}
	next(action);
}
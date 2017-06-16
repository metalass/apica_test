import { START, SUCCESS, FAIL, CHECK_NEW_METRIC, UPDATE_METRIC_VALUE } from '../constants'

// this adapter transforms response from API to the data structure that is stored in Redux
// so the API can be changed and it will need only this adapter to change but not all the components
export default store => next => action => {
	const {type, response, payload, ...rest} = action;

	if (type == CHECK_NEW_METRIC + SUCCESS || type == UPDATE_METRIC_VALUE + SUCCESS) {

		// do some stuff

	}
	next(action);
}
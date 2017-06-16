import { START, SUCCESS, FAIL, CHECK_NEW_METRIC, UPDATE_METRIC_VALUE } from '../constants'

export default store => next => action => {
	const {type, payload, ...rest} = action;

	if (type == CHECK_NEW_METRIC || type == UPDATE_METRIC_VALUE) {
		next({...rest, payload, type: type + START});

		fetch(`https://api-wpm-trial.apicasystem.com/v3/Checks/${payload.check_id}?auth_ticket=${payload.api_key}`)
			.then((response) => response.json())
			.then((response) => {
				if (typeof response == 'object' && response !== null) {
					next({...rest, payload, type: type + SUCCESS, response});
				} else {
					next({...rest, payload, type: type + FAIL, response});
				}
			})
			.catch((ex) => console.log(ex));

	} else {
		next(action);
	}
}
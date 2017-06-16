import { CHECK_NEW_METRIC, DELETE_METRIC, UPDATE_METRIC, UPDATE_METRIC_VALUE } from '../constants'

export function checkNewMetric(payload) {
	return {
		type: CHECK_NEW_METRIC,
		payload
	}
}

export function addNewMetric(payload) {
	return {
		type: CHECK_NEW_METRIC,
		payload: { ...payload, add: true }
	}
}

export function deleteMetric(payload) {
	return {
		type: DELETE_METRIC,
		payload
	}
}

export function updateMetric(payload) {
	return {
		type: UPDATE_METRIC,
		payload
	}
}

export function updateMetricValue(payload) {
	return {
		type: UPDATE_METRIC_VALUE,
		payload
	}
}
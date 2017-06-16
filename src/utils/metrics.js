export function getMetricId(metric) {
	return metric.check_id + metric.api_key;
}

export function getMetricsLocal() {
	return JSON.parse(window.localStorage.getItem('apica_metrics'));
}

export function setMetricsLocal(metrics) {
	window.localStorage.setItem('apica_metrics', JSON.stringify(metrics));
}

export function addMetricLocal(metric) {
	let metrics = getMetricsLocal() || [];
	metrics.push(metric);
	setMetricsLocal(metrics);
}

export function removeMetricLocal(metric) {
	let metrics = getMetricsLocal() || [];
	for (let i = 0; i < metrics.length; i++) {
		const curMetric = metrics[i];
		if (getMetricId(metric) == getMetricId(curMetric)) {
			metrics.splice(i, 1);
			break;
		}
	}
	setMetricsLocal(metrics);
}

export function updateMetricLocal(metric) {
	let metrics = getMetricsLocal() || [];
	for (let i = 0; i < metrics.length; i++) {
		let curMetric = metrics[i];
		if (getMetricId(metric) == getMetricId(curMetric)) {
			curMetric = Object.assign(curMetric, metric);
			break;
		}
	}
	setMetricsLocal(metrics);
}
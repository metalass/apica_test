import { createStore, applyMiddleware, compose } from 'redux'
import api from '../middlewares/api'
import api_adapter from '../middlewares/api_adapter'
import localStorage from '../middlewares/localStorage'
import logger from '../middlewares/logger'
import reducer from '../reducer'

const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		}) : compose;

const enhancer = composeEnhancers(
	applyMiddleware(api, api_adapter, localStorage/*, logger*/)
);

const store = createStore(reducer, {}, enhancer);

export default store
import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import NotFoundPage from './routeHandlers/NotFoundPage'
import UnderConstruction from './routeHandlers/UnderConstruction'
import SingleMetric from './components/SingleMetric'
import Root from './components/Root'

export default (
    <Router history={browserHistory}>
        <Route path="/" component={Root}>
	        <IndexRedirect to="/metric"/>
	        <Route path="metric">
		        <IndexRedirect to="/metric/create"/>
		        <Route path="create" component={SingleMetric} />
		        <Route path="manage" component={UnderConstruction} />
		        <Route path="reports" component={UnderConstruction} />
		        <Route path="users" component={UnderConstruction} />
	        </Route>
	        <Route path="timeline">
		        <IndexRoute component={UnderConstruction} />
		        <Route path="1" component={UnderConstruction} />
		        <Route path="2" component={UnderConstruction} />
		        <Route path="3" component={UnderConstruction} />
	        </Route>
	        <Route path="comparison" component={UnderConstruction} />
            <Route path="*" component={NotFoundPage} />
        </Route>
    </Router>
)
import React from 'react'
import { Provider } from 'react-redux'
import store from '../../store'
import Menu from '../Menu'
import SubMenu from '../Menu/SubMenu'
import MenuItem from '../Menu/MenuItem'
import MetricsIndicatorsTotal from '../SingleMetric/MetricsIndicatorsTotal'

import './style.less'

function Root(props) {
	const mainMenu = [
		{ path: '/metric', name: 'Single Metric', submenu: [
			{ path: '/metric/create', name: 'Create' },
			{ path: '/metric/manage', name: 'Manage' },
			{ path: '/metric/reports', name: 'Reports' },
			{ path: '/metric/users', name: 'Users' }
		] },
		{ path: '/timeline', name: 'Time Line', submenu: [
			{ path: '/timeline/1', name: 'Item 1' },
			{ path: '/timeline/2', name: 'Item 2' },
			{ path: '/timeline/3', name: 'Item 3' }
		] },
		{ path: '/comparison', name: 'Comparison', submenu: [] }
	];
	let subMenu;
	const mainMenuElements = mainMenu.map((item, index) => { if (props.location.pathname.indexOf(item.path) === 0) { subMenu = item.submenu }; return <MenuItem key={index} {...item} />; });
	const subMenuElements = subMenu && subMenu.map((item, index) => <MenuItem key={index} {...item} />);

	return (
		<Provider store={store}>
			<div>
				<header>
					<div className="left-panel">
						<Menu>
							{mainMenuElements}
						</Menu>
					</div>
					<div className="top-panel">
						<div className="top-panel__submenu">
							<SubMenu>
							{subMenuElements}
							</SubMenu>
						</div>
						<div className="top-panel__settings">
							<a href="#" className="top-panel__setting"><i className="fa fa-search" aria-hidden="true"></i></a>
							<a href="#" className="top-panel__setting"><i className="fa fa-user" aria-hidden="true"></i></a>
							<a href="#" className="top-panel__setting"><i className="fa fa-gear" aria-hidden="true"></i></a>
						</div>
						<MetricsIndicatorsTotal />
					</div>
				</header>
				<div className="content">
					{props.children}
					<footer>
						&copy; Specially for Apica by Victor Chebiryak
					</footer>
				</div>
			</div>
		</Provider>
	)
}

export default Root
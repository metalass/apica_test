import React, { Component } from 'react'
import PropTypes from 'prop-types';

function Menu (props) {
    return (
        <div>
            <div className="logo">
	            <img src="https://www.apicasystem.com/apica-wp/wp-content/themes/apica-1.2/img/logo.png" alt="Apica | Website Testing, Optimization and Monitoring" width="346" height="100"/>
            </div>
            <ul className="mainmenu">
                {props.children}
            </ul>
        </div>
    )
}
Menu.propTypes = {
	children: PropTypes.array.isRequired
};

export default Menu
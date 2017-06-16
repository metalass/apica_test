import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

function MenuItem (props) {
    const {path, name} = props
    return (
        <li>
            <Link to={path} activeClassName="active">{name || path}</Link>
        </li>
    )
}
MenuItem.propTypes = {
	path: PropTypes.string.isRequired
};

export default MenuItem
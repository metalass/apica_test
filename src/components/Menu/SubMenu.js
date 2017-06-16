import React from 'react'
import PropTypes from 'prop-types';

function SubMenu (props) {
    return (
        <ul className="submenu">
            {props.children}
        </ul>
    )
}
SubMenu.propTypes = {
	children: PropTypes.array
};

export default SubMenu
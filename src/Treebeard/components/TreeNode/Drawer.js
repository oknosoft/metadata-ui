import React from 'react';
import PropTypes from 'prop-types';
//import {VelocityTransitionGroup} from 'velocity-react';

const Drawer = ({restAnimationInfo, children}) => (
    <span {...restAnimationInfo}>
        {children}
    </span>
);

Drawer.propTypes = {
    restAnimationInfo: PropTypes.shape({}).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func, PropTypes.shape({})),
        PropTypes.shape({})
    ])
};

export default Drawer;

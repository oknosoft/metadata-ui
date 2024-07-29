import React from 'react';
import PropTypes from 'prop-types';

import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';
import {Ul} from './common';
import defaultDecorators from './Decorators';
import TreeNode from './TreeNode';

const TreeBeard = (props) => {
  let {
    animations,
    decorators,
    data,
    separateToggleEvent,
    onToggle,
    onClickHeader,
    onRightClickHeader,
    style,
  } = props;
  if(!style) {
    style = defaultTheme;
  }
  if(!animations) {
    animations = defaultAnimations;
  }
  if(!decorators) {
    decorators = defaultDecorators;
  }
  const nodeStyle = {...defaultTheme.tree.node, ...style.tree.node};
  return <Ul style={{...defaultTheme.tree.base, ...style.tree.base}}>
    {(Array.isArray(data) ? data : (data ? [data] : [])).map((node, index) => (
      <TreeNode
        {...{decorators, node, separateToggleEvent, onToggle, onClickHeader, onRightClickHeader, animations}}
        key={node.id || index}
        style={nodeStyle}
      />
    ))}
  </Ul>;
};

TreeBeard.propTypes = {
    style: PropTypes.object,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    separateToggleEvent: PropTypes.bool,
    onToggle: PropTypes.func,
    onClickHeader: PropTypes.func,
    onRightClickHeader: PropTypes.func,
    decorators: PropTypes.object,
};

export default TreeBeard;

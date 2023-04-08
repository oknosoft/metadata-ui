import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';

function prevent(e) {
  e.preventDefault();
}

const Header = ({node, style, onClick, onClickCheck, onRightClick}) => (
  <div
    style={node.children ? style.base : Object.assign({marginLeft: 16}, style.base)}
    onClick={onClick}
    onContextMenu={(e) => {
      if (onRightClick && e.button === 2) {
        prevent(e);
        onRightClick(node, e);
      }
    }}
    // onMouseUp={prevent}
    // onMouseDown={prevent}
  >
    <div style={style.title} className={`dsn-hover`}>
      {node.hasOwnProperty('checked') ?
        <Checkbox
          checked={node.checked}
          size="small"
          color="primary"
          onChange={({target}) => {
            node.checked = target.checked;
            onClickCheck?.(node);
          }}
        />
        :
        <div className={`dsn-treeview-icon ${node.icon}`}/>
      }
      {node.name}
    </div>
  </div>
);

Header.propTypes = {
  style: PropTypes.object,
  node: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onRightClick: PropTypes.func,
  onClickCheck: PropTypes.func,
};

export default Header;

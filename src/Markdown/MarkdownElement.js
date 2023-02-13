import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {marked} from 'marked';

import cn from 'classnames';
import styles from './styles';

export function MarkdownElement(props) {
  const { className, text, mdtitle, title, handleNavigate, handleIfaceState, CustomBtn, ...other } = props;
  const classes = styles(useTheme());

  function anchorCkick(evt) {
    if(evt.target.tagName === 'A') {
      const url = new URL(evt.target.href);
      if(url.origin === location.origin) {
        $p.ui.prevent(evt);
        handleNavigate(url.pathname);
      }
      else if(!evt.target.target) {
        evt.target.target = '_blank';
      }
    }
  }

  /* eslint-disable react/no-danger */
  return (
    <Box
      className={cn('markdown-body', className)}
      sx={classes.root}
      onClick={anchorCkick}
      title={mdtitle || title}
      dangerouslySetInnerHTML={{__html: marked.parse(text)}}
      {...other}
    />
  );
  /* eslint-enable */
}

MarkdownElement.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  handleNavigate: PropTypes.func.isRequired,
}

export default MarkdownElement;

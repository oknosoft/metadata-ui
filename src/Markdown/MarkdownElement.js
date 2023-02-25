import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import {marked} from 'marked';

import cn from 'clsx';
import styles from './styles';

const prevent = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export function MarkdownElement(props) {
  const { className, text, mdtitle, title, CustomBtn, ...other } = props;
  const classes = styles(useTheme());
  const navigate = useNavigate();

  function anchorCkick(evt) {
    if(evt.target.tagName === 'A') {
      const url = new URL(evt.target.href);
      if(url.origin === location.origin) {
        prevent(evt);
        navigate(url.pathname);
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
}

export default MarkdownElement;

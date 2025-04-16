'use client';
import * as React from 'react';
import clsx from 'clsx';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { styled } from '@mui/material/zero-styled';

const FooterRoot = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Footer',
  overridesResolver: (props, styles) => styles.footer,
})({
  display: 'flex',
  overflow: 'hidden',
});

export const FooterSpace = styled('div')(() => ({flex: 1,}));

const FooterIndicator = styled(IconButton, {
  name: 'MuiAutocomplete',
  slot: 'ClearIndicator',
  overridesResolver: (props, styles) => styles.clearIndicator,
})({
  marginRight: 2,
  padding: 8,
  borderRadius: 'unset',
});


const openText = 'Открыть форму элемента';
const openIcon = <OpenInBrowserIcon/>;

export function AutocompleteFooter({openList, openObj, openListText, getClearProps, clearText, ownerState, clearIcon}) {

  return <FooterRoot onMouseDown={(event) => {
    // Prevent blur
    event.preventDefault();
  }}>
    <Link
      aria-label={openListText}
      title={openListText}
      onClick={openList}
      sx={{p: 1, cursor: 'pointer', lineHeight: 2}}
    >
      Список
    </Link>
    <FooterSpace />
    {ownerState.initHasClearIcon ? <FooterIndicator
      {...getClearProps()}
      aria-label={clearText}
      title={clearText}
    >
      {clearIcon}
    </FooterIndicator> : null}
    <FooterIndicator
      aria-label={openText}
      title={openText}
      onClick={openObj}
    >
      {openIcon}
    </FooterIndicator>
  </FooterRoot>;
}

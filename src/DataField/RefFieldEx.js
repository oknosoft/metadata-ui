import React from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/AddBoxOutlined';
import EditIcon from '@mui/icons-material/DriveFileRenameOutline';

import RefField from './RefField';
import {Toolbar, HtmlTooltip} from '../App/styled';

const onClick = (cb, onClose) => () => {
  onClose();
  cb?.();
};

function PaperComponent({children, onList, onAdd, onEdit, onClose, ...other}) {
  return <Paper {...other}>
    {children}
    <Toolbar disableGutters>
      <HtmlTooltip title="Открыть форму списка">
        <IconButton disabled={!onList} onClick={onClick(onList, onClose)}><ListIcon/></IconButton>
      </HtmlTooltip>
      <div style={{flex: 1}}/>
      <HtmlTooltip title="Создать элемент">
        <IconButton disabled={!onAdd} onClick={onClick(onAdd, onClose)}><AddIcon/></IconButton>
      </HtmlTooltip>
      <HtmlTooltip title="Открыть форму объекта">
        <IconButton disabled={!onEdit} onClick={onClick(onEdit, onClose)}><EditIcon/></IconButton>
      </HtmlTooltip>
    </Toolbar>
  </Paper>;
}

export default function RefFieldEx({onList, onAdd, onEdit, ...other}) {
  const [open, setOpen] = React.useState(false);
  const onOpen = () => setOpen(true);
  const onClose = (event, reason) => {
    if(reason !== 'blur') {
      setOpen(false);
    }
  };
  return <RefField
    {...other}
    open={open}
    onOpen={onOpen}
    onClose={onClose}
    slots={{paper: PaperComponent}} slotProps={{paper: {onList, onAdd, onEdit, onClose}}} />;
}


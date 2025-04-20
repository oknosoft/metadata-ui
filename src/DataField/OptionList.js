import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import MuiToolbar from '@mui/material/Toolbar';
import Divider, { dividerClasses } from '@mui/material/Divider';
import {styled} from '@mui/material/styles';
import {DataGrid} from 'react-data-grid';
import Dialog from '../App/Dialog';
import {rowKeyGetter, cellClick, cellKeyDown} from '../App/dataGrid';
import OptionImg from './OptionImg';

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  backgroundColor: theme.palette.grey["50"],
}));

const GridSpace = styled('div')({
  width: '50vw',
  height: '70vh',
});

const varColumns = [
  [{
    key: "name",
    name: "Значение",
    renderCell({row}) {
      return row.presentation;
    }
  },
  ],
  [{
    key: "img",
    name: "Картинка",
    width: 170,
    renderCell: OptionImg
  }]
];
varColumns[1].push(varColumns[0][0]);
const getColumns = (options) => {
  return options.some(v => v.css) ? [varColumns[1], 150] : [varColumns[0], 35];
};

export function OptionList({value, options, onChange, param, closeList}) {

  const [columns, rowHeight] = getColumns(options);
  const [selectedRows, setSelectedRows] = React.useState(new Set([value?.valueOf()]));

  const onCellClick = ({row}) => {
    if(!selectedRows.size || Array.from(selectedRows)[0] !== row.ref) {
      setSelectedRows(new Set([row.ref]));
    }
  };

  const selectValue = (ev) => {
    if (selectedRows.size) {
      onChange(ev, param.type.fetchType(Array.from(selectedRows)[0]));
    }
    closeList();
  };

  const {onRef, onDoubleClick} = React.useMemo(() => {
    let scrolled = false;
    return {
      onRef(el) {
        if (el && !scrolled) {
          scrolled = true;
          el?.scrollToCell({idx: columns.length > 1 ? 1 : 0, rowIdx: options.indexOf(value)});
        }
      },
      onDoubleClick({column, row, rowIdx, selectCell}, ev) {
        onChange(ev, row);
        closeList();
      }
    }
  }, []);

  const title = <Toolbar disableGutters>
    <Button onClick={selectValue}>Выбрать</Button>
    <Divider orientation="vertical" variant="middle" flexItem sx={{mx: 2}} />
    {param.name}
    <Box sx={{ flex: 1}} />
    <IconButton onClick={closeList}><CloseIcon/></IconButton>
  </Toolbar>;

  return <Dialog open onClose={closeList} title={title} actions={[]} raw>
    <GridSpace>
      <DataGrid
        ref={onRef}
        columns={columns}
        rows={options}
        rowKeyGetter={rowKeyGetter}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        onCellClick={onCellClick}
        onCellDoubleClick={onDoubleClick}
        //onCellKeyDown={onCellKeyDown}
        className="fill-grid"
        headerRowHeight={35}
        rowHeight={rowHeight}
      />
    </GridSpace>
  </Dialog>;
}


export function optionListHook(param, paramOpenList) {

  const [listProps, setListProps] = React.useState(null);
  const [openList, closeList] = React.useMemo(() => [
    (props) => setListProps({...props, param, closeList}),
    () => setListProps(null),
  ], []);
  return [listProps, openList, closeList];
}

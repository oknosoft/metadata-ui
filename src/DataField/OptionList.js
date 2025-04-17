import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiToolbar from '@mui/material/Toolbar';
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
  // rows, onDoubleClick, selectedRows, setSelectedRows, columns
  //const onCellClick = cellClick({selectedRows, setSelectedRows});
  //const onCellKeyDown = cellKeyDown({rows, columns, onDoubleClick, setSelectedRows});

  const title = React.useMemo(() => <Toolbar disableGutters>
    {param.name}
    <Box sx={{ flex: 1}} />
    <IconButton onClick={closeList}><CloseIcon/></IconButton>
  </Toolbar>, []);

  return <Dialog open onClose={closeList} title={title} actions={[]} raw>
    <GridSpace>
      <DataGrid
        columns={columns}
        rows={options}
        rowKeyGetter={rowKeyGetter}
        //selectedRows={selectedRows}
        //onSelectedRowsChange={setSelectedRows}
        //onCellClick={onCellClick}
        //onCellDoubleClick={onDoubleClick}
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

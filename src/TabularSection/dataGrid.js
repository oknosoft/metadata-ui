

export function rowKeyGetter(row) {
  return row.row;
}

export function preventDefault(event) {
  event.preventGridDefault();
  event.preventDefault();
}

export function cellClick({selectedRows, setSelectedRows}) {
  return ({row, column, selectCell}) => {
    if(!selectedRows.size || Array.from(selectedRows)[0] !== row.ref) {
      setSelectedRows(new Set([row.ref]));
    }
  };
}

export function tabularCreate({tabular, selection, find_rows, setRows, selectedRows, setSelectedRows}) {

  const getRow = () => {
    const selectedKey = selectedRows.size && Array.from(selectedRows)[0];
    if(selectedKey) {
      return tabular.get(selectedKey-1);
    }
  };

  const add = (proto) => {
    const selected = new Set();
    if(!proto) {
      proto = selection;
    }
    const row = tabular.add(proto).row;
    selected.add(row);
    setRows(find_rows ? find_rows() : Array.from(tabular));
    setSelectedRows(selected);
    return row;
  };

  const create = () => add();

  const clone = () => add(getRow?.());

  const clear = () => {
    tabular.clear();
    setSelectedRows(new Set());
    setRows(Array.from(tabular));
  };

  const remove = () => {
    const row = getRow();
    if(row) {
      tabular.del(row);
      setSelectedRows(new Set());
      setRows(Array.from(tabular));
    }
  };

  return {getRow, create, clone, remove, clear};
}

export function cellKeyDown({rows, columns, create, clone, open, remove, keyField = 'ref', setSelectedRows}) {
  return ({ mode, row, column, rowIdx, selectCell }, event) => {
    if (mode === 'EDIT' || !rows.length) return;
    const { idx } = column;
    const { key, shiftKey } = event;

    if(key === 'Enter') {
      open?.();
    }
    else if(key === 'Delete') {
      remove?.();
    }
    else if(key === 'Insert') {
      create();
    }
    else if(key === 'F9') {
      clone?.();
    }
    else if (key === 'ArrowDown') {
      if (rowIdx < rows.length - 1) {
        selectCell({rowIdx: rowIdx + 1, idx});
        setSelectedRows(new Set([rows[rowIdx + 1][keyField]]));
      }
      preventDefault(event);
    }
    else if ((key === 'ArrowRight' || (key === 'Tab' && !shiftKey)) && idx === columns.length - 1) {
      if (rowIdx < rows.length - 1) {
        selectCell({rowIdx: rowIdx + 1, idx: 0});
        setSelectedRows(new Set([rows[rowIdx + 1][keyField]]));
      }
      preventDefault(event);
    }
    else if (key === 'ArrowUp') {
      if(rowIdx > 0) {
        selectCell({rowIdx: rowIdx - 1, idx});
        setSelectedRows(new Set([rows[rowIdx - 1][keyField]]));
      }
      preventDefault(event);
    }
    else if ((key === 'ArrowLeft' || (key === 'Tab' && shiftKey)) && idx === 0) {
      if(rowIdx > 0) {
        selectCell({ rowIdx: rowIdx - 1, idx: columns.length - 1 });
        setSelectedRows(new Set([rows[rowIdx - 1][keyField]]));
      }
      preventDefault(event);
    }
  };
}


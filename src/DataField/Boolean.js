import React from 'react';

export function BoolFormatter({row, column}) {

  const obj = (typeof row.row !== 'object' || row instanceof classes.TabularSectionRow) ? row : row.row;

  const [value, setValue] = React.useState(obj[column.key]);

  React.useEffect(() => {
    function update (curr, flds){
      if(obj.equals?.(curr) || curr === obj || curr === obj?._owner?._owner) {
        setValue(obj[column.key]);
      }
    }
    obj._manager?.on({update, rows: update});
    return () => {
      obj._manager?.off({update, rows: update});
    };
  }, [obj, column.key]);

  return value ? '☑' : '☐';
}

import React from 'react';

export function RecordKindFormatter ({column, row, value, isCellEditable, tabIndex, onRowChange, raw}) {
  const text = row[column.key] < 0 ? 'Расход' : 'Приход';
  return raw ? text : <div title={text}>{text}</div>;
}

import React from 'react';
import Autocomplete from './Autocomplete';
import {onKeyUp} from './enterTab';

const options = [true, false];
const getOptionLabel = (v) => v === '' ? 'Не указано' : (v ? 'Да' : 'Нет');

export default function BooleanThreeState({obj, fld, meta, label, onChange, fullWidth=true, enterTab, ...other}) {

  let [value, setValue] = React.useState();
  if(value === undefined && obj && fld) {
    value = obj[fld];
  }
  if(!meta && obj && fld) {
    meta = obj._metadata(fld);
  }
  if(!label && label !== false && meta) {
    label = meta.synonym;
  }

  React.useEffect(() => {
    function update (curr, flds){
      if((!flds || fld in flds) && (curr === obj || obj.equals?.(curr))) {
        setValue(obj[fld]);
      }
    }
    if(value !== obj[fld]) {
      setValue(obj[fld]);
    }
    obj._manager.on({update});
    return () => {
      obj._manager.off({update});
    };
  }, [obj]);

  if(enterTab && !other.onKeyUp) {
    other.onKeyUp = onKeyUp;
  }

  return <Autocomplete
    options={options}
    onChange={(event, newValue, reason, details) => {
      if(reason === 'clear') {
        newValue = '';
      }
      obj[fld] = newValue;
      onChange?.(newValue);
      setValue(obj[fld]);
    }}
    value={value}
    label={label}
    fullWidth={fullWidth}
    disableClearable={Boolean(meta.mandatory)}
    placeholder="Не указано"
    getOptionLabel={getOptionLabel}
    {...other}
  />;
}

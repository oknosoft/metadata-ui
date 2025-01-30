import React from 'react';
import MuiAutocomplete from '../Autocomplete';
import StyledInput from './StyledInput';

const getOptionLabel = (v) => v?.presentation || v?.name || v?.toString() || '';

/**
 * @summary Висящее в воздухе поле ввода
 * @desc Это не совсем DataField.
 * Он не редактирует DataObj, но позволяет показать и выбрать из списка, значение DataObj
 */
export default function Autocomplete({label, fullWidth, disableClearable, placeholder, labelProps, noBorder, onClick, ...other}) {

  if(typeof disableClearable !== 'boolean') {
    disableClearable = true;
  }

  return <MuiAutocomplete
    disableClearable={disableClearable}
    getOptionLabel={getOptionLabel}
    renderInput={(params) => <StyledInput {...params} labelProps={labelProps} fullWidth={fullWidth} label={label} placeholder={placeholder} noBorder={noBorder} onClick={onClick}/>}
    //renderOption={(props, option, state) => <Typography key={option.ref} noWrap>{option.name}</Typography>}
    {...other}
  />;
}

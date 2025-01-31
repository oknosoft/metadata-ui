import React from 'react';
import MuiAutocomplete from '../Autocomplete';
import StyledInput from './StyledInput';

/**
 * @summary Висящее в воздухе поле ввода
 * @desc Это не совсем DataField.
 * Он не редактирует DataObj, но позволяет показать и выбрать из списка, значение DataObj
 */
export default function Autocomplete({label, fullWidth, placeholder, labelProps, noBorder, onClick, ...other}) {


  return <MuiAutocomplete
    renderInput={(params) => <StyledInput {...params} label={label} fullWidth={fullWidth} placeholder={placeholder} labelProps={labelProps}  noBorder={noBorder} onClick={onClick}/>}
    //renderOption={(props, option, state) => <Typography key={option.ref} noWrap>{option.name}</Typography>}
    {...other}
  />;
}

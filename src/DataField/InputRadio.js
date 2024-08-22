/**
 * Выбор значения из радиосписка
 *
 * @module InputRadio
 *
 * Created by Evgeniy Malyarov on 16.11.2018.
 */

import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function InputRadio({value, list, handleChange}) {
  const [v, setV] = React.useState(value);
  return <FormControl component="fieldset">
    <RadioGroup
      value={v}
      onChange={({target}) => {
        setV(target.value);
        handleChange(target.value);
      }}
    >
      {list.map((v, index) => <FormControlLabel
        key={`r-${index}`}
        value={v.value || v.ref || v}
        control={<Radio/>}
        label={v.text || v.presentation || v.value || v}
      />)}
    </RadioGroup>
  </FormControl>
}

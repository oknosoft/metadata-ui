import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function FieldSet({title = 'Группа', elevation = 0, variant, defaultExpanded, children}) {
  return <Accordion square elevation={elevation} variant={variant} disableGutters defaultExpanded={defaultExpanded}>
    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
      {title}
    </AccordionSummary>
    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>;
}

import React from 'react';
import Popover from '@mui/material/Popover';
import {styled} from '@mui/material/styles';

const Img = styled('img')({
  width: 150,
  maxHeight: 150,
  margin: -4,
  cursor: 'pointer',
});
const ImgLarge = styled('img')({
  maxWidth: 360,
  maxHeight: 360,
  margin: -4,
});

const baseUrl = $p.cch.predefinedElmnts.find({synonym: "imgs_catalog_url"})?.value;

export default function OptionImg({row}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return row.css ? <>
    <Img onClick={handleClick} src={baseUrl + row.css} />
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{vertical: 'top', horizontal: 'left'}}
      transformOrigin={{vertical: 'top', horizontal: 'left'}}
    >
      <ImgLarge src={baseUrl + row.css}/>
    </Popover>
  </> : null;
}

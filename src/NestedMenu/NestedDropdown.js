import React, { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ChevronDown from '@mui/icons-material/KeyboardArrowDown';
import { nestedMenuItemsFromObject } from './nestedMenuItemsFromObject';

export const NestedDropdown = forwardRef(function NestedDropdown(
    props,
    ref
) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { menuItemsData: data, onClick, ButtonProps, MenuProps, ...rest } = props;

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        onClick && onClick(e);
    };
    const handleClose = () => setAnchorEl(null);

    const menuItems = nestedMenuItemsFromObject({
        handleClose,
        isOpen: open,
        menuItemsData: data?.items ?? [],
    });

    return (
        <div ref={ref} {...rest}>
            <Button onClick={handleClick} endIcon={<ChevronDown />} {...ButtonProps}>
                {data?.label ?? 'Menu'}
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} {...MenuProps}>
                {menuItems}
            </Menu>
        </div>
    );
});

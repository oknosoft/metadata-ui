import React, { forwardRef } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledMenuItem = styled(MenuItem)({
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '4px',
    paddingRight: '4px',
});

const StyledTypography = styled(Typography)({
    paddingLeft: '8px',
    paddingRight: '8px',
    textAlign: 'left',
});

const FlexBox = styled(Box)({
    display: 'flex',
});

export const IconMenuItem = forwardRef(function IconMenuItem(
    { MenuItemProps, className, label, leftIcon, renderLabel, rightIcon, ...props },
    ref
) {
    return (
        <StyledMenuItem {...MenuItemProps} ref={ref} className={className} {...props}>
            <FlexBox>
                {leftIcon}
                {renderLabel ? renderLabel() : <StyledTypography>{label}</StyledTypography>}
            </FlexBox>
            {rightIcon}
        </StyledMenuItem>
    );
});

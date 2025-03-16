import React, { forwardRef, useRef, useState } from 'react';
import Menu from '@mui/material/Menu';
import { nestedMenuItemsFromObject } from './nestedMenuItemsFromObject';


export const ContextMenu = forwardRef(function ContextMenu(
    { children, menuItems, menuItemsData },
    ref
) {
    const wrapperRef = ref ?? useRef(null);

    const [menuPosition, setMenuPosition] = useState(null);

    const [mouseDownPosition, setMouseDownPosition] = useState(null);

    const handleItemClick = () => setMenuPosition(null);

    const handleMouseDown = (e) => {
        if (menuPosition !== null) setMenuPosition(null);

        if (e.button !== 2) return;

        const wrapperBounds = wrapperRef.current.getBoundingClientRect();

        if (
            e.clientX < wrapperBounds.left ||
            e.clientX > wrapperBounds.right ||
            e.clientY < wrapperBounds.top ||
            e.clientY > wrapperBounds.bottom
        ) {
            return;
        }

        setMouseDownPosition({
            left: e.clientX,
            top: e.clientY,
        });
    };

    const handleMouseUp = (e) => {
        const top = e.clientY;
        const left = e.clientX;

        if (mouseDownPosition === null) return;

        if (mouseDownPosition.top === top && mouseDownPosition.left === left) {
            setMenuPosition({
                left: e.clientX,
                top: e.clientY,
            });
        }
    };

    const menuContents =
        menuItems ??
        (menuItemsData &&
            nestedMenuItemsFromObject({
                handleClose: handleItemClick,
                isOpen: !!menuPosition,
                menuItemsData: menuItemsData,
            }));

    return (
        <div
            ref={wrapperRef}
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {menuPosition && (
                <Menu
                    onContextMenu={(e) => e.preventDefault()}
                    open={!!menuPosition}
                    onClose={() => setMenuPosition(null)}
                    anchorReference="anchorPosition"
                    anchorPosition={menuPosition}
                >
                    {menuContents}
                </Menu>
            )}
            {children}
        </div>
    );
});

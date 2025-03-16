import React from 'react';
import { IconMenuItem } from './IconMenuItem';
import { NestedMenuItem } from './NestedMenuItem';

/**
 * Create a JSX element with nested elements creating a nested menu.
 * Every menu item should have an uid provided
 */
export function nestedMenuItemsFromObject({
    menuItemsData: items,
    isOpen,
    handleClose,
}) {
    return items.map((item) => {
        const { leftIcon, rightIcon, label, items, callback, sx, disabled, delay } = item;

        if (items && items.length > 0) {
            // Recurse deeper
            return (
                <NestedMenuItem
                    key={label}
                    leftIcon={leftIcon}
                    rightIcon={rightIcon}
                    label={label}
                    parentMenuOpen={isOpen}
                    sx={sx}
                    delay={delay}
                    disabled={disabled}
                >
                    {/* Call this function to nest more items */}
                    {nestedMenuItemsFromObject({
                        handleClose,
                        isOpen,
                        menuItemsData: items,
                    })}
                </NestedMenuItem>
            );
        } else {
            // No children elements, return MenuItem
            return (
                <IconMenuItem
                    key={label}
                    leftIcon={leftIcon}
                    rightIcon={rightIcon}
                    label={label}
                    onClick={(event) => {
                        handleClose();
                        callback && callback(event, item);
                    }}
                    sx={sx}
                    disabled={disabled}
                />
            );
        }
    });
}

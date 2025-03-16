import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import Menu from '@mui/material/Menu';
import ChevronRight from '@mui/icons-material/KeyboardArrowRight';
import { IconMenuItem } from './IconMenuItem';

const NestedMenuItem = forwardRef(function NestedMenuItem(
    props,
    ref
) {
    const {
        parentMenuOpen,
        label,
        renderLabel,
        rightIcon = <ChevronRight />,
        leftIcon = null,
        children,
        className,
        tabIndex: tabIndexProp,
        ContainerProps: ContainerPropsProp = {},
        MenuProps,
        delay = 0,
        ...MenuItemProps
    } = props;

    const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp;

    const menuItemRef = useRef(null);
    useImperativeHandle(ref, () => !menuItemRef.current); // eslint-disable-line @typescript-eslint/no-non-null-assertion

    const containerRef = useRef(null);
    useImperativeHandle(containerRefProp, () => containerRef.current);

    const menuContainerRef = useRef(null);

    const timeoutRef = useRef(null);

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const handleMouseEnter = (e) => {
        timeoutRef.current = setTimeout(() => {
            if (!props.disabled) {
                setIsSubMenuOpen(true);
            }

            if (ContainerProps.onMouseEnter) {
                ContainerProps.onMouseEnter(e);
            }
        }, delay);
    };

    const handleMouseLeave = (e) => {
        timeoutRef.current && clearTimeout(timeoutRef.current);

        setIsSubMenuOpen(false);

        if (ContainerProps.onMouseLeave) {
            ContainerProps.onMouseLeave(e);
        }
    };

    // Check if any immediate children are active
    const isSubmenuFocused = () => {
        const active = containerRef.current?.ownerDocument.activeElement ?? null;
        if(menuContainerRef.current == null) {
            return false;
        }
        for (const child of menuContainerRef.current.children) {
            if (child === active) {
                return true;
            }
        }

        return false;
    };

    const handleFocus = (e) => {
        if (e.target === containerRef.current && !props.disabled) {
            setIsSubMenuOpen(true);
        }

        if (ContainerProps.onFocus) {
            ContainerProps.onFocus(e);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            return;
        }

        if (isSubmenuFocused()) {
            e.stopPropagation();
        }

        const active = containerRef.current?.ownerDocument.activeElement;

        if (e.key === 'ArrowLeft' && isSubmenuFocused()) {
            containerRef.current?.focus();
        }

        if (e.key === 'ArrowRight' && e.target === containerRef.current && e.target === active) {
            const firstChild = menuContainerRef.current?.children[0];
            firstChild?.focus();
        }
    };

    const open = isSubMenuOpen && parentMenuOpen;

    // Root element must have a `tabIndex` attribute for keyboard navigation
    let tabIndex;
    if (!props.disabled) {
        tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
    }

    return (
        <div
            {...ContainerProps}
            ref={containerRef}
            onFocus={handleFocus}
            tabIndex={tabIndex}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
        >
            <IconMenuItem
                MenuItemProps={MenuItemProps}
                className={className}
                ref={menuItemRef}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
                label={label}
                renderLabel={renderLabel}
            />

            <Menu
                // Set pointer events to 'none' to prevent the invisible Popover div
                // from capturing events for clicks and hovers
                style={{ pointerEvents: 'none' }}
                anchorEl={menuItemRef.current}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                }}
                transformOrigin={{
                    horizontal: 'left',
                    vertical: 'top',
                }}
                open={open}
                autoFocus={false}
                disableAutoFocus
                disableEnforceFocus
                onClose={() => {
                    setIsSubMenuOpen(false);
                }}
                {...MenuProps}
            >
                <div ref={menuContainerRef} style={{ pointerEvents: 'auto' }}>
                    {children}
                </div>
            </Menu>
        </div>
    );
});

NestedMenuItem.displayName = 'NestedMenuItem';
export { NestedMenuItem };

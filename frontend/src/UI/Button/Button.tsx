import React from 'react';
import c from "./Button.module.scss"
import {Omit} from 'utility-types';

export enum Colors {
    error = "error",
    success = "success",
    info = "info",
    warning = "warning",
    main = "main",
}


type BaseButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'onClick'
>;
type OnClick = React.MouseEventHandler<HTMLButtonElement>;

interface ButtonProps extends BaseButtonProps {
    variant?: Colors,
    onClick?: OnClick,
    addLoader?: boolean
}

const Button: React.FC<ButtonProps> = (
    {
        children,
        variant,
        addLoader,
        onClick,
        ...props
    }
) => {
    const classNames = [c.button]
    if (variant) {
        classNames.push(c[variant])
    }

    function onClickLoader(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const isLoadingClass = c.is_loading
        const currentClassNames = event.currentTarget.classList
        if (addLoader && !currentClassNames.contains(isLoadingClass)) {
            currentClassNames.add(isLoadingClass)
        }
        if (onClick) {
            onClick(event)
        }
    }

    return (
        <button
            {...props}
            className={classNames.join(" ")}
            onClick={(event) => onClickLoader(event)}
        >
            {children}
        </button>
    );
};

export default Button;



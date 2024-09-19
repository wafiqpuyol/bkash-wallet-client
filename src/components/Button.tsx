'use client';

import { FC, ReactNode } from 'react';

export interface IButtonProps {
    label?: string | ReactNode;
    icon?: ReactNode;
    type?: 'button' | 'submit' | 'reset' | undefined;
    id?: string;
    className?: string;
    role?: string;
    onClick?: (event?: any) => void;
    disabled?: boolean;
}

export const Button: FC<IButtonProps> = ({ id, label, icon, className, disabled, role, type, onClick }) => (
    <button
        id={id}
        type={type}
        className={className}
        role={role}
        disabled={disabled}
        onClick={onClick}
    >
        {icon} {label}
    </button>
)

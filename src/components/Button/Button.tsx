import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      isLoading = false,
      icon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const buttonClassName = [
      styles.button,
      styles[variant],
      size !== 'medium' && styles[size],
      fullWidth && styles.fullWidth,
      isLoading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={buttonClassName}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {icon && !isLoading && icon}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button'; 
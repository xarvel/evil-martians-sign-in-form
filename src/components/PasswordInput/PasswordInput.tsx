import { forwardRef, useState, InputHTMLAttributes } from 'react';
import { EyeIcon, EyeOffIcon } from '../Icons';
import styles from './PasswordInput.module.css';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ id, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={styles.passwordWrapper}>
        <input
          ref={ref}
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={`${styles.input} ${className || ''}`}
          autoComplete="current-password"
          {...props}
        />
        <button
          type="button"
          className={styles.toggleButton}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput'; 
import { ReactNode, forwardRef, InputHTMLAttributes } from 'react';
import styles from './FormField.module.css';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, label, error, required, icon, className, children, ...props }, ref) => {
    return (
      <div className={`${styles.formField} ${error ? styles.error : ''}`}>
        <label
          htmlFor={id}
          className={`${styles.label} ${required ? styles.required : ''}`}
        >
          {label}
        </label>

        {children ? (
          children
        ) : (
          <div className={styles.inputWrapper}>
            {icon && <span className={styles.inputIcon}>{icon}</span>}
            <input
              ref={ref}
              id={id}
              className={`${styles.input} ${icon ? styles.withIcon : ''} ${className || ''}`}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
              aria-errormessage={error}
              required={required}
              {...props}
            />
          </div>
        )}

        {error && (
          <div
            id={`${id}-error`}
            className={styles.errorMessage}
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

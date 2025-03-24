import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormValues, loginSchema } from '../../types/auth';
import { useAuth } from '../../hooks/useAuth';
import { FormField } from '../FormField';
import { PasswordInput } from '../PasswordInput';
import { Button } from '../Button';
import { AlertCircleIcon, EmailIcon } from '../Icons';
import styles from './LoginForm.module.css';
import {useRef, useEffect} from "react";

export const LoginForm = () => {
  const { login, isLoading, error: authError } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  useEffect(() => {
    const submitButton = submitButtonRef.current
    const form = formRef.current;

    const abortController = new AbortController();
    if(form && submitButton){
      form.addEventListener('submit', () => {
        submitButton.disabled = true

        // Fix for Firefox. It persists the dynamic disabled state without this hack.
        submitButton.setAttribute('autocomplete', 'off')

        // We are using setTimeout for page-reload submit.
        // For AJAX, use await and try-finally to enable submit the button again.
        setTimeout(() => {
          submitButton.disabled = false
        }, 2000)
      }, {
        signal: abortController.signal,
      })
    }

    return () => {
      abortController.abort();
    }
  },[])

  const onSubmit = async (data: LoginFormValues) => {
    await login(data);
  };

  return (
    <form
      ref={formRef}
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <h1 className={styles.title}>Welcome back</h1>
        <h2 className={styles.subtitle}>Sign in to your account</h2>
      </div>

      {authError && (
        <div className={styles.error} role="alert">
          <AlertCircleIcon className={styles.errorIcon} />
          <span>{authError}</span>
        </div>
      )}

      <div className={styles.formFields}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormField
              id="email"
              label="Email"
              required
              type="email"
              autoComplete="username"
              error={errors.email?.message}
              placeholder="Enter your email"
              icon={<EmailIcon />}
              {...field}
            />
          )}
        />

        <div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormField
                id="password"
                label="Password"
                required
                error={errors.password?.message}
              >
                <PasswordInput
                  id="password"
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  aria-errormessage={errors.password?.message ?? ''}
                  {...field}
                />
              </FormField>
            )}
          />

          <div className={styles.rememberMeContainer}>
            <Controller
              name="rememberMe"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <label className={styles.rememberMeLabel}>
                  <input
                    type="checkbox"
                    className={styles.rememberMeCheckbox}
                    checked={value}
                    onChange={onChange}
                    {...field}
                  />
                  Remember me
                </label>
              )}
            />
            <a href="#" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          ref={submitButtonRef}
          isLoading={isLoading}
          disabled={!isValid}
          className={styles.submitButton}
        >
          Sign In
        </Button>
      </div>

      <div className={styles.divider}>or</div>

      <Button
        variant="secondary"
        fullWidth
        type="button"
        onClick={() => window.location.href = '#'}
      >
        Continue with Google
      </Button>

      <div className={styles.footer}>
        Don't have an account?{' '}
        <a href="#signup">Sign up</a>
      </div>
    </form>
  );
};

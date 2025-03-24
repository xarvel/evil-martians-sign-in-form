import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import styles from './LoginPage.module.css';
import {authService} from "../services/auth.ts";

export const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isLoggedIn()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <LoginForm />
      </div>
    </div>
  );
};

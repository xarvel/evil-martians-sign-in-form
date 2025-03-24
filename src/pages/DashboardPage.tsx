import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import styles from './DashboardPage.module.css';

export const DashboardPage = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.container}>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard! You have successfully logged in.</p>
        <p className={styles.note}>
          This is a placeholder dashboard page to demonstrate the authentication flow.
        </p>

        <div className={styles.actions}>
          <Button
            onClick={logout}
            variant="secondary"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

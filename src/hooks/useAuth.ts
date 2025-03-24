import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFormValues } from '../types/auth';
import { authService } from '../services/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(authService.isLoggedIn());
    };
    
    checkAuth();
  }, []);

  const login = useCallback(async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(data);
      
      if (response.success && response.token) {
        authService.setToken(response.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
        return true;
      } else {
        setError(response.error || 'Authentication failed');
        return false;
      }
    } catch (err) {
      setError('An unexpected error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    authService.clearToken();
    setIsAuthenticated(false);
    navigate('/login');
  }, [navigate]);

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  };
}; 
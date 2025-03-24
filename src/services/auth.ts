import { LoginFormValues, AuthResponse } from '../types/auth';

// Constants for simulating API behavior
const MOCK_DELAY = 800; // ms
const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = 'Password1!';

export const authService = {
  login: async (data: LoginFormValues): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    if (data.email === VALID_EMAIL && data.password === VALID_PASSWORD) {
      return {
        success: true,
        token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
      };
    }

    return {
      success: false,
      error: 'Invalid email or password'
    };
  },

  setToken: (token: string): void => {
    localStorage.setItem('auth_token', token);
  },

  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  clearToken: (): void => {
    localStorage.removeItem('auth_token');
  },

  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('auth_token');
  }
};

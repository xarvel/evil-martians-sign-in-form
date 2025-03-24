import { LoginFormValues, AuthResponse } from '../types/auth';

// Constants for simulating API behavior
const MOCK_DELAY = 800; // ms
const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = 'Password1!';

/**
 * Mock authentication service - simulates API call to authenticate user
 */
export const authService = {
  /**
   * Mock login function that simulates API behavior
   */
  login: async (data: LoginFormValues): Promise<AuthResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    // Mock validation
    if (data.email === VALID_EMAIL && data.password === VALID_PASSWORD) {
      return {
        success: true,
        token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
      };
    }
    
    // Mock authentication failure
    return {
      success: false,
      error: 'Invalid email or password'
    };
  },
  
  /**
   * Store auth token in localStorage
   */
  setToken: (token: string): void => {
    localStorage.setItem('auth_token', token);
  },
  
  /**
   * Retrieve auth token from localStorage
   */
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },
  
  /**
   * Remove auth token from localStorage
   */
  clearToken: (): void => {
    localStorage.removeItem('auth_token');
  },
  
  /**
   * Check if user is logged in
   */
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('auth_token');
  }
}; 
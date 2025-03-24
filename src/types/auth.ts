import { z } from 'zod';

// Login form schema using Zod for validation
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z
    .string(),
  rememberMe: z.boolean().default(false),
  recaptcha: z.string().min(1, 'Please complete the reCAPTCHA verification'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface AuthResponse {
  success: boolean;
  token?: string;
  error?: string;
}

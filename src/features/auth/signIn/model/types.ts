import { z } from 'zod';

export const signInSchema = z.object({
	login: z.string().min(1, 'Login is required'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type SignInCredentials = z.infer<typeof signInSchema>;

export interface SignInResponse {
	userId: string;
	message: string;
	login: string;
}

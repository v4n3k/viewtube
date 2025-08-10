import { z } from 'zod';

export const signUpSchema = z
	.object({
		login: z.string().min(1, 'Login is required'),
		email: z.email('Invalid email address'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		passwordConfirmation: z
			.string()
			.min(1, 'Password confirmation is required'),
	})
	.refine(data => data.password === data.passwordConfirmation, {
		message: 'Passwords do not match',
		path: ['passwordConfirmation'],
	});

export type SignUpCredentials = z.infer<typeof signUpSchema>;

export interface SignUpResponse {
	message: string;
}

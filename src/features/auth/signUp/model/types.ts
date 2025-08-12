import { z } from 'zod';

export const signUpSchema = z
	.object({
		login: z.string().min(1, 'Login is required'),
		email: z.preprocess(
			val => (val === '' ? undefined : val),
			z.email('Invalid email address').optional()
		),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		passwordConfirmation: z
			.string()
			.min(0, 'Password confirmation is required'),
	})
	.refine(data => data.password === data.passwordConfirmation, {
		message: 'Passwords do not match',
		path: ['passwordConfirmation'],
	});

export type SignUpCredentials = z.infer<typeof signUpSchema>;

export interface SignUpResponse {
	message: string;
}

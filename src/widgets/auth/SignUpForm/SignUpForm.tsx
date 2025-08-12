'use client';

import { PATH_GENERATORS } from '@/app/routes';
import {
	SignUpButton,
	SignUpCredentials,
	signUpSchema,
	useSignUp,
} from '@/features/auth/signUp';
import { FormContainer, FormFieldConfig, Link } from '@/shared/ui';

const defaultValues: SignUpCredentials = {
	login: '',
	email: '',
	password: '',
	passwordConfirmation: '',
};

const fields: FormFieldConfig<SignUpCredentials>[] = [
	{ key: 'login', label: 'Login', placeholder: 'Choose a login' },
	{
		key: 'email',
		label: 'Email',
		type: 'email',
		placeholder: 'Enter your email',
	},
	{
		key: 'password',
		label: 'Password',
		type: 'password',
		placeholder: 'Create a password',
	},
	{
		key: 'passwordConfirmation',
		label: 'Confirm Password',
		type: 'password',
		placeholder: 'Confirm your password',
	},
];

const actions = (
	<>
		<Link href={PATH_GENERATORS.signIn()} hoverEffect='text'>
			Already have an account?
		</Link>
		<SignUpButton />
	</>
);

export const SignUpForm = () => {
	const { signUp } = useSignUp();

	const handleSubmit = (credentials: SignUpCredentials) => {
		signUp(credentials);
	};

	return (
		<FormContainer<SignUpCredentials>
			title='Sign Up'
			initialFormState={defaultValues}
			schema={signUpSchema}
			fields={fields}
			onSubmit={handleSubmit}
			actions={actions}
		/>
	);
};

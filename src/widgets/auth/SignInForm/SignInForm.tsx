'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { signInSchema } from '@/features/auth/signIn';
import { SignInCredentials, useSignIn } from '@/features/auth/signIn/model';
import { SignInButton } from '@/features/auth/signIn/ui';
import { FormContainer, FormFieldConfig, Link } from '@/shared/ui';

const fields: FormFieldConfig<SignInCredentials>[] = [
	{ key: 'login', placeholder: 'Login' },
	{ key: 'password', type: 'password', placeholder: 'Password' },
];

const actions = (
	<>
		<Link href={PATH_GENERATORS.signUp()} hoverEffect='text'>
			Don&apos;t have an account?
		</Link>
		<SignInButton />
	</>
);

export const SignInForm = () => {
	const { signIn } = useSignIn();

	const initialCredentials: SignInCredentials = {
		login: '',
		password: '',
	};

	const handleSubmit = (credentials: SignInCredentials) => {
		signIn(credentials);
	};

	return (
		<FormContainer<SignInCredentials>
			title='Sign In'
			initialFormState={initialCredentials}
			fields={fields}
			schema={signInSchema}
			onSubmit={handleSubmit}
			actions={actions}
		/>
	);
};

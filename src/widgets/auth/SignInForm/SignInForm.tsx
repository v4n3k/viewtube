'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { SignInCredentials, useSignIn } from '@/features/auth/signIn/model';
import { SignInButton } from '@/features/auth/signIn/ui';
import { SignUpCredentials } from '@/features/auth/signUp';
import { Link, TextField } from '@/shared/ui';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './SignInForm.module.css';

export const SignUpForm = () => {
	const [credentials, setCredentials] = useState<SignInCredentials>(
		{} as SignInCredentials
	);

	const { signIn } = useSignIn(credentials);

	const { login, password } = credentials;

	const handleFormChange = (
		key: keyof SignUpCredentials,
		e: ChangeEvent<HTMLInputElement>
	) => {
		setCredentials(prev => ({ ...prev, [key]: e.target.value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signIn();
	};

	return (
		<section className={styles.formContainer}>
			<h2 className={styles.title}>Sign In</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<TextField
					value={login}
					onChange={e => handleFormChange('login', e)}
					placeholder='Login'
				/>

				<TextField
					value={password}
					onChange={e => handleFormChange('password', e)}
					type='password'
					placeholder='Password'
				/>

				<div className={styles.actionsContainer}>
					<Link href={PATH_GENERATORS.signUp()} hoverEffect='text'>
						Do you have not account?
					</Link>
					<SignInButton />
				</div>
			</form>
		</section>
	);
};

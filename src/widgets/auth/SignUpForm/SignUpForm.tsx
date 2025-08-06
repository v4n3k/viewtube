'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { SignUpCredentials, useSignUp } from '@/features/auth/signUp/model';
import { SignUpButton } from '@/features/auth/signUp/ui/SignUpButton';
import { Link, TextField } from '@/shared/ui';
import { ChangeEvent, useState } from 'react';
import styles from './SignUpForm.module.css';

export const SignUpForm = () => {
	const [credentials, setCredentials] = useState<SignUpCredentials>(
		{} as SignUpCredentials
	);

	const { signUp } = useSignUp(credentials);

	const { login, email, password, passwordConfirmation } = credentials;

	const handleFormChange = (
		key: keyof SignUpCredentials,
		e: ChangeEvent<HTMLInputElement>
	) => {
		setCredentials(prev => ({ ...prev, [key]: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signUp();
	};

	return (
		<section className={styles.formContainer}>
			<h2 className={styles.title}>Sign Up</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<TextField
					value={login}
					onChange={e => handleFormChange('login', e)}
					placeholder='Login'
				/>
				<TextField
					value={email}
					onChange={e => handleFormChange('email', e)}
					type='email'
					placeholder='Email'
				/>
				<TextField
					value={password}
					onChange={e => handleFormChange('password', e)}
					type='password'
					placeholder='Password'
				/>
				<TextField
					value={passwordConfirmation}
					onChange={e => handleFormChange('passwordConfirmation', e)}
					type='password'
					placeholder='Password Confirmation'
				/>

				<div className={styles.actionsContainer}>
					<Link href={PATH_GENERATORS.signIn()} hoverEffect='text'>
						Already have account?
					</Link>
					<SignUpButton />
				</div>
			</form>
		</section>
	);
};

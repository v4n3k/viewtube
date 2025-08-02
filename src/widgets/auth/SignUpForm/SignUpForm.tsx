'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { SignUpCredentials } from '@/features/auth/signUp/model';
import { SignUpButton } from '@/features/auth/signUp/ui/SignUpButton';
import { Link, TextField } from '@/shared/ui';
import { useState } from 'react';
import styles from './SignUpForm.module.css';

export const SignUpForm = () => {
	const [credentials, setCredentials] = useState<SignUpCredentials>(
		{} as SignUpCredentials
	);

	const { username, email, password, passwordConfirmation } = credentials;

	const handleFormChange = (key: any, e: any) => {
		setCredentials(prev => ({ ...prev, [key]: e.target.value }));
	};

	return (
		<section className={styles.formContainer}>
			<h2 className={styles.title}>Sign Up</h2>
			<form className={styles.form}>
				<TextField
					value={username}
					onChange={e => handleFormChange(username, e)}
					placeholder='Username'
				/>
				<TextField
					value={email}
					onChange={e => handleFormChange(email, e)}
					type='email'
					placeholder='Email'
				/>
				<TextField
					value={password}
					onChange={e => handleFormChange(password, e)}
					type='password'
					placeholder='Password'
				/>
				<TextField
					value={passwordConfirmation}
					onChange={e => handleFormChange(passwordConfirmation, e)}
					type='password'
					placeholder='Password Confirmation'
				/>

				<div className={styles.actionsContainer}>
					<Link href={PATH_GENERATORS.signIn()} hoverEffect='text'>
						Already have account?
					</Link>
					<SignUpButton credentials={credentials} />
				</div>
			</form>
		</section>
	);
};

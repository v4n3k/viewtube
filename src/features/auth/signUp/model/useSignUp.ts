import { PATH_GENERATORS } from '@/app/routes';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signUp } from '../api/signUp';
import { SignUpCredentials } from './types';

const initialCredentials: SignUpCredentials = {
	login: '',
	nickname: '',
	password: '',
	passwordConfirmation: '',
};

export const useSignUp = () => {
	const [credentials, setCredentials] =
		useState<SignUpCredentials>(initialCredentials);

	const router = useRouter();

	const mutation = useMutation({
		mutationFn: () => signUp(credentials),

		onSuccess: data => {
			const { userId, login } = data;

			localStorage.setItem('userId', userId.toString());
			localStorage.setItem('login', login);

			setCredentials(initialCredentials);

			router.replace(PATH_GENERATORS.home());

			// toast.success('You have been signed up successfully!');
		},

		onError: () => {
			// toast.error('Error signing up');
		},
	});

	return { signUp: mutation.mutate, ...mutation, credentials, setCredentials };
};

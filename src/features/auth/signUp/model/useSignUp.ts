'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signUp } from '../api/signUp';
import { SignUpCredentials } from './types';

export const useSignUp = (credentials: SignUpCredentials) => {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: () => signUp(credentials),

		onSuccess: data => {
			const { userId, login } = data;

			localStorage.setItem('userId', userId.toString());
			localStorage.setItem('login', login);

			router.replace(PATH_GENERATORS.home());

			toast.success('You have been signed up successfully!');
		},

		onError: () => {
			toast.error('Error signing up');
		},
	});

	return {
		signUp: () => mutation.mutate(),
		...mutation,
	};
};

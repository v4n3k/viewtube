'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn as signInApi } from '../api';
import { SignInCredentials } from './types';

export const useSignIn = () => {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: (credentials: SignInCredentials) => signInApi(credentials),

		onSuccess: data => {
			const { userId, channelId } = data;

			localStorage.setItem('userId', userId);
			localStorage.setItem('channelId', channelId);

			router.replace(PATH_GENERATORS.home());

			toast.success('You have been signed in successfully!');
		},

		onError: () => {
			toast.error('Error signing in');
		},
	});

	return {
		signIn: mutation.mutate,
		...mutation,
	};
};

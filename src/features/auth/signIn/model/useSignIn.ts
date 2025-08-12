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
			// Дополнительная проверка на наличие userId
			if (!data || typeof data.userId === 'undefined') {
				console.error('API returned success, but userId is missing:', data);
				toast.error(
					`Sign-in successful, but user data incomplete. Please try again.`
				);
				// Важно: если здесь произошла ошибка, не продолжать выполнение onSuccess
				return;
			}

			const { userId } = data;

			localStorage.setItem('userId', userId.toString());

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

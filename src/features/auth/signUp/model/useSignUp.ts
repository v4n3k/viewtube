'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { signUp as signUpApi } from '../api/api';
import { SignUpCredentials } from './types';

export const useSignUp = () => {
	const mutation = useMutation({
		mutationFn: (credentials: SignUpCredentials) => signUpApi(credentials),

		onSuccess: () => {
			toast.success('You have been signed up successfully!');
		},

		onError: () => {
			toast.error('Error signing up');
		},
	});

	return {
		signUp: mutation.mutate,
		...mutation,
	};
};

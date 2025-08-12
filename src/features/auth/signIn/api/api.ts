import { api } from '@/shared/api';
import { SignInCredentials, SignInResponse } from '../model';

export const signIn = async (
	credentials: SignInCredentials
): Promise<SignInResponse> => {
	const response = await api.post('/auth/sign_in', credentials);

	return response.data;
};

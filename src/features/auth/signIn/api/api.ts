import { api } from '@/shared/api';
import { SignInCredentials, SignInResponse } from '../model';

export const signIn = (
	credentials: SignInCredentials
): Promise<SignInResponse> => {
	return api.post('/auth/sign_in', credentials);
};

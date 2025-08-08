import { api } from '@/shared/api';
import { SignUpCredentials, SignUpResponse } from '../model';

export const signUp = (
	credentials: SignUpCredentials
): Promise<SignUpResponse> => {
	return api.post('/auth/sign_up', credentials);
};

import { api } from '@/shared/api';
import { SignUpCredentials, SignUpResponse } from '../model';
import { http } from '@/shared/api/httpClient';

export const signUp = (
	credentials: SignUpCredentials,
): Promise<SignUpResponse> => {
	return http.post('/auth/sign_up', credentials);
};

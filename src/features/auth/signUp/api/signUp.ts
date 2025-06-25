import { api, handleApiResponse } from '@/shared/api';
import { SignUpCredentials, SignUpResponse } from '../model';

export const signUp = async (
	credentials: SignUpCredentials
): Promise<SignUpResponse> => {
	return handleApiResponse(api.post('/auth/sign_up', credentials));
};

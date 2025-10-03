import { api } from '@/shared/api';

export const checkAuth = async () => {
	const response = await api.get('/auth/check_token');

	return response.data;
};

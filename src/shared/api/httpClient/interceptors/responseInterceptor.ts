import type { ResponseData } from '..';

export const responseInterceptor = async <T>(
	response: ResponseData<T>,
): Promise<ResponseData<T>> => {
	if (response.status >= 400 && process.env.NODE_ENV === 'development') {
		console.error('[HTTP Error]', response.status, response.data);
	}

	if (response.status === 401 && typeof window !== 'undefined') {
		localStorage.removeItem('authToken');
	}

	return response;
};

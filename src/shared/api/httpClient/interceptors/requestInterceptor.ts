import { RequestInterceptor } from '..';

export const requestInterceptor: RequestInterceptor = config => {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('authToken');
		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			};
		}
	}

	if (process.env.NODE_ENV === 'development') {
		console.log('[HTTP Request]', config.method, config.url);
	}

	return config;
};

import { AbortError, HttpError, NetworkError, TimeoutError } from '..';

export const errorInterceptor = async (
	error: HttpError | NetworkError | TimeoutError | AbortError,
): Promise<never> => {
	if (process.env.NODE_ENV === 'development') {
		console.error('[HTTP Error]', {
			name: error.name,
			message: error.message,
		});
	}

	throw error;
};

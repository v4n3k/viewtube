import { QueryClient } from '@tanstack/react-query';

let browserQueryClient: QueryClient | undefined = undefined;

export const createQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60,
				gcTime: 1000 * 60 * 5,
				refetchOnWindowFocus: false,
				retry: 1,
			},
		},
	});
};

export const getQueryClient = () => {
	if (typeof window === 'undefined') {
		return createQueryClient();
	} else {
		if (!browserQueryClient) {
			browserQueryClient = createQueryClient();
		}
		return browserQueryClient;
	}
};

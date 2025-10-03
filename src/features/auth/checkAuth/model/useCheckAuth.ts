'use client';

import { useQuery } from '@tanstack/react-query';
import { checkAuth } from '../api';

export const useCheckAuth = () => {
	const query = useQuery({
		queryKey: ['isAuth'],
		queryFn: checkAuth,
		retry: false,
	});

	return {
		isAuth: query.data,
		...query,
	};
};

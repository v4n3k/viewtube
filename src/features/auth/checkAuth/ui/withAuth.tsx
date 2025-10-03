'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect } from 'react';
import { useCheckAuth } from '../model';

export const withAuth = (Component: ComponentType): ComponentType => {
	const WithAuthComponent = () => {
		const router = useRouter();
		const { isAuth, isLoading } = useCheckAuth();

		useEffect(() => {
			if (!isAuth && !isLoading) {
				router.replace(PATH_GENERATORS.signIn());
			}
		}, [isAuth, isLoading, router]);

		if (isLoading || !isAuth) {
			return null;
		}

		return <Component />;
	};

	return WithAuthComponent;
};

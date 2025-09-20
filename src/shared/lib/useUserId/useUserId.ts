'use client';

import { useEffect, useState } from 'react';

export const useUserId = () => {
	const [userId, setUserId] = useState<number>(NaN);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedUserId = localStorage.getItem('userId');

			if (!storedUserId) return;

			const parsedUserId = Number(storedUserId);

			if (!isNaN(parsedUserId) && parsedUserId > 0) {
				setUserId(parsedUserId);
			}
		}
	}, []);

	return userId;
};

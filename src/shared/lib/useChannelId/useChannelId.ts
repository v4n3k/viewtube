'use client';

import { useEffect, useState } from 'react';

export const useChannelId = () => {
	const [channelId, setChannelId] = useState<number | null>(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedChannelId = localStorage.getItem('channelId');

			if (!storedChannelId) {
				localStorage.setItem('channelId', '1');
				setChannelId(1);
			} else {
				setChannelId(Number(storedChannelId));
			}
		} else {
			setChannelId(1);
		}
	}, []);

	return Number(channelId);
};

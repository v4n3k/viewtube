'use client';

import { useEffect, useState } from 'react';

export const useChannelId = () => {
	const [channelId, setChannelId] = useState<number>(NaN);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedChannelId = localStorage.getItem('channelId');

			if (!storedChannelId) return;

			const parsedChannelId = Number(storedChannelId);

			if (!isNaN(parsedChannelId) && parsedChannelId > 0) {
				setChannelId(parsedChannelId);
			}
		}
	}, []);

	return channelId;
};

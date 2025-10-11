'use client';

import { useEffect, useState } from 'react';

const CHANNEL_ID_STORAGE_KEY = 'channelId';

export const useChannelId = () => {
	const [channelId, setChannelId] = useState<number>(NaN);

	useEffect(() => {
		const updateChannelId = () => {
			const stored = localStorage.getItem(CHANNEL_ID_STORAGE_KEY);
			const parsed = stored ? Number(stored) : NaN;

			if (!isNaN(parsed) && parsed > 0) {
				setChannelId(parsed);
			} else {
				setChannelId(NaN);
			}
		};

		updateChannelId();

		const handleStorageChange = () => {
			updateChannelId();
		};

		window.addEventListener('channelIdChanged', handleStorageChange);

		return () => {
			window.removeEventListener('channelIdChanged', handleStorageChange);
		};
	}, []);

	return channelId;
};

export const setChannelIdInStorage = (id: number) => {
	localStorage.setItem(CHANNEL_ID_STORAGE_KEY, String(id));

	window.dispatchEvent(new Event('channelIdChanged'));
};

'use client';

export const useChannelId = () => {
	const channelId = localStorage.getItem('channelId');

	if (!channelId) {
		localStorage.setItem('channelId', '1');
		return 1;
	}

	return Number(channelId);
};

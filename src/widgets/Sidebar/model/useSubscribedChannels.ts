'use client';

import { useEffect, useState } from 'react';

const mockSubscribedChannels = Array.from({ length: 20 }, (_, i) => ({
	id: i + 1,
	name: `Channel ${i + 1}`,
	avatar: 'https://adfasdf.jpg',
}));

const INITIAL_VISIBLE_CHANNELS = 5;

export const useSubscribedChannels = () => {
	const [subscribedChannels, setSubscribedChannels] = useState<
		| {
				id: number;
				name: string;
				avatar: string;
		  }[]
		| undefined
	>(undefined);
	const [visibleChannelsCount, setVisibleChannelsCount] = useState(
		INITIAL_VISIBLE_CHANNELS
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await new Promise(resolve => setTimeout(resolve, 500));
				setSubscribedChannels(mockSubscribedChannels);
			} catch (e) {
				setError(e as Error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleShowMore = () => {
		setVisibleChannelsCount(
			subscribedChannels ? subscribedChannels.length : INITIAL_VISIBLE_CHANNELS
		);
	};

	const handleShowFewer = () => {
		setVisibleChannelsCount(INITIAL_VISIBLE_CHANNELS);
	};

	const visibleChannels = subscribedChannels
		? subscribedChannels.slice(0, visibleChannelsCount)
		: undefined;

	const showMoreAvailable =
		subscribedChannels && visibleChannelsCount < subscribedChannels.length;

	const showFewerAvailable = visibleChannelsCount > INITIAL_VISIBLE_CHANNELS;

	return {
		subscribedChannels: visibleChannels,
		isLoading,
		error,
		handleShowMore,
		handleShowFewer,
		showMoreAvailable,
		showFewerAvailable,
	};
};

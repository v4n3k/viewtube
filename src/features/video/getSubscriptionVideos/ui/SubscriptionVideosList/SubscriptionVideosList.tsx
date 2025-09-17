'use client';

import { VideosList } from '@/entities/video/ui';
import { InfiniteScroll } from '@/shared/ui';
import { useGetSubscriptionVideos } from '../../model';

export const SubscriptionVideosList = () => {
	const {
		subscriptionVideos,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useGetSubscriptionVideos({
		limit: 6,
	});

	return (
		<InfiniteScroll
			onFetchMore={fetchNextPage}
			hasMore={hasNextPage}
			isLoading={isFetchingNextPage}
		>
			<VideosList
				title='Subscriptions'
				videos={subscriptionVideos}
				isLoading={isLoading || isFetchingNextPage}
				isError={isError}
				error={error}
			/>
		</InfiniteScroll>
	);
};

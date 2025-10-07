'use client';

import { VideoCard } from '@/entities/video/ui';
import { DataList, InfiniteScroll } from '@/shared/ui';
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
	} = useGetSubscriptionVideos();

	return (
		<InfiniteScroll
			onFetchMore={fetchNextPage}
			hasMore={hasNextPage}
			isLoading={isFetchingNextPage}
		>
			<DataList
				dataName='videos'
				title='Subscriptions'
				items={subscriptionVideos}
				isLoading={isLoading || isFetchingNextPage}
				isError={isError}
				error={error}
				ItemComponent={({ item }) => <VideoCard video={item} />}
			/>
		</InfiniteScroll>
	);
};

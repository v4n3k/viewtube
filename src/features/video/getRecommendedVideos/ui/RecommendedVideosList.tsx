'use client';

import { VideoCard } from '@/entities/video/ui';
import { DataList, InfiniteScroll } from '@/shared/ui';
import { useGetRecommendedVideos } from '../model';

export const RecommendedVideosList = () => {
	const {
		recommendedVideos,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useGetRecommendedVideos({
		limit: 6,
	});

	return (
		<InfiniteScroll
			onFetchMore={fetchNextPage}
			hasMore={hasNextPage}
			isLoading={isFetchingNextPage}
		>
			<DataList
				dataName='videos'
				title='Recommended'
				items={recommendedVideos}
				isLoading={isLoading || isFetchingNextPage}
				isError={isError}
				error={error}
				ItemComponent={({ item }) => <VideoCard video={item} />}
			/>
		</InfiniteScroll>
	);
};

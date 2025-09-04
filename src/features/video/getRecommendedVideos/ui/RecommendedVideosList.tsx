'use client';

import { VideosList } from '@/entities/video/ui';
import { InfiniteScroll } from '@/shared/ui';
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
		limit: 1,
	});

	return (
		<InfiniteScroll
			onFetchMore={fetchNextPage}
			hasMore={hasNextPage}
			isLoading={isFetchingNextPage}
		>
			<VideosList
				title='Recommended'
				videos={recommendedVideos}
				isLoading={isLoading || isFetchingNextPage}
				isError={isError}
				error={error}
			/>
		</InfiniteScroll>
	);
};

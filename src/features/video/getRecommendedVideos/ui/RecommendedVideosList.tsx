'use client';

import { Video, VideoWithoutChannel } from '@/entities/video/model/types';
import { VideoCard } from '@/entities/video/ui';
import { DataList, InfiniteScroll } from '@/shared/ui';
import { useGetRecommendedVideos } from '../model';

const VideoListItem = ({ item }: { item: Video | VideoWithoutChannel }) => (
	<VideoCard video={item} />
);

export const RecommendedVideosList = () => {
	const {
		recommendedVideos,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useGetRecommendedVideos();

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
				isLoading={isLoading}
				isError={isError}
				error={error}
				ItemComponent={VideoListItem}
			/>
		</InfiniteScroll>
	);
};

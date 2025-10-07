'use client';

import { VideoCard } from '@/entities/video/ui';
import { DataList, InfiniteScroll } from '@/shared/ui';
import { useGetLikedVideos } from '../model';

export const LikedVideosList = () => {
	const {
		likedVideos,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useGetLikedVideos();

	return (
		<InfiniteScroll
			onFetchMore={fetchNextPage}
			hasMore={hasNextPage}
			isLoading={isFetchingNextPage}
		>
			<DataList
				dataName='videos'
				title='Liked'
				items={likedVideos}
				isLoading={isLoading || isFetchingNextPage}
				isError={isError}
				error={error}
				ItemComponent={({ item }) => <VideoCard video={item} />}
			/>
		</InfiniteScroll>
	);
};

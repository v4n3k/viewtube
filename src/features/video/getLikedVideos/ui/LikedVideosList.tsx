'use client';

import { VideosList } from '@/entities/video/ui';
import { InfiniteScroll } from '@/shared/ui';
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
	} = useGetLikedVideos({
		limit: 6,
	});

	return (
		<InfiniteScroll
			onFetchMore={fetchNextPage}
			hasMore={hasNextPage}
			isLoading={isFetchingNextPage}
		>
			<VideosList
				title='Liked'
				videos={likedVideos}
				isLoading={isLoading || isFetchingNextPage}
				isError={isError}
				error={error}
			/>
		</InfiniteScroll>
	);
};

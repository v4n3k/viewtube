'use client';

import { MyVideoCard, VideosList } from '@/entities/video/ui';
import { InfiniteScroll } from '@/shared/ui';
import { useGetMyVideos } from '../../model';

export const MyVideosList = () => {
	const {
		myVideos,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useGetMyVideos({
		limit: 6,
	});

	return (
		<InfiniteScroll
			onFetchMore={fetchNextPage}
			hasMore={hasNextPage}
			isLoading={isFetchingNextPage}
		>
			<VideosList
				title='My videos'
				videos={myVideos}
				isLoading={isLoading || isFetchingNextPage}
				isError={isError}
				error={error}
				layout='verticalList'
				gap='xl'
				VideoCardComponent={MyVideoCard}
			/>
		</InfiniteScroll>
	);
};

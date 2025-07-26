'use client';

import { VideosList } from '@/entities/video/ui';
import { InfiniteScroll } from '@/shared/ui';
import { useGetSavedVideos } from '../model';

export const SavedVideosList = () => {
	const {
		savedVideos,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useGetSavedVideos({
		limit: 6,
	});

	return (
		<InfiniteScroll
			onFetchMore={fetchNextPage}
			hasMore={hasNextPage}
			isLoading={isFetchingNextPage}
		>
			<VideosList
				title='Watch later'
				videos={savedVideos}
				isLoading={isLoading || isFetchingNextPage}
				isError={isError}
				error={error}
			/>
		</InfiniteScroll>
	);
};

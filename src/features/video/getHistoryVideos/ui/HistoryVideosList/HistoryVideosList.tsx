'use client';

import { VideosList } from '@/entities/video/ui';
import { InfiniteScroll } from '@/shared/ui';
import { useGetHistoryVideos } from '../../model';

export const HistoryVideosList = () => {
	const {
		historyVideos,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useGetHistoryVideos({
		limit: 6,
	});

	return (
		<InfiniteScroll
			onFetchMore={fetchNextPage}
			hasMore={hasNextPage}
			isLoading={isFetchingNextPage}
		>
			<VideosList
				title='History'
				videos={historyVideos}
				isLoading={isLoading}
				isError={isError}
				error={error}
			/>
		</InfiniteScroll>
	);
};

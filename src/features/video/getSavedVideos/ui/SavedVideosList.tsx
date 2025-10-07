'use client';

import { VideoCard } from '@/entities/video/ui';
import { DataList, InfiniteScroll } from '@/shared/ui';
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
	} = useGetSavedVideos();

	return (
		<InfiniteScroll
			onFetchMore={fetchNextPage}
			hasMore={hasNextPage}
			isLoading={isFetchingNextPage}
		>
			<DataList
				dataName='videos'
				title='Watch later'
				items={savedVideos}
				isLoading={isLoading || isFetchingNextPage}
				isError={isError}
				error={error}
				ItemComponent={({ item }) => <VideoCard video={item} />}
			/>
		</InfiniteScroll>
	);
};

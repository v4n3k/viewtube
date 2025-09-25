'use client';

import { DataList, InfiniteScroll } from '@/shared/ui';
import { useParams } from 'next/navigation';
import { useGetChannelVideos } from '../../model';
import { VideoCard } from '@/entities/video/ui';

export const ChannelVideosList = () => {
	const channelId = Number(useParams()?.channelId);

	const {
		channelVideos,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useGetChannelVideos({
		channelId,
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
				items={channelVideos}
				isLoading={isLoading || isFetchingNextPage}
				isError={isError}
				error={error}
				ItemComponent={({ item }) => <VideoCard video={item} />}
			/>
		</InfiniteScroll>
	);
};

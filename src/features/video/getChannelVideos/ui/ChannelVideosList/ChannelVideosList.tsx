'use client';

import { VideoCard } from '@/entities/video/ui';
import { DataList, InfiniteScroll } from '@/shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useGetChannelVideos } from '../../model';

export const ChannelVideosList = () => {
	const channelId = Number(useParams()?.channelId);
	const queryClient = useQueryClient();

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

	const channelData = queryClient.getQueryData([
		'channel',
		channelId,
		channelId,
	]);

	if (!channelData) return null;

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

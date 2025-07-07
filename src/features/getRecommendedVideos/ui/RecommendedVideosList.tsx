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
		limit: 6,
	});

	if (isLoading) {
		return <div>Загрузка видео...</div>;
	}

	if (isError) {
		return <div>Ошибка загрузки видео: {error?.message}</div>;
	}

	return (
		<InfiniteScroll
			onFetchMore={fetchNextPage}
			hasMore={hasNextPage}
			isLoading={isFetchingNextPage}
		>
			<VideosList videos={recommendedVideos} />
		</InfiniteScroll>
	);
};

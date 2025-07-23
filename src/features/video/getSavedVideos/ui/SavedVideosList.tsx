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
			<VideosList title='Смотреть позже' videos={savedVideos} />
		</InfiniteScroll>
	);
};

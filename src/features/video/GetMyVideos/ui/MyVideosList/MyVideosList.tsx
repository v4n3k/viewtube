'use client';

import { MyVideoCard } from '@/entities/video/ui';
import { DataList, InfiniteScroll } from '@/shared/ui';
import { useGetMyVideos } from '../../model';

interface MyVideosListProps {
	onEdit: (videoId: number) => void;
	onDelete: (videoId: number) => void;
}

export const MyVideosList = ({ onEdit, onDelete }: MyVideosListProps) => {
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
			<DataList
				dataName='videos'
				title='My videos'
				items={myVideos}
				isLoading={isLoading || isFetchingNextPage}
				isError={isError}
				error={error}
				layout='verticalList'
				gap='xl'
				ItemComponent={({ item, ...props }) => (
					<MyVideoCard
						video={item}
						onDelete={onDelete}
						onEdit={onEdit}
						{...props}
					/>
				)}
			/>
		</InfiniteScroll>
	);
};

'use client';

import { VideoActionHandler } from '@/entities/video/model';
import { MyVideoCard } from '@/entities/video/ui';
import { DataList, InfiniteScroll } from '@/shared/ui';
import { useGetMyVideos } from '../../model';

interface MyVideosListProps {
	onEdit: VideoActionHandler;
	onDelete: VideoActionHandler;
	onToggleVisibility: VideoActionHandler;
}

export const MyVideosList = ({
	onEdit,
	onToggleVisibility,
	onDelete,
}: MyVideosListProps) => {
	const {
		myVideos,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useGetMyVideos();

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
						onToggleVisibility={onToggleVisibility}
						{...props}
					/>
				)}
			/>
		</InfiniteScroll>
	);
};

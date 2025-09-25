'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { useDeleteVideo } from '@/features/video/deleteVideo';
import { MyVideosList } from '@/features/video/GetMyVideos';
import { useRouter } from 'next/navigation';

export const MyVideosManager = () => {
	const router = useRouter();

	const { deleteVideo } = useDeleteVideo();

	const handleEditClick = (channelId: number) => {
		router.push(PATH_GENERATORS.editChannel(channelId));
	};

	return <MyVideosList onEdit={handleEditClick} onDelete={deleteVideo} />;
};

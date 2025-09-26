'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { useDeleteVideo } from '@/features/video/deleteVideo';
import { MyVideosList } from '@/features/video/GetMyVideos';
import { ConfirmModal } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const MyVideosManager = () => {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [videoIdToDelete, setVideoIdToDelete] = useState<number | null>(null);

	const { deleteVideo } = useDeleteVideo();

	const handleEditClick = (channelId: number) => {
		router.push(PATH_GENERATORS.editChannel(channelId));
	};

	const handleDeleteClick = (channelId: number) => {
		setIsModalOpen(true);
		setVideoIdToDelete(channelId);
	};

	const handleConfirmDelete = () => {
		if (videoIdToDelete === null) return;

		deleteVideo(videoIdToDelete);
		setIsModalOpen(false);
		setVideoIdToDelete(null);
	};

	const handleCancelDelete = () => {
		setIsModalOpen(false);
		setVideoIdToDelete(null);
	};

	return (
		<>
			<MyVideosList onEdit={handleEditClick} onDelete={handleDeleteClick} />
			<ConfirmModal
				isOpen={isModalOpen}
				title='Delete video'
				description='Are you sure you want to delete this video?'
				onClose={handleCancelDelete}
				onConfirm={handleConfirmDelete}
			/>
		</>
	);
};

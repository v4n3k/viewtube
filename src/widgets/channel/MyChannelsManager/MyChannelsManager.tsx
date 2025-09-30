'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { MyChannelsList } from '@/entities/channel/ui';
import { useDeleteChannel } from '@/features/channel/deleteChannel';
import { useGetMyChannels } from '@/features/channel/getMyChannels';
import { Button, ConfirmModal, Show } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './MyChannelsManager.module.css';

const MAX_CHANNELS_COUNT = 3;

export const MyChannelsManager = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [channelIdToDelete, setChannelIdToDelete] = useState<number | null>(
		null
	);

	const router = useRouter();

	const { myChannels } = useGetMyChannels();
	const { deleteChannel, isSuccess: isDeleteSuccess } = useDeleteChannel();

	const handleSelect = (channelId: number) => {
		localStorage.setItem('channelId', String(channelId));
	};

	const handleDeleteClick = (channelId: number) => {
		setChannelIdToDelete(channelId);
		setIsModalOpen(true);
	};

	const handleConfirmDelete = () => {
		if (channelIdToDelete !== null) {
			deleteChannel(channelIdToDelete);
			setIsModalOpen(false);
			setChannelIdToDelete(null);
		}
	};

	const handleCreate = () => {
		router.push(PATH_GENERATORS.createChannel());
	};

	const handleCancelDelete = () => {
		setIsModalOpen(false);
		setChannelIdToDelete(null);
	};

	if (!myChannels) return null;

	return (
		<div className={styles.myChannelsManager}>
			<MyChannelsList
				channels={myChannels}
				onSelect={handleSelect}
				onDelete={handleDeleteClick}
				isDeleteSuccess={isDeleteSuccess}
			/>
			<Show when={myChannels.length < MAX_CHANNELS_COUNT}>
				<Button onClick={handleCreate}>Create new channel</Button>
			</Show>

			<ConfirmModal
				isOpen={isModalOpen}
				title='Delete channel?'
				description='	This action cannot be undone. All content in this channel will be
					permanently deleted.'
				onClose={handleCancelDelete}
				onConfirm={handleConfirmDelete}
			/>
		</div>
	);
};

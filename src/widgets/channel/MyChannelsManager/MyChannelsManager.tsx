'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { MyChannelsList } from '@/entities/channel/ui';
import { useGetMyChannels } from '@/features/channel/getMyChannels/model';
import { Button, Show } from '@/shared/ui';
import { useRouter } from 'next/navigation';

import styles from './MyChannelsManager.module.css';

export const MyChannelsManager = () => {
	const router = useRouter();
	const { myChannels } = useGetMyChannels();

	const handleSelect = (channelId: number) => {
		localStorage.setItem('channelId', String(channelId));
	};

	const handleDelete = (channelId: number) => {
		console.log('delete channel', channelId); // TODO: delete channel
	};

	const handleCreate = () => {
		router.push(PATH_GENERATORS.createChannel());
	};

	if (!myChannels) return null;

	return (
		<div className={styles.myChannelsManager}>
			<MyChannelsList
				channels={myChannels}
				onSelect={handleSelect}
				onDelete={handleDelete}
			/>
			<Show when={myChannels.length < 3}>
				<Button onClick={handleCreate}>Create new channel</Button>
			</Show>
		</div>
	);
};

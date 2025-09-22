import { useChannelId } from '@/shared/lib';
import { useEffect, useState } from 'react';
import { Channel } from '../../model';
import { MyChannelCard } from '../MyChannelCard';
import styles from './MyChannelsList.module.css';

interface MyChannelsListProps {
	channels: Channel[];
	onSelect: (channelId: number) => void;
	onDelete: (channelId: number) => void;
	isDeleteSuccess: boolean;
}

export const MyChannelsList = ({
	channels,
	onSelect,
	onDelete,
	isDeleteSuccess,
}: MyChannelsListProps) => {
	const initialChannelId = useChannelId();
	const [selectedChannelId, setSelectedChannelId] = useState<number>(NaN);
	const [deletedChannelId, setDeletedChannelId] = useState<number>(NaN);

	useEffect(() => {
		if (!isNaN(selectedChannelId) || isNaN(initialChannelId)) {
			return;
		}
		setSelectedChannelId(initialChannelId);
	}, [initialChannelId, selectedChannelId]);

	useEffect(() => {
		if (!isDeleteSuccess || isNaN(deletedChannelId)) {
			return;
		}

		if (deletedChannelId !== selectedChannelId) {
			setDeletedChannelId(NaN);
			return;
		}

		const remainingChannels = channels.filter(
			channel => channel.id !== deletedChannelId
		);

		if (remainingChannels.length === 0) {
			setDeletedChannelId(NaN);
			return;
		}

		const newestChannel = remainingChannels.reduce((prev, curr) =>
			curr.id > prev.id ? curr : prev
		);

		setSelectedChannelId(newestChannel.id);
		onSelect(newestChannel.id);

		setDeletedChannelId(NaN);
	}, [
		deletedChannelId,
		selectedChannelId,
		isDeleteSuccess,
		channels,
		onSelect,
	]);

	const handleSelect = (channelId: number) => {
		setSelectedChannelId(channelId);
		onSelect(channelId);
	};

	const handleDelete = (channelId: number) => {
		if (channelId === selectedChannelId) {
			setDeletedChannelId(channelId);
		}
		onDelete(channelId);
	};

	return (
		<section className={styles.myChannelsListSection}>
			<h2 className={styles.title}>My channels</h2>
			<ul className={styles.list}>
				{channels.map(channel => (
					<MyChannelCard
						key={channel.id}
						channel={channel}
						isSelected={channel.id === selectedChannelId}
						onSelect={handleSelect}
						onDelete={handleDelete}
					/>
				))}
			</ul>
		</section>
	);
};

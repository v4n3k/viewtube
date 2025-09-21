import { useChannelId } from '@/shared/lib';
import { useEffect, useState } from 'react';
import { Channel } from '../../model';
import { MyChannelCard } from '../MyChannelCard';
import styles from './MyChannelsList.module.css';

interface MyChannelsListProps {
	channels: Channel[];
	onSelect: (channelId: number) => void;
	onDelete: (channelId: number) => void;
}

export const MyChannelsList = ({
	channels,
	onSelect,
	onDelete,
}: MyChannelsListProps) => {
	const initialChannelId = useChannelId();
	const [selectedChannelId, setSelectedChannelId] = useState<number>(NaN);

	useEffect(() => {
		if (!isNaN(selectedChannelId) || isNaN(initialChannelId)) {
			return;
		}
		setSelectedChannelId(initialChannelId);
	}, [initialChannelId, selectedChannelId]);

	const handleSelect = (channelId: number) => {
		setSelectedChannelId(channelId);
		onSelect(channelId);
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
						onDelete={onDelete}
					/>
				))}
			</ul>
		</section>
	);
};

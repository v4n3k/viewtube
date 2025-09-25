import { useChannelId } from '@/shared/lib';
import { DataList } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { Channel } from '../../model';
import { MyChannelCard } from '../MyChannelCard';

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
		const initSelectedChannel = () => {
			if (!isNaN(selectedChannelId) || isNaN(initialChannelId)) {
				return;
			}
			setSelectedChannelId(initialChannelId);
		};

		initSelectedChannel();
	}, [initialChannelId, selectedChannelId]);

	useEffect(() => {
		const handleAutoSelectAfterDelete = () => {
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
		};

		handleAutoSelectAfterDelete();
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
		<>
			<DataList
				dataName='channels'
				title='My channels'
				items={channels}
				layout='verticalList'
				ItemComponent={({ item }) => (
					<MyChannelCard
						channel={item}
						isSelected={item.id === selectedChannelId}
						onSelect={handleSelect}
						onDelete={handleDelete}
					/>
				)}
			/>
		</>
	);
};

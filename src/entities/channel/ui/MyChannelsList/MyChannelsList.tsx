import { useChannelId } from '@/shared/lib';
import { DataList } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { Channel } from '../../model';
import { MyChannelCard } from '../MyChannelCard';

interface MyChannelsListProps {
	channels: Channel[];
	onSelect: (channelId: number) => Promise<Channel>;
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
	const [pendingChannelId, setPendingChannelId] = useState<number | null>(null);

	useEffect(() => {
		const initializeSelectedChannel = () => {
			if (isNaN(selectedChannelId) && !isNaN(initialChannelId)) {
				setSelectedChannelId(initialChannelId);
			}
		};

		initializeSelectedChannel();
	}, [initialChannelId, selectedChannelId]);

	useEffect(() => {
		const autoSelectChannelAfterDeletion = () => {
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

		autoSelectChannelAfterDeletion();
	}, [
		deletedChannelId,
		selectedChannelId,
		isDeleteSuccess,
		channels,
		onSelect,
	]);

	const handleSelect = async (channelId: number) => {
		if (pendingChannelId || channelId === selectedChannelId) {
			return;
		}

		const previousSelectedChannelId = selectedChannelId;

		setSelectedChannelId(channelId);
		setPendingChannelId(channelId);

		try {
			await onSelect(channelId);
		} catch {
			setSelectedChannelId(previousSelectedChannelId);
		} finally {
			setPendingChannelId(null);
		}
	};

	const handleDelete = (channelId: number) => {
		if (channelId === selectedChannelId) {
			setDeletedChannelId(channelId);
		}
		onDelete(channelId);
	};

	return (
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
	);
};

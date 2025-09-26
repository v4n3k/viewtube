'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { ChannelBanner } from '@/entities/channel/ui';
import { useGetChannel } from '@/features/channel/getChannel';
import { SubscribeToChannelButton } from '@/features/channel/subscribeToChannel';
import { useChannelId } from '@/shared/lib';
import {
	Avatar,
	Button,
	CircularLoader,
	Divider,
	ExpandableText,
	Show,
} from '@/shared/ui';
import { EditIcon, PlusIcon, SwitchIcon, TrashIcon } from '@/shared/ui/icons';
import { useParams, useRouter } from 'next/navigation';
import styles from './ChannelHeader.module.css';

const ICON_SIZE = 16;

export const ChannelHeader = () => {
	const router = useRouter();

	const channelId = useChannelId();
	const paramsChannelId = Number(useParams()?.channelId);

	const { channel, isLoading } = useGetChannel(paramsChannelId);

	const handleCreateClick = () => {
		router.push(PATH_GENERATORS.createChannel());
	};

	if (!channel && !isLoading)
		return (
			<div className={styles.noChannelContainer}>
				<p className={styles.noChannelText}>You don't have a channel</p>
				<Button onClick={handleCreateClick}>
					<PlusIcon size={ICON_SIZE} />
					Create channel
				</Button>
			</div>
		);

	if (!channel || isLoading) {
		return <CircularLoader onFullScreen />;
	}

	const {
		name,
		description,
		avatarUrl,
		bannerUrl,
		subscribersCount,
		videosCount,
		isSubscribed,
	} = channel;

	const isOwner = paramsChannelId === channelId;
	const isGuest = paramsChannelId !== channelId;

	const handleEditClick = () => {
		router.push(PATH_GENERATORS.editChannel(paramsChannelId));
	};

	const handleSwitchClick = () => {
		router.push(PATH_GENERATORS.myChannels());
	};

	const handleDeleteClick = () => {
		console.log('delete channel');
	};

	return (
		<Show
			when={channel && !isLoading}
			fallback={<CircularLoader onFullScreen />}
		>
			<header className={styles.channelHeader}>
				<div className={styles.container}>
					<ChannelBanner url={bannerUrl} />
					<div className={styles.channelInfo}>
						<Avatar size='2xl' src={avatarUrl} />
						<div className={styles.info}>
							<h2 className={styles.name}>{name}</h2>
							<div className={styles.stats}>
								<span>{subscribersCount} subscribers</span>
								<span>•</span>
								<span>{videosCount} videos</span>
							</div>
							<ExpandableText className={styles.description} maxLines={2}>
								{description}
							</ExpandableText>

							<Show when={isGuest}>
								<SubscribeToChannelButton
									isSubscribed={isSubscribed}
									subscribedToChannelId={paramsChannelId}
								/>
							</Show>

							<Show when={isOwner}>
								<div className={styles.channelActions}>
									<Button onClick={handleSwitchClick}>
										<SwitchIcon size={ICON_SIZE} />
										Switch Channel
									</Button>
									<Button
										background='outlined'
										variant='secondary'
										onClick={handleEditClick}
									>
										<EditIcon size={ICON_SIZE} />
										Edit Channel
									</Button>
									<Button
										background='outlined'
										variant='success'
										onClick={handleCreateClick}
									>
										<PlusIcon size={ICON_SIZE} />
										Create New
									</Button>

									<Button
										background='outlined'
										variant='danger'
										onClick={handleDeleteClick}
									>
										<TrashIcon size={ICON_SIZE} />
										Delete Channel
									</Button>
								</div>
							</Show>
						</div>
					</div>
				</div>
			</header>
			<Divider />
		</Show>
	);
};

'use client';

import { ChannelBanner } from '@/entities/channel/ui';
import { useGetChannel } from '@/features/channel/getChannel';
import { SubscribeToChannelButton } from '@/features/channel/subscribeToChannel';
import { useChannelId } from '@/shared/lib';
import { Avatar, ExpandableText } from '@/shared/ui';
import styles from './ChannelHeader.module.css';

export const ChannelHeader = () => {
	const channelId = useChannelId();

	const { channel } = useGetChannel(channelId);

	if (!channel) return null;

	const {
		name,
		description,
		avatarUrl,
		bannerUrl,
		subscribersCount,
		videosCount,
	} = channel;

	return (
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
						<ExpandableText className={styles.description} maxLines={1}>
							{description}
						</ExpandableText>
						<SubscribeToChannelButton
							isSubscribed={true}
							subscribedToChannelId={channelId}
						/>
					</div>
				</div>
			</div>
		</header>
	);
};

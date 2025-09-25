import { PATH_GENERATORS } from '@/app/routes';
import { Channel } from '@/entities/channel/model';
import { formatNumber } from '@/shared/lib';
import { Avatar, Link } from '@/shared/ui';
import { ReactNode } from 'react';
import styles from './ChannelOverview.module.css';

interface ChannelOverviewProps
	extends Pick<Channel, 'id' | 'avatarUrl' | 'name' | 'subscribersCount'> {
	renderSubscriptionButton: () => ReactNode;
}

export const ChannelOverview = ({
	id,
	avatarUrl,
	name,
	subscribersCount,
	renderSubscriptionButton,
}: ChannelOverviewProps) => {
	const formattedSubscribersCount = formatNumber(subscribersCount);

	return (
		<div className={styles.channelOverview}>
			<Link href={PATH_GENERATORS.channel(id)} hoverEffect='text'>
				<Avatar src={avatarUrl} size='xl' />
			</Link>
			<div>
				<Link href={PATH_GENERATORS.channel(id)} hoverEffect='text'>
					{name}
				</Link>
				<span>{formattedSubscribersCount} subscribers</span>
			</div>
			{renderSubscriptionButton()}
		</div>
	);
};

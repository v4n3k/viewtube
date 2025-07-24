import { PATH_GENERATORS } from '@/app/routes';
import { Channel } from '@/entities/channel/model';
import { formatNumber } from '@/shared/lib';
import { Avatar, Link } from '@/shared/ui';
import styles from './ChannelOverview.module.css';

interface ChannelOverviewProps
	extends Pick<Channel, 'id' | 'avatarUrl' | 'name' | 'subscriptionsCount'> {}

export const ChannelOverview = ({
	id,
	avatarUrl,
	name,
	subscriptionsCount,
}: ChannelOverviewProps) => {
	const formattedSubscriptionsCount = formatNumber(subscriptionsCount);

	return (
		<div className={styles.channelOverview}>
			<Link href={PATH_GENERATORS.channel(id)} hoverEffect='text'>
				<Avatar src='' size='xl' />
			</Link>
			<div>
				<Link href={PATH_GENERATORS.channel(id)} hoverEffect='text'>
					{name}
				</Link>
				<span>{formattedSubscriptionsCount} subscribers</span>
			</div>
		</div>
	);
};

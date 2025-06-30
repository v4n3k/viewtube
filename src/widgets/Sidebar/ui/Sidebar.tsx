'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { Button, Show } from '@/shared/ui';
import { useSubscribedChannels } from '../model';
import {
	ArrowDownIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	HistoryIcon,
	HomeIcon,
	LikedVideosIcon,
	MyVideosIcon,
	SubscriptionsIcon,
	WatchLaterIcon,
} from '../ui/SidebarIcons';
import { SidebarLink } from '../ui/SidebarLink/SidebarLink';
import { SidebarSection } from '../ui/SidebarSection/SidebarSection';
import styles from './Sidebar.module.css';

const ICON_SIZE = 24;

const imgPlaceholderUrl =
	'https://culturetrekking.com/images/img_NJ8iq1DB6tsS96NB1RvB7w/adobestock_386572510.jpeg?fit=outside&w=1600&h=1066';

export const Sidebar = () => {
	const {
		subscribedChannels,
		error,
		handleShowMore,
		handleShowFewer,
		showMoreAvailable,
		showFewerAvailable,
	} = useSubscribedChannels();

	return (
		<aside className={styles.sidebar}>
			<SidebarSection>
				<SidebarLink href={PATH_GENERATORS.home()} Icon={HomeIcon}>
					Home
				</SidebarLink>
				<SidebarLink
					href={PATH_GENERATORS.subscriptions()}
					Icon={SubscriptionsIcon}
				>
					Subscriptions
				</SidebarLink>
			</SidebarSection>

			<SidebarSection>
				<SidebarLink
					href={PATH_GENERATORS.channel(1)}
					Icon={ArrowRightIcon}
					iconPosition='right'
				>
					You
				</SidebarLink>
				<SidebarLink href={PATH_GENERATORS.history()} Icon={HistoryIcon}>
					History
				</SidebarLink>
				<SidebarLink href={PATH_GENERATORS.myVideos()} Icon={MyVideosIcon}>
					My videos
				</SidebarLink>
				<SidebarLink href={PATH_GENERATORS.watchLater()} Icon={WatchLaterIcon}>
					Watch later
				</SidebarLink>
				<SidebarLink
					href={PATH_GENERATORS.likedVideos()}
					Icon={LikedVideosIcon}
				>
					Liked videos
				</SidebarLink>
			</SidebarSection>

			<SidebarSection title='Subscriptions' withoutDivider>
				<Show when={error}>{e => <div>Error: {e.message}</div>}</Show>

				{subscribedChannels?.map(channel => (
					<SidebarLink
						key={channel.id}
						href={PATH_GENERATORS.channel(channel.id)}
					>
						<img className={styles.channelAvatar} src={imgPlaceholderUrl} />
						{channel.name}
					</SidebarLink>
				))}
				<Show when={showMoreAvailable}>
					<Button variant='text' fullWidth onClick={handleShowMore}>
						<ArrowDownIcon size={ICON_SIZE} />
						Show more
					</Button>
				</Show>

				<Show when={showFewerAvailable}>
					<Button variant='text' fullWidth onClick={handleShowFewer}>
						<ArrowUpIcon size={ICON_SIZE} />
						Show fewer
					</Button>
				</Show>
			</SidebarSection>
		</aside>
	);
};

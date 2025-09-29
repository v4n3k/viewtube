'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { ThemeToggle } from '@/features/theme/toggleTheme';
import { useChannelId } from '@/shared/lib';
import {
	ArrowRightIcon,
	HistoryIcon,
	HomeIcon,
	LikedVideosIcon,
	MyChannelsIcon,
	MyVideosIcon,
	SubscriptionsIcon,
	WatchLaterIcon,
} from '@/shared/ui/icons';

import { SidebarLink } from '../ui/SidebarLink/SidebarLink';
import { SidebarSection } from '../ui/SidebarSection/SidebarSection';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
	const channelId = useChannelId();

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
					href={PATH_GENERATORS.channel(channelId)}
					Icon={ArrowRightIcon}
					iconPosition='right'
				>
					You
				</SidebarLink>
				<SidebarLink href={PATH_GENERATORS.myVideos()} Icon={MyVideosIcon}>
					My videos
				</SidebarLink>
				<SidebarLink href={PATH_GENERATORS.myChannels()} Icon={MyChannelsIcon}>
					My channels
				</SidebarLink>
				<SidebarLink href={PATH_GENERATORS.history()} Icon={HistoryIcon}>
					History
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

			<SidebarSection title='Theme' withoutDivider>
				<ThemeToggle />
			</SidebarSection>
		</aside>
	);
};

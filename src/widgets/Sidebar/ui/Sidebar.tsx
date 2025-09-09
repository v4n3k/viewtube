'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { Avatar, Button, Show } from '@/shared/ui';
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
} from '@/shared/ui/icons';
import { useSubscribedChannels } from '../model';
import { SidebarLink } from '../ui/SidebarLink/SidebarLink';
import { SidebarSection } from '../ui/SidebarSection/SidebarSection';
import styles from './Sidebar.module.css';
import { ToggleThemeButton } from '@/features/theme/toggleTheme';

const ICON_SIZE = 24;

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

			<SidebarSection title='Theme' withoutDivider>
				<ToggleThemeButton />
			</SidebarSection>
		</aside>
	);
};

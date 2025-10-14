'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { ThemeToggle } from '@/features/theme/toggleTheme';
import { useChannelId, useSidebarStore } from '@/shared/lib';
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
import { Show } from '@/shared/ui';
import clsx from 'clsx';
import { SidebarLink } from '../ui/SidebarLink/SidebarLink';
import { SidebarSection } from '../ui/SidebarSection/SidebarSection';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
	const channelId = useChannelId();
	const isSidebarExpanded = useSidebarStore(state => state.isSidebarExpanded);

	return (
		<aside
			className={clsx(styles.sidebar, { [styles.expanded]: isSidebarExpanded })}
		>
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

			<SidebarSection withoutDivider={!isSidebarExpanded}>
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

			<Show when={isSidebarExpanded}>
				<SidebarSection title='Theme' withoutDivider>
					<ThemeToggle />
				</SidebarSection>
			</Show>
		</aside>
	);
};

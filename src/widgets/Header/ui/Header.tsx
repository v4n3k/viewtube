'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { useCheckAuth } from '@/features/auth/checkAuth';
import { useGetChannel } from '@/features/channel/getChannel';
import { useChannelId } from '@/shared/lib';
import { Avatar, Button, Link, Show } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { GoPlus } from 'react-icons/go';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './Header.module.css';
import { SearchBox } from './SearchBox';

export const Header = () => {
	const router = useRouter();
	const channelId = useChannelId();

	const { channel } = useGetChannel(channelId);
	const { isAuth } = useCheckAuth();

	const handleCreateClick = () => {
		router.push(PATH_GENERATORS.upload());
	};

	const handleAvatarClick = () => {
		router.push(PATH_GENERATORS.channel(channelId));
	};

	const handleSignInClick = () => {
		router.push(PATH_GENERATORS.signIn());
	};

	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<Button className={styles.toggleSidebarButton} background='transparent'>
					<RxHamburgerMenu size={20} />
				</Button>
				<Link href={PATH_GENERATORS.home()} hoverEffect='text'>
					ViewTube
				</Link>
			</div>

			<SearchBox />

			<Show when={channelId}>
				<div className={styles.right}>
					<Button onClick={handleCreateClick}>
						<GoPlus size={28} />
						Upload video
					</Button>
					<Avatar
						className={styles.avatar}
						src={channel?.avatarUrl || ''}
						size='lg'
						onClick={handleAvatarClick}
					/>
				</div>
			</Show>
			<Show when={!channelId && isAuth}>
				<Button onClick={handleCreateClick}>
					<GoPlus size={28} />
					Create channel
				</Button>
			</Show>
			<Show when={!isAuth}>
				<Button onClick={handleSignInClick}>Sign in</Button>
			</Show>
		</header>
	);
};

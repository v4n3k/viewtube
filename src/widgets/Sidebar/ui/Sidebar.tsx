import { PATH_GENERATORS } from '@/app/routes';
import { Button, Divider, Link } from '@/shared/ui';
import { BiLike } from 'react-icons/bi';
import { FiClock } from 'react-icons/fi';
import { GoVideo } from 'react-icons/go';
import { MdHistory, MdOutlineSubscriptions } from 'react-icons/md';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';
import { SlHome } from 'react-icons/sl';
import styles from './Sidebar.module.css';

const subscribedChannels = [
	{ id: 1, name: 'Channel 1', avatar: 'https://adfasdf.jpg' },
	{ id: 2, name: 'Channel 2', avatar: 'https://adfasdf.jpg' },
	{ id: 3, name: 'Channel 3', avatar: 'https://adfasdf.jpg' },
	{ id: 4, name: 'Channel 4', avatar: 'https://adfasdf.jpg' },
];

const ICON_SIZE = 24;

const mockUserId = 1;

export const Sidebar = () => {
	return (
		<aside className={styles.sidebar}>
			<nav>
				<ul>
					<li>
						<Link href={PATH_GENERATORS.home()}>
							<SlHome size={ICON_SIZE} />
							Home
						</Link>
					</li>
					<li>
						<Link href={PATH_GENERATORS.subscriptions()}>
							<MdOutlineSubscriptions size={ICON_SIZE} />
							Subsriptions
						</Link>
					</li>
				</ul>
			</nav>

			<Divider />

			<nav>
				<ul>
					<li>
						<Link href={PATH_GENERATORS.channel(mockUserId)}>
							You
							<RiArrowRightSLine size={ICON_SIZE} />
						</Link>
					</li>
					<li>
						<Link href={PATH_GENERATORS.history()}>
							<MdHistory size={ICON_SIZE} />
							History
						</Link>
					</li>
					<li>
						<Link href={PATH_GENERATORS.myVideos()}>
							<GoVideo size={ICON_SIZE} />
							My videos
						</Link>
					</li>
					<li>
						<Link href={PATH_GENERATORS.watchLater()}>
							<FiClock size={ICON_SIZE} />
							Watch later
						</Link>
					</li>
					<li>
						<Link href={PATH_GENERATORS.likedVideos()}>
							<BiLike size={ICON_SIZE} /> Liked videos
						</Link>
					</li>
				</ul>
			</nav>

			<Divider />

			<h2>Subscriptions</h2>
			<nav>
				<ul>
					{subscribedChannels.map(channel => (
						<li key={channel.id}>
							<Link href={PATH_GENERATORS.channel(channel.id)}>
								<img src={channel.avatar} alt='' />
								{channel.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<Button variant='text' fullWidth>
				<RiArrowDownSLine size={ICON_SIZE} />
				Show more
			</Button>
		</aside>
	);
};
